import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useSettingsStore } from '@/stores/settingsStore';

export const useAppStore = defineStore('app', () => {
    const settingsStore = useSettingsStore();
    const { maxLives } = storeToRefs(settingsStore);
    const remainingLives = ref(maxLives.value);
    const MAX_QUESTIONS = 10;
    const quizProgress = ref(0);
    const remainingQuestions = ref(MAX_QUESTIONS);
    const isGameWon = ref(false);
    const isGameLost = ref(false);
    let eventsIds = 0;

    const restartGameCallbacks: Map<number, (level?: string) => void> = new Map();
    const nextQuestionCallbacks: Map<number, () => void> = new Map();
    const finishedGameCallbacks: Map<number, () => void> = new Map();

    const getNewEventsId = () => {
        eventsIds++;
        return eventsIds;
    };

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
        remainingLives.value = maxLives.value;
    };
    const onFinishedGame = (callback: () => void, eventsId: number) => {
        finishedGameCallbacks.set(eventsId, callback);
    };
    const onNextQuestion = (callback: () => void, eventsId: number) => {
        nextQuestionCallbacks.set(eventsId, callback);
    };
    const onRestartGame = (callback: (level?: string) => void, eventsId: number) => {
        restartGameCallbacks.set(eventsId, callback);
    };
    const removeEvents = (eventsId: number) => {
        finishedGameCallbacks.delete(eventsId);
        nextQuestionCallbacks.delete(eventsId);
        restartGameCallbacks.delete(eventsId);
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
        resetAll,
        getNewEventsId,
        removeEvents
    };
});
