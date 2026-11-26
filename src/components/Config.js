import { settings } from "./Settings.js";

/**
 * Объект конфига игры, содержащий методы получения настроек и проверки этих настроек.
 * @property {settings} settings Настройки игры.
 */
export const config = {
    settings,

    /**
     * Инициализация настроек игры.
     * @param {Object} userSettings Объект с пользовательскими настройками игры.
     */
    init(userSettings) {
        // Записываем переданные настройки в те, которые будут использоваться.
        Object.assign(this.settings, userSettings);
    },

    /**
     * @returns {int} Отдает количество строк в игре.
     */
    getRowsCount() {
        return this.settings.rowsCount;
    },

    /**
     * @returns {int} Отдает количество колонок в игре.
     */
    getColsCount() {
        return this.settings.colsCount;
    },

    /**
     * @returns {int} Отдает скорость змейки в игре.
     */
    getSpeed() {
        return this.settings.speed;
    },

    /**
     * @returns {int} Отдает количество еды, которое надо съесть для победы.
     */
    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    /**
     * Проверка значений настроек игры.
     * @returns {{isValid: boolean, errors: Array}} Результат валидации в виде объекта с ошибками.
     */
    validate() {
        /**
         * Объект DTO с результатами валидации.
         * @property {boolean} isValid true, если настройки валидны, иначе false.
         * @property {string[]} errors массив со всеми ошибками настроек.
         */
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
            result.isValid = false;
            result.errors.push(
                "Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30]."
            );
        }

        if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
            result.isValid = false;
            result.errors.push(
                "Неверные настройки, значение colsCount должно быть в диапазоне [10, 30]."
            );
        }

        if (this.settings.speed < 1 || this.settings.speed > 10) {
            result.isValid = false;
            result.errors.push(
                "Неверные настройки, значение speed должно быть в диапазоне [1, 10]."
            );
        }

        if (this.settings.winFoodCount < 5 || this.settings.winFoodCount > 50) {
            result.isValid = false;
            result.errors.push(
                "Неверные настройки, значение winLength должно быть в диапазоне [5, 50]."
            );
        }

        return result;
    },
};