import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
    const MAX_LIVES = 3;
    const remainingLives = ref(MAX_LIVES);

    const removeLife = () => {
        remainingLives.value--;
    };
    const resetLives = () => {
        remainingLives.value = MAX_LIVES;
    };

    return {
        remainingLives,
        removeLife,
        resetLives
    };
});
