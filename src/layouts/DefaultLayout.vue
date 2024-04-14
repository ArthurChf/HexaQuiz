<template>
    <div class="bg-background flex flex-col min-h-screen">
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
