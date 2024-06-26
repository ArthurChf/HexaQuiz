import { RouteEnum } from '@/enums/RouteEnum';
import Home from '@/views/Home.vue';
import Learn from '@/views/Learn.vue';
import Levels from '@/views/Levels.vue';
import Play from '@/views/Play.vue';
import Settings from '@/views/Settings.vue';
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
        {
            component: Play,
            path: RouteEnum.PLAY_PARAM,
            meta: {
                previous: RouteEnum.LEVELS_PLAY,
                page: RouteEnum.PLAY_PARAM
            }
        },
        {
            component: Settings,
            path: RouteEnum.SETTINGS,
            meta: {
                previous: RouteEnum.HOME
            }
        },
        { path: '/:pathMatch(.*)', redirect: RouteEnum.HOME }
    ]
});

export default router;
