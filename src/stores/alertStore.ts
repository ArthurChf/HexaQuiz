import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
    const show = ref(false);
    const alertId = ref(0);
    const message = ref('');
    const title = ref('');
    const alertTimeout = ref(-1);

    const closeAlert = () => {
        show.value = false;
        clearTimeout(alertTimeout.value);
    };

    const setAlert = (alertTitle: string, alertMessage: string) => {
        title.value = alertTitle;
        message.value = alertMessage;
        alertId.value++;
        show.value = true;

        clearTimeout(alertTimeout.value);
        alertTimeout.value = window.setTimeout(closeAlert, 4000);
    };

    return {
        show,
        alertId,
        message,
        title,
        setAlert,
        closeAlert
    };
});
