<template>
    <div class="settings-container">
        <AppForm button-value="Sauvegarder" :validation-schema="validationSchemaSettings" @submit="formSubmitSettings" #default="{ errors, setFormValue }">
            <AppInput :field="fields.questionDuration" :errors="errors" :set-form-value="setFormValue" :default-value="maxQuestionDuration" />
            <AppInput :field="fields.lives" :errors="errors" :set-form-value="setFormValue" :default-value="maxLives" />
        </AppForm>
        <button type="button" class="settings__button">
            <AppIcon :name="IconEnum.RESET" size="9" />
            <span>Réinitialiser les statistiques</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import AppForm from '@/components/AppForm.vue';
import AppInput from '@/components/AppInput.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { useSettingsStore } from '@/stores/settingsStore';
import { storeToRefs } from 'pinia';
import { useAlert } from '@/composables/useAlert';

const settingsStore = useSettingsStore();
const { maxLives, maxQuestionDuration } = storeToRefs(settingsStore);

const fields = {
    questionDuration: { name: 'questionDuration', label: `Durée d'une question` },
    lives: { name: 'lives', label: 'Nombre de vies' }
};
const validationSchemaSettings = {
    questionDuration: yup.number().required().typeError(`Durée d'une question requise`).min(1, `La durée d'une question doit être supérieure ou égale à 1 seconde`).max(60, `La durée d'une question doit être inférieure ou égale à 60 secondes`),
    lives: yup.number().required().typeError('Nombre de vies requis').min(1, `Le nombre de vies doit être supérieur ou égal à 1`).max(3, `Le nombre de vies doit être inférieur ou égal à 3`)
};


const formSubmitSettings = async (formValues: object) => {
    const yupSchema = yup.object(validationSchemaSettings);
    const { lives, questionDuration } = formValues as yup.InferType<typeof yupSchema>;
    settingsStore.updateSettings({ maxLives: lives, maxQuestionDuration: questionDuration });
    useAlert('Paramètres modifiés', `Les changements ont bien été enregistrés`);
};
</script>
