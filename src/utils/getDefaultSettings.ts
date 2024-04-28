export const getDefaultSettings = () => {
    let maxLives = 3;
    let maxQuestionDuration = 15;

    const storedSettings = localStorage.getItem('settings') ?? '{}';
    const settingsJson = JSON.parse(storedSettings);
    if (Object.hasOwn(settingsJson, 'maxLives') && Object.hasOwn(settingsJson, 'maxQuestionDuration')) {
        maxLives = settingsJson.maxLives;
        maxQuestionDuration = settingsJson.maxQuestionDuration;
    }

    return {
        maxLives,
        maxQuestionDuration
    };
};
