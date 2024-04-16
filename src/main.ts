import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/style/abstracts/colors.css';
import './assets/style/abstracts/fonts.css';
import './assets/style/abstracts/z-index.css';
import './assets/style/base/reset.css';
import './assets/style/base/base.css';
import './assets/style/components/alert.css';
import './assets/style/components/button.css';
import './assets/style/layouts/default.css';
import './assets/style/pages/home.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
