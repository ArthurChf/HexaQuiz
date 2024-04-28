import { useAlertStore } from '@/stores/alertStore';

export const useAlert = (title: string, message: string) => {
    const alertStore = useAlertStore();
    alertStore.setAlert(title, message);
};
