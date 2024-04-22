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
import { onUnmounted, ref } from 'vue';

const timerWidth = ref('3.2rem');
const timerStrokeWidth = ref('0.66rem');

const PATH_DEFAULT_TRANSITION = '1s linear stroke-dasharray';
const timerPathTransition = ref(PATH_DEFAULT_TRANSITION);

const TIME_LIMIT = 10;
const timeLeft = ref(TIME_LIMIT);
let timerInterval = -1;

const FULL_DASH_ARRAY = 283;
const timerPathRemaining = ref(`${FULL_DASH_ARRAY}`);

const appStore = useAppStore();

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft.value / TIME_LIMIT;
    return rawTimeFraction - 1 / TIME_LIMIT * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} ${FULL_DASH_ARRAY}`;
    timerPathRemaining.value = circleDasharray;
}

function reset() {
    clearInterval(timerInterval);
    timeLeft.value = TIME_LIMIT;
    timerPathTransition.value = 'none';
    timerPathRemaining.value = `${FULL_DASH_ARRAY}`;
}

function start() {
    timerPathTransition.value = PATH_DEFAULT_TRANSITION;
    timerInterval = window.setInterval(() => {
        timeLeft.value--;
        setCircleDasharray();

        if (timeLeft.value === 0) {
            reset();
            appStore.nextQuestion();
        }
    }, 1000);
}

start();

appStore.onRestartGame(() => {
    reset();
    setTimeout(start, 1);
});

appStore.onNextQuestion(() => {
    setTimeout(start, 1);
});

onUnmounted(() => {
    clearInterval(timerInterval);
});
</script>

<style lang="css" scoped>
.timer-container {
    position: relative;
    width: v-bind(timerWidth);
    height: v-bind(timerWidth);
}

.timer__svg {
    transform: scaleX(1);
}

.timer__circle {
    fill: none;
    stroke: none;
}

.timer__path-elapsed {
    stroke-width: v-bind(timerStrokeWidth);
    stroke: #d4d4d4;
}

.timer__path-remaining {
    stroke-width: v-bind(timerStrokeWidth);
    transform: rotate(90deg);
    transform-origin: center;
    fill-rule: nonzero;
    stroke: #6949ff;
}

.timer__label {
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(timerWidth);
    height: v-bind(timerWidth);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-black);
    font-size: var(--font-size-xl);
}
</style>

