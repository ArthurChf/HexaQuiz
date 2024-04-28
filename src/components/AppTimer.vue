<template>
    <div class="timer-container">
        <svg class="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="timer__circle">
                <circle class="timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path :stroke-dasharray="timerPathRemaining" class="timer__path-remaining" :style="{ transition: timerPathTransition }" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
            </g>
        </svg>
        <span class="timer__label">{{ timeLeft }}</span>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref } from 'vue';

const PATH_DEFAULT_TRANSITION = '1s linear stroke-dasharray';
const timerPathTransition = ref(PATH_DEFAULT_TRANSITION);

const settingsStore = useSettingsStore();
const { maxQuestionDuration } = storeToRefs(settingsStore);
const timeLeft = ref(maxQuestionDuration.value);
let timerInterval = -1;

const FULL_DASH_ARRAY = 283;
const timerPathRemaining = ref(`${FULL_DASH_ARRAY}`);

const appStore = useAppStore();

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft.value / maxQuestionDuration.value;
    return rawTimeFraction - 1 / maxQuestionDuration.value * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
    timerPathRemaining.value = circleDasharray;
}

function reset() {
    clearInterval(timerInterval);
    timeLeft.value = maxQuestionDuration.value;
    timerPathTransition.value = 'none';
    timerPathRemaining.value = `${FULL_DASH_ARRAY}`;
}

function start() {
    timerPathTransition.value = PATH_DEFAULT_TRANSITION;
    timerInterval = window.setInterval(() => {
        timeLeft.value--;
        setCircleDasharray();

        if (timeLeft.value === 0) {
            appStore.removeLife();
            appStore.nextQuestion();
        }
    }, 1000);
}

start();


const eventsId = appStore.getNewEventsId();

appStore.onFinishedGame(() => {
    reset();
}, eventsId);

appStore.onRestartGame(() => {
    reset();
    setTimeout(start, 100);
}, eventsId);

appStore.onNextQuestion(() => {
    reset();
    setTimeout(start, 100);
}, eventsId);

onUnmounted(() => {
    clearInterval(timerInterval);
    appStore.removeEvents(eventsId);
});
</script>
