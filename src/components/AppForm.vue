<template>
    <form @submit.prevent="submitForm">
        <div class="form__container">
            <slot :set-form-value="setFormValue" :errors="errors"></slot>
        </div>
        <button type="submit" class="form__button" :disabled="pending">{{ buttonValue }}</button>
    </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import * as yup from 'yup';

const props = defineProps<{
    buttonValue: string;
    pending?: boolean;
    validationSchema: yup.ObjectShape;
}>();

const emit = defineEmits<(e: 'submit', values: object) => Promise<void>>();

const yupSchema = yup.object(props.validationSchema);

const values = reactive<Record<string, string | boolean | number>>({});
const errors = reactive<Record<string, string>>({});

Object.keys(yupSchema.fields).forEach((key) => {
    values[key] = '';
    errors[key] = '';
});

const validateValues = async (names?: string[]) => {
    try {
        if (names) {
            const limitedValues: Record<string, string> = Object.keys(values).reduce((obj, v) => {
                if (names.includes(v)) return { ...obj, [v]: values[v] };
                return obj;
            }, {});
            const limitedSchema = yup.object(Object.keys(props.validationSchema).reduce((obj, key) => {
                if (Object.keys(limitedValues).includes(key)) {
                    return { ...obj, [key]: props.validationSchema[key] };
                }
                return obj;
            }, {}));
            await limitedSchema.validate(limitedValues, { abortEarly: false });
            Object.keys(limitedSchema.fields).forEach((key) => {
                errors[key] = '';
            });
        } else {
            await yupSchema.validate(values, { abortEarly: false });
            Object.keys(yupSchema.fields).forEach((key) => {
                errors[key] = '';
            });
        }
        return true;
    } catch (e: unknown) {
        if (yup.ValidationError.isError(e)) {
            const hasError: Record<string, string> = {};
            const errorPaths: string[] = [];
            e.inner.forEach((error) => {
                if (!hasError[error.path!]) {
                    errors[error.path!] = error.message;
                    hasError[error.path!] = error.message;
                }
                errorPaths.push(error.path!);
            });
            if (names) {
                names.forEach((name) => {
                    if (!errorPaths.includes(name)) errors[name] = '';
                });
            }
        }
        return false;
    }
};

const setFormValue = async (names: string[], value: string | number | boolean) => {
    values[names[0]!] = value;
    await validateValues(names);
};

const submitForm = async () => {
    if (props.pending) return;
    if (await validateValues()) emit('submit', values);
};
</script>
