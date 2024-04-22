import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
    const MAX_LIVES = 3;
    const remainingLives = ref(MAX_LIVES);
    const MAX_QUESTIONS = 10;
    const quizProgress = ref(0);
    const remainingQuestions = ref(MAX_QUESTIONS);
    const isGameWon = ref(false);
    const isGameLost = ref(false);

    const restartGameCallbacks: ((level?: string) => void)[] = [];
    const nextQuestionCallbacks: (() => void)[] = [];
    const finishedGameCallbacks: (() => void)[] = [];

    const finishGame = () => {
        isGameWon.value = remainingLives.value > 0;
        isGameLost.value = remainingLives.value <= 0;

        finishedGameCallbacks.forEach((callback) => {
            callback();
        });
    };
    const removeLife = () => {
        remainingLives.value--;
        if (remainingLives.value <= 0) {
            finishGame();
        }
    };
    const resetLives = () => {
        remainingLives.value = MAX_LIVES;
    };
    const onFinishedGame = (callback: () => void) => {
        finishedGameCallbacks.push(callback);
    };
    const onNextQuestion = (callback: () => void) => {
        nextQuestionCallbacks.push(callback);
    };
    const nextQuestion = () => {
        if (isGameLost.value || isGameWon.value) return;
        remainingQuestions.value--;
        quizProgress.value = (MAX_QUESTIONS - remainingQuestions.value) / MAX_QUESTIONS * 100;

        if (remainingQuestions.value <= 0) {
            finishGame();
        } else {
            nextQuestionCallbacks.forEach((callback) => {
                callback();
            });
        }
    };
    const onRestartGame = (callback: () => void) => {
        restartGameCallbacks.push(callback);
    };
    const resetAll = (restart = false) => {
        resetLives();
        remainingQuestions.value = restart ? MAX_QUESTIONS - 1 : MAX_QUESTIONS;
        quizProgress.value = restart ? 10 : 0;
        isGameWon.value = false;
        isGameLost.value = false;
    };
    const restartGame = (level?: string) => {
        resetAll(true);

        restartGameCallbacks.forEach((callback) => {
            callback(level);
        });
    };

    return {
        remainingLives,
        isGameWon,
        isGameLost,
        quizProgress,
        finishGame,
        removeLife,
        resetLives,
        restartGame,
        onFinishedGame,
        onRestartGame,
        onNextQuestion,
        nextQuestion,
        resetAll
    };
});
