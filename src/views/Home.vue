<template>
    <div class="home">
        <div class="game-modes">
            <AppButton :icon="IconEnum.PLAY" :to="`${RouteEnum.LEVELS}/play`" color="blue">
                <template #title>Jouer</template>
                <template #description>Teste tes connaissances sur les départements français et franchis tous les niveaux</template>
            </AppButton>
            <AppButton :icon="IconEnum.LEARN" :to="`${RouteEnum.LEVELS}/learn`" color="green">
                <template #title>Apprendre</template>
                <template #description>Explore les départements français à travers une expérience éducative divisée par niveaux</template>
            </AppButton>
        </div>
        <AppButton :icon="IconEnum.STATS" :to="RouteEnum.HOME" color="orange">
            <template #title>Statistiques</template>
            <template #description>Consulte tes statistiques, elles représentent tes performances en jeu (pourcentage de réussite, nombre de points, temps moyen par question)</template>
        </AppButton>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import { IconEnum } from '@/enums/IconEnum';
import { RouteEnum } from '@/enums/RouteEnum';
</script>
