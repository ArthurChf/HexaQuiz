import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
    const MAX_LIVES = 3;
    const remainingLives = ref(MAX_LIVES);
    const restartGameCallbacks: (() => void)[] = [];
    const nextQuestionCallbacks: (() => void)[] = [];

    const removeLife = () => {
        remainingLives.value--;
    };
    const resetLives = () => {
        remainingLives.value = MAX_LIVES;
    };
    const onNextQuestion = (callback: () => void) => {
        nextQuestionCallbacks.push(callback);
    };
    const nextQuestion = () => {
        nextQuestionCallbacks.forEach((callback) => {
            callback();
        });
    };
    const onRestartGame = (callback: () => void) => {
        restartGameCallbacks.push(callback);
    };
    const restartGame = () => {
        resetLives();
        restartGameCallbacks.forEach((callback) => {
            callback();
        });
    };

    return {
        remainingLives,
        removeLife,
        resetLives,
        restartGame,
        onRestartGame,
        onNextQuestion,
        nextQuestion
    };
});
