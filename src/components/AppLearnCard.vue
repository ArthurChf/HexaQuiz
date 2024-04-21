<template>
    <button class="learn-card__container" @click="flipCard" type="button" role="button">
        <div class="learn-card" :class="isCardFlipped ? 'flipped' : ''">
            <div class="learn-card__front">{{ name }}</div>
            <div class="learn-card__back">{{ number }}</div>
        </div>
    </button>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

defineProps<{
    name: string;
    number: string;
}>();

const isCardFlipped = ref(false);
let flipTimeout = -1;

const flipCard = () => {
    if (!isCardFlipped.value) {
        isCardFlipped.value = true;
        flipTimeout = window.setTimeout(() => {
            isCardFlipped.value = false;
        }, 2000);
    }
};

onUnmounted(() => {
    clearTimeout(flipTimeout);
});
</script>
