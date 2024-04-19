<template>
    <div class="default-layout">
        <div class="loading-screen">
            <AppImage :name="ImageEnum.LOGO" alt="Logo" />
            <div class="progress-bar__container">
                <div class="progress-bar__content"></div>
            </div>
        </div>
        <div class="header">
            <RouterLink :to="RouteEnum.HOME" class="header__button" role="button">
                <AppIcon :name="isHomeRoute ? IconEnum.SETTINGS : IconEnum.ARROW_LEFT" size="13" />
            </RouterLink>
            <div v-if="!isHomeRoute" class="header__progress">
                <div class="lives">
                    <AppIcon v-for="life in 3" :key="life" :name="IconEnum.HEART" size="15" :class="life <= remainingLives ? '' : 'life--empty'" />
                </div>
                <div class="progress-bar__container">
                    <div class="progress-bar__content"></div>
                </div>
            </div>
            <div v-else>
                ****todo
            </div>
            <AppTimer v-if="!isHomeRoute" />
            <RouterLink v-else :to="RouteEnum.HOME" class="header__button" role="button">
                <AppIcon :name="IconEnum.HELP" size="13" />
            </RouterLink>
        </div>
        <div class="content scrollbar">
            <RouterView #default="{ Component }">
                <Transition :name="TransitionEnum.FADE" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import AppIcon from '@/components/AppIcon.vue';
import AppTimer from '@/components/AppTimer.vue';
import { RouteEnum } from '@/enums/RouteEnum';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppImage from '@/components/AppImage.vue';
import { ImageEnum } from '@/enums/ImageEnum';

const remainingLives = ref(3);
const route = useRoute();
const isHomeRoute = computed(() => route.fullPath === RouteEnum.HOME);
</script>
