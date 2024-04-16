<template>
    <div style="display: flex; flex-direction: column; row-gap: 1rem;">
        <AppButton color="red">Rouge</AppButton>
        <AppButton color="blue">Bleu</AppButton>
        <AppButton color="orange">Orange</AppButton>
        <AppButton color="green">Vert</AppButton>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
</script>
