<template>
    <div style="display: flex; flex-direction: column; row-gap: 1rem;">
        <AppButton color="red">Rouge</AppButton>
        <AppButton color="blue">Bleu</AppButton>
        <AppButton color="orange">Orange</AppButton>
        <AppButton color="green">Vert</AppButton>
        <div class="game-modes">
            <AppLevelButton :icon="IconEnum.PLAY" :to="RouteEnum.HOME" color="blue">
                <template #title>Jouer</template>
                <template #description>Teste tes connaissances sur les départements français et franchis tous les niveaux</template>
            </AppLevelButton>
            <AppLevelButton :icon="IconEnum.LEARN" :to="RouteEnum.HOME" color="green">
                <template #title>Apprendre</template>
                <template #description>Explore les départements français à travers une expérience éducative divisée par niveaux</template>
            </AppLevelButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppLevelButton from '@/components/AppLevelButton.vue';
import { IconEnum } from '@/enums/IconEnum';
import { RouteEnum } from '@/enums/RouteEnum';
</script>
