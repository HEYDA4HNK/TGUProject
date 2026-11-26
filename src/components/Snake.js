import { config } from "./Config.js";

/**
 * Объект змейки.
 * @property {{x: int, y: int}[]} body Массив с точками тела змейки.
 * @property {string} direction Направление, куда пользователь направил змейку.
 * @property {string} lastStepDirection Направление, куда сходила змейка прошлый раз.
 */
export const snake = {
    body: null,
    direction: null,
    lastStepDirection: null,
    bodyLenght: 0,

    /**
     * Инициализирует змейку, откуда она будет начинать и ее направление.
     * @param {{x: int, y: int}[]} startBody Начальная позиция змейки.
     * @param {string} direction Начальное направление игрока.
     */
    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
        this.setBodyLength()
    },

    /**
     * Отдает массив со всеми точками змейки.
     * @return {{x: int, y: int}[]};
     */
    getBody() {
        return this.body;
    },
    setBodyLength() {
        this.bodyLenght = this.getBody().length - 1;
    },
    /**
     * Отдает прошлое направление змейки.
     */
    getLastStepDirection() {
        return this.lastStepDirection;
    },

    /**
     * Проверяет содержит ли змейка переданную точку.
     * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.prototype.some()}
     * @param {{x: int, y: int}} point Точка, которую проверяем.
     * @returns {boolean} true, если змейка содержит переданную точку, иначе false.
     */
    isOnPoint(point) {
        return this.body.some(
            (snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y
        );
    },

    /**
     * Двигает змейку на один шаг.
     */
    makeStep()
    {
        for (let i = this.bodyLenght; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        this.body[0] = this.getNextStepHeadPoint()
        this.lastStepDirection = this.direction
    },

    /**
     * Добавляет в конец тела змейки копию последнего элемента змейки.
     */
    growUp() {
        // Получаем индекс последней точки в массиве точек змейки (последний элемент this.body).
        const lastBodyIdx = this.body.length - 1;
        // Получаем последнюю точку змейки.
        const lastBodyPoint = this.body[lastBodyIdx];
        // Клонируем последнюю точку змейки (делаем копию).
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        // Добавляем копию в наш массив this.body.
        this.body.push(lastBodyPointClone);
    },

    /**
     * Отдает точку, где будет голова змейки если она сделает шаг.
     * @returns {{x: int, y: int}} Следующая точка куда придет змейка сделав шаг.
     */
    getNextStepHeadPoint() {
        // Получаем в отдельную переменную голову змейки.
        const firstPoint = this.body[0];
        //console.log(firstPoint);
        // Возвращаем точку, где окажется голова змейки в зависимости от направления.
        switch (this.direction) {
            case "up":
                if (firstPoint.y <= 0) {
                    return { x: firstPoint.x, y: config.getRowsCount() - 1 };
                }
                return { x: firstPoint.x, y: firstPoint.y - 1 };
            case "right":
                if (firstPoint.x >= config.getColsCount() - 1) {
                    return { x: 0, y: firstPoint.y };
                }
                return { x: firstPoint.x + 1, y: firstPoint.y };
            case "down":
                if (firstPoint.y >= config.getRowsCount() - 1) {
                    return { x: firstPoint.x, y: 0 };
                }
                return { x: firstPoint.x, y: firstPoint.y + 1 };
            case "left":
                if (firstPoint.x <= 0) {
                    return { x: config.getColsCount() - 1, y: firstPoint.y };
                }
                return { x: firstPoint.x - 1, y: firstPoint.y };
        }
    },

    /**
     * Устанавливает направление змейки.
     * @param {string} direction Направление змейки.
     */
    setDirection(direction) {
        this.direction = direction;
    },
};