/**
 * Объект DTO с настройками игры по умолчанию, которые можно будет поменять при инициализации игры.
 * @property {int} rowsCount Количество строк.
 * @property {int} colsCount Количество колонок.
 * @property {int} speed Скорость змейки.
 * @property {int} winLength Длина змейки для победы.
 */
export const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 4,
  winFoodCount: 5,
};