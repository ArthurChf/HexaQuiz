<template>
    <img :src="getImageUrl(name)" :style="style" />
</template>

<script setup lang="ts">
import type { ImageEnum } from '@/enums/ImageEnum';
import { reactive } from 'vue';

const props = defineProps<{
    name: ImageEnum;
    size?: string;
}>();

const getImageUrl = (path: string) => {
    return new URL(`../assets/images/${path}`, import.meta.url).href;
};

const style = reactive({});
if (props.size !== undefined) {
    Object.assign(style, { width: `${props.size}px`, height: 'max-content' });
}
</script>
