<template>
    <div class="bg-background flex flex-col min-h-screen">
        <div class="loading-screen">
            <img src="@/assets/images/logo.png" alt="Logo" />
            <div class="progress-bar__container">
                <div class="progress-bar__content"></div>
            </div>
        </div>
        <RouterView #default="{ Component }">
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <KeepAlive>
                    <component :is="Component" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </div>
</template>

<script setup lang="ts">
import { TransitionEnum } from '@/enums/TransitionEnum';
</script>
