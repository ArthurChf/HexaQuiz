import { RouteEnum } from '@/enums/RouteEnum';
import Home from '@/views/Home.vue';
import Learn from '@/views/Learn.vue';
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
            path: `${RouteEnum.LEVELS}/:mode`,
            meta: {
                previous: RouteEnum.HOME
            }
        },
        {
            component: Learn,
            path: RouteEnum.LEARN_PARAM,
            meta: {
                previous: RouteEnum.LEVELS_LEARN,
                page: RouteEnum.LEARN_PARAM
            }
        },
        { path: '/:pathMatch(.*)', redirect: RouteEnum.HOME }
    ]
});

export default router;
