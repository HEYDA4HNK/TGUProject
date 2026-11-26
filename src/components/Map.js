import { snake } from "./Snake.js";
/**
 * Объект карты с методами отображения и создания игрового поля.
 * @property {Object} cells Объект содержащий все ячейки игры.
 * @property {Array} usedCells Массив содержащий все занятые ячейки игры.
 */
export const map = {
    cells: null,
    usedCells: null,

    /**
     * Метод инициализирует и выводит карту для игры.
     * @param {int} rowsCount Количество строк в карте.
     * @param {int} colsCount Количество колонок в карте.
     */
    init(rowsCount, colsCount) {
        // Контейнер, где будут наши ячейки, первоначально его очистим.
        const table = document.getElementById("game");
        table.innerHTML = "";
        // Объект-хранилище всех клеток пока пустой.
        this.cells = {};
        // Массив со всеми занятыми элементами на карте пока тоже пустой.
        this.usedCells = [];
        // Цикл запустится столько раз, сколько у нас количество строк.
        for (let row = 0; row < rowsCount; row++) {
            // Создаем строку, добавляем ей класс, после добавляем ее в таблицу.
            const tr = document.createElement("tr");
            tr.classList.add("row");
            table.appendChild(tr);
            // Цикл запустится столько раз, сколько у нас количество колонок.
            for (let col = 0; col < colsCount; col++) {
                // Создаем ячейку, добавляем ячейке класс cell.
                const td = document.createElement("td");
                td.classList.add("cell");
                // Записываем в объект всех ячеек новую ячейку.
                this.cells[`x${col.toString()}_y${row.toString()}`] = td;
                // Добавляем ячейку в строку.
                tr.appendChild(td);
            }
        }
    },

    /**
     * Отображает все объекты на карте.
     * @param {{x: int, y: int}[]} snakePointsArray Массив с точками змейки.
     * @param {{x: int, y: int}} foodPoint Точка еды.
     * @see {@link https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|Array.prototype.forEach()}
     */
    render(snakePointsArray, foodPoint) {
        // Чистим карту от предыдущего рендера, всем занятым ячейкам оставляем только класс cell.
        for (const cell of this.usedCells) {
            //console.log(cell);
            cell.className = "cell";
        }
        // Очищаем массив с занятыми ячейками, при отображении сейчас его соберем заново.
        //this.usedCells = [];
        // Отображаем змейку.
        //console.log(snakePointsArray);
        snakePointsArray.forEach((point, idx) => {
            // Получаем элемент ячейки змейки по точке point.
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            // Если первый элемент массива, значит это голова, иначе тело.
            //console.log(snakeCell);
            snakeCell.classList.add(idx === 0 ? "snakeHead" : "snakeBody");
            // Добавляем элемент ячейки змейки в массив занятых точек на карте.
            this.usedCells.push(snakeCell);
        });
        // Получаем элемент ячейки с едой по точке foodPoint.
        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        // Отображаем еду.
        foodCell.classList.add("food");
        // Добавляем элемент ячейки еды в массив занятых точек на карте.
        this.usedCells.push(foodCell);
        //console.log(this.usedCells);
        //Отрисовываем счетчик игрока
        document.querySelector("#schet").innerHTML = snake.bodyLenght;
    },
};