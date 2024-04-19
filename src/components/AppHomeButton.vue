<template>
    <RouterLink :to="to" role="button" type="button" class="home-button">
        <div class="icon-container" :class="`color--${color}`">
            <div class="icon-circle">
                <AppIcon :name="icon" size="12" />
            </div>
        </div>
        <div class="text">
            <h2><slot name="title" /></h2>
            <p><slot name="description" /></p>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue';
import type { IconEnum } from '@/enums/IconEnum';
import type { RouteEnum } from '@/enums/RouteEnum';
import type { ColorType } from '@/types/ColorType';

defineProps<{
    to: RouteEnum;
    icon: IconEnum;
    color: ColorType;
}>();
</script>
