<template>
    <div class="progress-bar__container">
        <div class="progress-bar__content" :style="{ width: `${width}%` }"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    width: number;
}>();
</script>
