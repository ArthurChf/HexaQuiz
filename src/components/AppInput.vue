<template>
    <div class="input__container">
        <label class="input__label" :for="field.name">{{ field.label }}</label>
        <input type="number" autocomplete="off" class="input__field" :class="[!!errors[field.name] ? 'input--error' : 'input--default']" @input="updateValue" :id="field.name" v-model="inputDefaultValue" />

        <Transition :name="TransitionEnum.FADE_SLIDE" mode="out-in">
            <p v-if="!!errors[field.name]" class="input__error">{{ errors[field.name] }}</p>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { TransitionEnum } from '@/enums/TransitionEnum';
import type { Field } from '@/types/input/Field';
import { onMounted } from 'vue';

const props = withDefaults(defineProps<{
    errors: Record<string, string>;
    field: Field;
    setFormValue(names: string[], value: string | number | boolean): void;
    defaultValue?: string | number | boolean;
}>(), {
    defaultValue: undefined
});

const inputDefaultValue = props.defaultValue ?? '';

const updateValue = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement | HTMLSelectElement).value);
    props.setFormValue([props.field.name], value);
};

onMounted(() => {
    if (props.defaultValue !== undefined) {
        props.setFormValue([props.field.name], props.defaultValue);
    } else {
        if (props.field.default !== undefined) {
            props.setFormValue([props.field.name], props.field.default);
        }
    }
});
</script>
