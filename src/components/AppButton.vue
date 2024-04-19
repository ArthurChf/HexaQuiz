<template>
    <RouterLink :to="to" role="button" type="button" class="button">
        <div class="badge-container" :class="`color--${color}`">
            <div class="badge-circle">
                <slot name="badge" />
            </div>
        </div>
        <div class="text">
            <h2><slot name="title" /></h2>
            <p><slot name="description" /></p>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import type { ColorType } from '@/types/ColorType';

defineProps<{
    to: string;
    color: ColorType;
}>();
</script>
