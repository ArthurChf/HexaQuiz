<template>
    <div class="play-container">
        <span class="play__question">{{ currentQuestion.name }}</span>
        <span class="play__suggestions">
            <AppGameButton v-for="(suggestion, index) in suggestions" :key="suggestion" :color="buttonColors[index]!" :text="suggestion" :answer="currentQuestion.number" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { useQuizData } from '@/composables/useQuizData';
import { useRoute } from 'vue-router';
import type { QuizDataType } from '@/types/QuizDataType';
import { getRandomQuestion } from '@/utils/getRandomQuestion';
import { getQuestionSuggestions } from '@/utils/getQuestionSuggestions';
import { onUnmounted, reactive, ref } from 'vue';
import AppGameButton from '@/components/AppGameButton.vue';
import type { ColorType } from '@/types/ColorType';
import { useAppStore } from '@/stores/appStore';

const route = useRoute();
const appStore = useAppStore();
const questions = useQuizData(route.params.levelId as string) as QuizDataType[];
const buttonColors: ColorType[] = ['red', 'blue', 'orange', 'green'];

const currentQuestion = reactive<QuizDataType>({
    name: '',
    number: ''
});
const suggestions = ref<string[]>([]);

const showQuestion = () => {
    Object.assign(currentQuestion, getRandomQuestion(questions));
    suggestions.value = getQuestionSuggestions(currentQuestion);
};

showQuestion();

appStore.onNextQuestion(() => {
    showQuestion();
});

appStore.onRestartGame(() => {
    showQuestion();
});

onUnmounted(() => {
    appStore.resetLives();
});
</script>
