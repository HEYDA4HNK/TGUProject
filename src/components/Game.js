import { status } from "./Status.js";
import { config } from "./Config.js";
import { map } from "./Map.js";
import { snake } from "./Snake.js";
import { food } from "./Food.js";

/**
 * Объект игры.
 * @property {settings} settings Настройки игры.
 * @property {map} map Объект отображения.
 * @property {snake} snake Объект змейки.
 * @property {food} food Объект еды.
 * @property {status} status Статус игры.
 * @property {int} tickInterval Номер интервала игры.
 */
export const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,

    /**
     * Инициализация игры.
     * @param {object} userSettings Настройки игры, которые можно изменить.
     */
    init(userSettings) {
        // Инициализируем настройки игры.
        this.config.init(userSettings);
        // Получаем результат валидации настроек.
        const validation = this.config.validate();
        // Если настройки игры неверные - сообщаем об ошибках и выходим из метода, игру не запускаем.
        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }
        // Инициализируем карту.
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        // Устанавливаем обработчики событий.
        this.setEventHandlers();
        // Ставим игру в начальное положение.
        this.reset();
    },

    /**
     * Ставит игру в начальное положение.
     */
    reset() {
        // Ставим статус игры в "остановлена".
        this.stop();
        // Инициализируем змейку.
        this.snake.init(this.getStartSnakeBody(), "up");
        // Ставим еду на карту в случайную пустую ячейку.
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        // Отображаем все что нужно для игры.
        this.render();
    },

    /**
     * Ставим статус игры в "играем".
     */
    play() {
        // Ставим статус в 'playing'.
        this.status.setPlaying();
        // Ставим интервал шагов змейки.
        console.log(this.config.settings.speed);
        this.tickInterval = setInterval(
            () => this.tickHandler(),
            1000 / this.config.getSpeed()
        );
        // Меняем название кнопки в меню на "Стоп" и делаем ее активной.
        this.setPlayButton("Стоп");
    },

    /**
     * Ставим статус игры в "стоп".
     */
    stop() {
        // Ставим статус в 'stopped'.
        this.status.setStopped();
        // Убираем интервал шагов змейки.
        clearInterval(this.tickInterval);
        // Меняем название кнопки в меню на "Старт" и делаем ее активной.
        this.setPlayButton("Старт");
    },

    /**
     * Ставим статус игры в "финиш".
     */
    finish() {
        // Ставим статус в 'finished'.
        this.status.setFinished();
        // Убираем интервал шагов змейки.
        clearInterval(this.tickInterval);
        // Меняем название кнопки в меню на "Игра закончена" и делаем ее неактивной.
        this.setPlayButton("Игра закончена", true);
    },

    /**
     * Обработчик события тика игры, когда змейка должна перемещаться.
     */
    tickHandler() {
        // Если следующий шаг невозможен, то ставим игру в статус завершенный.
        if (!this.canMakeStep()) {
            return this.finish();
        }
        // Если следующий шаг будет на еду, то заходим в if.
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            // Прибавляем к змейке ячейку.
            this.snake.growUp();
            //увеличиваем счетчик игры
            this.snake.setBodyLength();
            // Ставим еду в свободную ячейку.
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            // Если выиграли, завершаем игру.
            if (this.isGameWon()) {
                this.finish();
            }
        }
        // Перемещаем змейку.
        this.snake.makeStep();
        // Отрисовываем что получилось после шага.
        this.render();
    },

    /**
     * Меняем кнопку с классом playButton.
     * @param {string} textContent Текст кнопки.
     * @param {boolean} [isDisabled = false] Необходимо ли заблокировать кнопку.
     */
    setPlayButton(textContent, isDisabled = false) {
        // Находим кнопку.
        const playButton = document.getElementById("playButton");
        // Меняем текст внутри кнопки на переданный.
        playButton.textContent = textContent;
        // Если необходимо запретить нажатие кнопку - ставим класс disabled, иначе убираем класс disabled.
        isDisabled
            ? playButton.classList.add("disabled")
            : playButton.classList.remove("disabled");
    },

    /**
     * Возвращает начальную позицию змейки в центре карты.
     * @returns {{x: int, y: int}[]} Точка начальной позиции змейки.
     */
    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    /**
     * Ставит обработчики события.
     */
    setEventHandlers() {
        // При клике на кнопку с классом playButton вызвать функцию this.playClickHandler.
        document
            .getElementById("playButton")
            .addEventListener("click", () => this.playClickHandler());
        // При клике на кнопку с классом newGameButton вызвать функцию this.newGameClickHandler.
        document
            .getElementById("newGameButton")
            .addEventListener("click", (event) => this.newGameClickHandler(event));
        // При нажатии кнопки, если статус игры "играем", то вызываем функцию смены направления у змейки.
        document.addEventListener("keydown", (event) => this.keyDownHandler(event));
    },

    /**
     * Отображает все для игры, карту, еду и змейку.
     */
    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },

    /**
     * Отдает случайную не занятую точку на карте.
     * @return {{x: int, y: int}} Точку с координатами.
     */
    getRandomFreeCoordinates()
    {
        
        const allCellsKey = Object.keys(this.map.cells)
        const allFreeCells = []
        for (let i of allCellsKey) {
            if (!this.map.usedCells.includes(this.map.cells[i])) {
                allFreeCells.push(i)
            }
        }
        const randomIndex = Math.floor(Math.random() * allFreeCells.length)
        const res = allFreeCells[randomIndex]
        const xReg = /(?<=x)\d+/
        const yReg = /(?<=y)\d+/
        return {
            x: parseInt(xReg.exec(res)[0]),
            y: parseInt(yReg.exec(res)[0])
        }
    },

    /**
     * Обработчик события нажатия на кнопку playButton.
     */
    playClickHandler() {
        // Если сейчас статус игры "играем", то игру останавливаем, если игра остановлена, то запускаем.
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    /**
     * Обработчик события нажатия на кнопку "Новая игра".
     */
    newGameClickHandler() {
        // Ставим игру в начальное положение.
        this.reset();
    },

    /**
     * Обработчик события нажатия кнопки клавиатуры.
     * @param {KeyboardEvent} event
     */
    keyDownHandler(event) {
        // Если статус игры не "играем", значит обрабатывать ничего не нужно.
        if (!this.status.isPlaying()) {
            return;
        }
        // Получаем направление змейки, больше мы не обрабатываем других нажатий.
        const direction = this.getDirectionByCode(event.code);
        // Змейка не может повернуть на 180 градусов, поэтому делаем проверку, можем ли мы назначить направление.
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    /**
     * Отдает направление змейки в зависимости от переданного кода нажатой клавиши.
     * @param {string} code Код нажатой клавиши.
     * @returns {string} Направление змейки.
     */
    getDirectionByCode(code) {
        switch (code) {
            case "KeyW":
            case "ArrowUp":
                return "up";
            case "KeyD":
            case "ArrowRight":
                return "right";
            case "KeyS":
            case "ArrowDown":
                return "down";
            case "KeyA":
            case "ArrowLeft":
                return "left";
            default:
                return "";
        }
    },

    /**
     * Определяет можно ли назначить переданное направление змейке.
     * @param {string} direction Направление, которое проверяем.
     * @returns {boolean} true, если направление можно назначить змейке, иначе false.
     */
    canSetDirection(direction)
    {
        switch (direction) {
            case "up":
                return this.snake.lastStepDirection != "down"
            case "left":
                return this.snake.lastStepDirection != "right"
            case "right":
                return this.snake.lastStepDirection != "left"
            case "down":
                return this.snake.lastStepDirection != "up"
        }
    },

    /**
     * Проверяем произошла ли победа, судим по очкам игрока (длине змейки).
     * @returns {boolean} true, если игрок выиграл игру, иначе false.
     */
    isGameWon()
    {
        return this.snake.bodyLenght >= this.config.getWinFoodCount()
    },

    /**
     * Проверяет возможен ли следующий шаг.
     * @returns {boolean} true если следующий шаг змейки возможен, false если шаг не может быть совершен.
     */
    canMakeStep()
    {
        return !this.snake.isOnPoint(this.snake.getNextStepHeadPoint())
    },
};