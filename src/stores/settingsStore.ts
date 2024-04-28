import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDefaultSettings } from '@/utils/getDefaultSettings';

export const useSettingsStore = defineStore('settings', () => {
    const defaultSettings = getDefaultSettings();
    const maxLives = ref(defaultSettings.maxLives);
    const maxQuestionDuration = ref(defaultSettings.maxQuestionDuration);

    const updateSettings = (newSettings: { maxLives?: number; maxQuestionDuration?: number }) => {
        maxLives.value = newSettings?.maxLives ?? maxLives.value;
        maxQuestionDuration.value = newSettings?.maxQuestionDuration ?? maxQuestionDuration.value;
        localStorage.setItem('settings', JSON.stringify({ maxLives: maxLives.value, maxQuestionDuration: maxQuestionDuration.value }));
    };

    return {
        maxLives,
        maxQuestionDuration,
        updateSettings
    };
});
