<template>
    <div class="levels-container">
        <div class="levels-row" v-for="(levels, rowIndex) in levelPairs" :key="rowIndex">
            <AppButton v-for="level in levels" :key="level.index" :to="`/${$route.params.mode}/${level.index}`" :color="level.color" :class="levels.length === 1 ? 'button--full' : ''">
                <template #badge>{{ level.index }}</template>
                <template #title>Niveau {{ level.index }}</template>
                <template #description>Départements de {{ level.intervalStart }} à {{ level.intervalEnd }}</template>
            </AppButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import type { LevelType } from '@/types/LevelType';

const levelPairs: LevelType[][] = [
    [
        {
            index: 1,
            intervalStart: '01',
            intervalEnd: '10',
            color: 'red'
        },
        {
            index: 2,
            intervalStart: '11',
            intervalEnd: '2A',
            color: 'green'
        }
    ],
    [
        {
            index: 3,
            intervalStart: '2B',
            intervalEnd: '29',
            color: 'blue'
        },
        {
            index: 4,
            intervalStart: '30',
            intervalEnd: '39',
            color: 'orange'
        }
    ],
    [
        {
            index: 5,
            intervalStart: '40',
            intervalEnd: '49',
            color: 'green'
        },
        {
            index: 6,
            intervalStart: '50',
            intervalEnd: '59',
            color: 'red'
        }
    ],
    [
        {
            index: 7,
            intervalStart: '60',
            intervalEnd: '69D',
            color: 'orange'
        },
        {
            index: 8,
            intervalStart: '69M',
            intervalEnd: '78',
            color: 'blue'
        }
    ],
    [
        {
            index: 9,
            intervalStart: '79',
            intervalEnd: '88',
            color: 'red'
        },
        {
            index: 10,
            intervalStart: '89',
            intervalEnd: '973',
            color: 'green'
        }
    ],
    [
        {
            index: 11,
            intervalStart: '974',
            intervalEnd: '989',
            color: 'blue'
        }
    ]
];
</script>
