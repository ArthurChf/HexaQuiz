<template>
    <div class="default-layout">
        <div class="loading-screen">
            <AppImage :name="ImageEnum.LOGO" alt="Logo" />
            <div class="progress-bar__container">
                <div class="progress-bar__content"></div>
            </div>
        </div>
        <div class="header">
            <RouterLink :to="pageData.previous" class="header__button" role="button">
                <AppIcon :name="isHomeRoute ? IconEnum.SETTINGS : IconEnum.ARROW_LEFT" size="13" />
            </RouterLink>
            <div v-if="isInGame" class="header__center">
                <div class="lives">
                    <AppIcon v-for="life in 3" :key="life" :name="IconEnum.HEART" size="15" :class="life <= remainingLives ? '' : 'life--empty'" />
                </div>
                <div class="header__progress">
                    <div class="progress-bar__container">
                        <div class="progress-bar__content"></div>
                    </div>
                    <span>{{ pageData.title }}</span>
                </div>
            </div>
            <span v-else class="header__title">{{ pageData.title }}</span>
            <AppTimer v-if="isInGame" />
            <RouterLink v-else :to="RouteEnum.HOME" class="header__button" role="button">
                <AppIcon :name="IconEnum.HELP" size="13" />
            </RouterLink>
        </div>
        <div class="content scrollbar">
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <div class="lost-game" v-if="remainingLives === 0">
                    <h2 class="lost-game__title">Perdu 😵</h2>
                    <div class="lost-game__buttons">
                        <AppGameButton color="primary" text="Accueil" @click="goToHome" />
                        <AppGameButton color="red" text="Rejouer" @click="restartGame" />
                    </div>
                </div>
            </Transition>

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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppImage from '@/components/AppImage.vue';
import { ImageEnum } from '@/enums/ImageEnum';
import type { RouteDataType } from '@/types/RouteDataType';
import { useAppStore } from '@/stores/appStore';
import { storeToRefs } from 'pinia';
import AppGameButton from '@/components/AppGameButton.vue';
import router from '@/router';

const appStore = useAppStore();
const { remainingLives } = storeToRefs(appStore);
const route = useRoute();
const isHomeRoute = computed(() => route.fullPath === RouteEnum.HOME);
const isInGame = computed(() => {
    return route.meta?.page === RouteEnum.PLAY_PARAM;
});

const routesData: Record<string, RouteDataType> = {
    [RouteEnum.LEVELS_PLAY]: {
        title: 'Jouer'
    },
    [RouteEnum.LEVELS_LEARN]: {
        title: 'Apprendre'
    }
};
const pageData = computed(() => {
    const data = routesData?.[route.fullPath];

    let title = '';
    if (route.meta?.page === RouteEnum.LEARN_PARAM || route.meta?.page === RouteEnum.PLAY_PARAM) title = `Niveau ${route.params.levelId as string}`;
    else title = data?.title ?? 'HexaQuiz';

    let previous = '';
    if (route.meta?.previous) previous = route.meta.previous as RouteEnum;
    else previous = data?.previous ?? RouteEnum.HOME;

    return {
        title,
        previous
    };
});
const goToHome = async () => {
    await router.push(RouteEnum.HOME);
};
const restartGame = () => {
    router.go(0);
};
</script>
