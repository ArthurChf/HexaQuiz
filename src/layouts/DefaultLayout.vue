<template>
    <div class="default-layout">
        <div class="loading-screen">
            <img src="@/assets/images/logo.png" alt="Logo" />
            <div class="progress-bar__container">
                <div class="progress-bar__content"></div>
            </div>
        </div>
        <div class="header">
            <RouterLink :to="RouteEnum.HOME" class="previous-button" role="button">
                <AppIcon :name="IconEnum.ARROW_LEFT" size="10" />
            </RouterLink>
            <div class="progress">
                <div class="lives">
                    <AppIcon v-for="life in 3" :key="life" :name="IconEnum.HEART" size="15" :class="life <= remainingLives ? '' : 'life--empty'" />
                </div>
                <div class="progress-bar__container">
                    <div class="progress-bar__content"></div>
                </div>
            </div>
            <AppTimer />
        </div>
        <div class="content scrollbar">
            <RouterView #default="{ Component }">
                <Transition :name="TransitionEnum.FADE" mode="out-in">
                    <KeepAlive>
                        <component :is="Component" />
                    </KeepAlive>
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
import { ref } from 'vue';

const remainingLives = ref(3);
</script>
