<template>
    <div class="levels">
        ddd
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IconEnum } from '@/enums/IconEnum';
import { RouteEnum } from '@/enums/RouteEnum';

const route = useRoute();
console.log(route.params.mode);
</script>
