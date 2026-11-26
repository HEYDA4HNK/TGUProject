/**
 * Объект еды.
 * @property {int} x Координата X еды.
 * @property {int} y Координата Y еды.
 */
export const food = {
    x: null,
    y: null,

    /**
     * Отдает координаты еды.
     * @returns {{x: int, y: int}} Координаты еды.
     */
    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    /**
     * Устанавливает координаты для еды.
     * @param {{x: int, y: int}} point Новая точка с координатами еды.
     */
    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    /**
     * Определяет соответствует ли точка на которой находится еда той точке что была передана.
     * @param {{x: int, y: int}} point Точка, для проверки соответствия точке еды.
     * @returns {boolean} true, если точки совпали, иначе false.
     */
    isOnPoint(point)
    {
        return point.x == this.x && point.y == this.y
    },
};
