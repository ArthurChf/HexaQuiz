import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAppStore } from './stores/appStore';
import './assets/style/main.scss';
import { RouteEnum } from './enums/RouteEnum';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const appStore = useAppStore();

router.beforeEach((to, from, next) => {
    if (to.meta?.page !== RouteEnum.PLAY_PARAM) appStore.resetAll();
    next();
});

app.mount('#app');
