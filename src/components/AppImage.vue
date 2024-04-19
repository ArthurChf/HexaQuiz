<template>
    <img :src="getImageUrl(name)" :style="{ width: `${size}px`, height: 'max-content' }" />
</template>

<script setup lang="ts">
import type { ImageEnum } from '@/enums/ImageEnum';

defineProps<{
    name: ImageEnum;
    size: string;
}>();

const getImageUrl = (path: string) => {
    return new URL(`../assets/images/${path}`, import.meta.url).href;
};
</script>
