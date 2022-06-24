import {createRouter, createWebHistory} from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';

const routes = <RouteRecordRaw[]>[
    {
        name: 'Index',
        path: '/',
        component: () => import('@pages/index.vue')
    },
    {
        name: 'About',
        path: '/about',
        component: () => import('@pages/about.vue')
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;