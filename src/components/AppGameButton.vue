<template>
    <div class="game-button-container">
        <button role="button" type="button" :disabled="isDisabled" class="game-button" :class="[`game-button--${color}`, isDisabled ? 'game-button--disabled' : '']" @click="check">
            <span>{{ text }}</span>
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
import { useAppStore } from '@/stores/appStore';
import type { ColorType } from '@/types/ColorType';
import { ref } from 'vue';

const props = defineProps<{
    color: ColorType;
    text: string;
    answer?: string;
}>();

const emit = defineEmits<(e: 'nextQuestion') => void>();

const isDisabled = ref(false);
const isChecked = ref(false);

const check = () => {
    if (isDisabled.value || isChecked.value || !props.answer) return;

    isChecked.value = true;
    if (props.answer === props.text) emit('nextQuestion');
    else {
        const appStore = useAppStore();
        appStore.removeLife();
        isChecked.value = false;
        isDisabled.value = true;
    }
};
</script>
