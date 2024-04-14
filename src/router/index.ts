import { RouteEnum } from '@/enums/RouteEnum';
import Home from '@/views/Home.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory('/HexaQuiz/demo/'),
    routes: [
        {
            component: Home,
            path: RouteEnum.HOME
        },
        { path: '/:pathMatch(.*)', redirect: '/' }
    ]
});

export default router;
