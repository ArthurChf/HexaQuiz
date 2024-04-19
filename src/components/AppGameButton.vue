<template>
    <div class="game-button-container">
        <button role="button" type="button" class="button" :class="`game-button--${color}`" @click="isChecked = !isChecked">
            <span><slot /></span>
            <Transition :name="TransitionEnum.FADE">
                <AppIcon v-if="isChecked" :name="IconEnum.CHECK" size="8" />
            </Transition>
        </button>
    </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import type { ColorType } from '@/types/ColorType';

defineProps<{
    color: ColorType;
}>();

const isChecked = defineModel<boolean>({
    default: false
});
</script>
