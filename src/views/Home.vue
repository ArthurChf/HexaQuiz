<template>
    <div class="home">
        <div class="game-modes">
            <AppButton :to="RouteEnum.LEVELS_PLAY" color="blue">
                <template #badge><AppIcon :name="IconEnum.PLAY" size="12" /></template>
                <template #title>Jouer</template>
                <template #description>Teste tes connaissances sur les départements français et franchis tous les niveaux</template>
            </AppButton>
            <AppButton :to="RouteEnum.LEVELS_LEARN" color="green">
                <template #badge><AppIcon :name="IconEnum.LEARN" size="12" /></template>
                <template #title>Apprendre</template>
                <template #description>Explore les départements français à travers une expérience éducative divisée par niveaux</template>
            </AppButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { RouteEnum } from '@/enums/RouteEnum';
</script>
