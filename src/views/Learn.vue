<template>
    <div class="learn-container">
        <AppLearnCard v-for="card in learnCards" :key="card.number" :name="card.name" :number="card.number" />
    </div>
</template>

<script setup lang="ts">
import AppLearnCard from '@/components/AppLearnCard.vue';
import { useQuizData } from '@/composables/useQuizData';
import { useRoute } from 'vue-router';
import type { QuizDataType } from '@/types/QuizDataType';

const route = useRoute();
const learnCards = useQuizData(route.params.levelId as string) as QuizDataType[];
</script>
