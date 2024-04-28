<template>
    <Transition :name="TransitionEnum.FADE_SLIDE">
        <div class="alert" v-if="show" :key="alertId">
            <div class="alert__header">
                <div class="alert__title">
                    <AppIcon :name="IconEnum.SUCCESS" size="12" />
                    <h3>{{ title }}</h3>
                </div>
                <div class="alert__close" @click="closeAlert">
                    <AppIcon :name="IconEnum.CLOSE" color="text-slate-900" size="12" />
                </div>
            </div>
            <p>{{ message }}</p>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alertStore';
import { IconEnum } from '@/enums/IconEnum';
import AppIcon from '@/components/AppIcon.vue';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { storeToRefs } from 'pinia';

const alertStore = useAlertStore();
const { alertId, title, message, show } = storeToRefs(alertStore);

const closeAlert = () => {
    alertStore.closeAlert();
};
</script>
