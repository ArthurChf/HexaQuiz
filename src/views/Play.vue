<template>
    <div class="play-container">
        <span class="play__question">{{ currentQuestion.name }}</span>
        <span class="play__suggestions">
            <AppGameButton v-for="suggestion in suggestions" :key="suggestion" color="blue">{{ suggestion }}</AppGameButton>
        </span>
    </div>
</template>

<script setup lang="ts">
import { useQuizData } from '@/composables/useQuizData';
import { useRoute } from 'vue-router';
import type { QuizDataType } from '@/types/QuizDataType';
import { getRandomQuestion } from '@/utils/getRandomQuestion';
import { getQuestionSuggestions } from '@/utils/getQuestionSuggestions';
import { reactive, ref } from 'vue';
import AppGameButton from '@/components/AppGameButton.vue';

const route = useRoute();
const questions = useQuizData(route.params.levelId as string) as QuizDataType[];

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
</script>
