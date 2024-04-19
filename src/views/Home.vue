<template>
    <div class="home">
        <div class="game-modes">
            <AppHomeButton :icon="IconEnum.PLAY" :to="RouteEnum.HOME" color="blue">
                <template #title>Jouer</template>
                <template #description>Teste tes connaissances sur les départements français et franchis tous les niveaux</template>
            </AppHomeButton>
            <AppHomeButton :icon="IconEnum.LEARN" :to="RouteEnum.HOME" color="green">
                <template #title>Apprendre</template>
                <template #description>Explore les départements français à travers une expérience éducative divisée par niveaux</template>
            </AppHomeButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppHomeButton from '@/components/AppHomeButton.vue';
import { IconEnum } from '@/enums/IconEnum';
import { RouteEnum } from '@/enums/RouteEnum';
</script>
