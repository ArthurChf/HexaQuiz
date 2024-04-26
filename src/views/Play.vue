<template>
    <div class="play-container">
        <span class="play__question" v-if="!isGameFinished">{{ currentQuestion.name }}</span>
        <span class="play__suggestions" v-if="!isGameFinished">
            <AppGameButton v-for="(suggestion, index) in suggestions" :key="suggestion.id" :color="buttonColors[index]!" :text="suggestion.value" :answer="currentQuestion.number" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { useQuizData } from '@/composables/useQuizData';
import { useRoute } from 'vue-router';
import type { QuizDataType } from '@/types/QuizDataType';
import { getRandomQuestion } from '@/utils/getRandomQuestion';
import { getQuestionSuggestions } from '@/utils/getQuestionSuggestions';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import AppGameButton from '@/components/AppGameButton.vue';
import type { ColorType } from '@/types/ColorType';
import { useAppStore } from '@/stores/appStore';
import type { QuestionSuggestionType } from '@/types/QuestionSuggestionType';

const route = useRoute();
const appStore = useAppStore();
const currentLevel = ref(route.params.levelId as string);
const questions = computed(() => useQuizData(currentLevel.value) as QuizDataType[]);
const buttonColors: ColorType[] = ['red', 'blue', 'orange', 'green'];

const eventsId = appStore.getNewEventsId();

const isGameFinished = ref(false);
const currentQuestion = reactive<QuizDataType>({
    name: '',
    number: ''
});
const suggestions = ref<QuestionSuggestionType[]>([]);

const showQuestion = (level?: string) => {
    if (level) currentLevel.value = level;
    Object.assign(currentQuestion, getRandomQuestion(questions.value));

    const levelQuestions = useQuizData(currentLevel.value) as QuizDataType[];
    suggestions.value = getQuestionSuggestions(levelQuestions, currentQuestion.number);
};

appStore.onFinishedGame(() => {
    isGameFinished.value = true;
}, eventsId);

appStore.onNextQuestion(() => {
    showQuestion();
}, eventsId);

appStore.onRestartGame((level?: string) => {
    isGameFinished.value = false;
    showQuestion(level);
}, eventsId);

onMounted(() => {
    appStore.nextQuestion();
});

onUnmounted(() => {
    appStore.resetLives();
    appStore.removeEvents(eventsId);
});
</script>
