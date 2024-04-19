import { RouteEnum } from '@/enums/RouteEnum';
import Home from '@/views/Home.vue';
import Levels from '@/views/Levels.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory('/HexaQuiz/demo/'),
    routes: [
        {
            component: Home,
            path: RouteEnum.HOME
        },
        {
            component: Levels,
            path: `${RouteEnum.LEVELS}/:mode`
        },
        { path: '/:pathMatch(.*)', redirect: '/' }
    ]
});

export default router;
