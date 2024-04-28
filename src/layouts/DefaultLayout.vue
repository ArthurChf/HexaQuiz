<template>
    <div class="default-layout">
        <AppAlert />
        <div class="loading-screen">
            <AppImage :name="ImageEnum.LOGO" alt="Logo" />
            <div class="progress-bar__container">
                <div class="progress-bar__content"></div>
            </div>
        </div>
        <div class="header">
            <RouterLink :to="isHomeRoute ? RouteEnum.SETTINGS : pageData.previous" class="header__button" role="button">
                <AppIcon :name="isHomeRoute ? IconEnum.SETTINGS : IconEnum.ARROW_LEFT" size="10" />
            </RouterLink>
            <div v-if="isInGame" class="header__center">
                <div class="lives">
                    <AppIcon v-for="life in maxLives" :key="life" :name="IconEnum.HEART" size="13" class="life" :class="life <= remainingLives ? '' : 'life--empty'" />
                </div>
                <div class="header__progress">
                    <AppProgressBar :width="quizProgress" />
                    <span>{{ pageData.title }}</span>
                </div>
            </div>
            <span v-else class="header__title">{{ pageData.title }}</span>
            <AppTimer v-if="isInGame" />
            <div v-else></div>
        </div>
        <div class="content scrollbar">
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <div class="lost-game" v-if="isGameLost">
                    <h2 class="lost-game__title">Perdu 😵</h2>
                    <div class="lost-game__buttons">
                        <AppGameButton color="primary" text="Accueil" @click="goToHome" />
                        <AppGameButton color="red" text="Rejouer" @click="restartGame" />
                    </div>
                </div>
            </Transition>

            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <div class="won-game" v-if="isGameWon">
                    <h2 class="won-game__title">Gagné 👏</h2>
                    <div class="won-game__buttons">
                        <AppGameButton color="primary" text="Accueil" @click="goToHome" />
                        <AppGameButton v-if="nextLevel <= 11" color="orange" :text="`Prochain niveau (${nextLevel})`" @click="goToNextLevel" />
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
import AppProgressBar from '@/components/AppProgressBar.vue';
import { useSettingsStore } from '@/stores/settingsStore';
import AppAlert from '@/components/AppAlert.vue';

const appStore = useAppStore();
const { quizProgress, remainingLives, isGameWon, isGameLost } = storeToRefs(appStore);

const settingsStore = useSettingsStore();
const { maxLives } = storeToRefs(settingsStore);

const route = useRoute();
const levelId = computed(() => route.params.levelId as string);

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
    },
    [RouteEnum.SETTINGS]: {
        title: 'Paramètres'
    }
};
const pageData = computed(() => {
    const data = routesData?.[route.fullPath];

    let title = '';
    if (route.meta?.page === RouteEnum.LEARN_PARAM || route.meta?.page === RouteEnum.PLAY_PARAM) title = `Niveau ${levelId.value}`;
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
    appStore.restartGame();
};

const nextLevel = computed(() => +levelId.value + 1);
const goToNextLevel = async () => {
    appStore.restartGame(nextLevel.value.toString());
    await router.push(`${RouteEnum.PLAY}/${nextLevel.value}`);
};
</script>
