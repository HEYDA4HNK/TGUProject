/**
 * Статус игры.
 * @property {string} condition Статус игры.
 */
export const status = {
    condition: null,

    /**
     * Устанавливает статус в "playing".
     */
    setPlaying() {
        this.condition = "playing";
    },

    /**
     * Устанавливает статус в "stopped".
     */
    setStopped() {
        this.condition = "stopped";
    },

    /**
     * Устанавливает статус в "finished".
     */
    setFinished() {
        this.condition = "finished";
    },

    /**
     * Проверяет является ли статус "playing".
     * @returns {boolean} true, если статус "playing", иначе false.
     */
    isPlaying() {
        return this.condition === "playing";
    },

    /**
     * Проверяет является ли статус "stopped".
     * @returns {boolean} true, если статус "stopped", иначе false.
     */
    isStopped() {
        return this.condition === "stopped";
    },
};