import { createRouter, createWebHistory } from 'vue-router';
import gcts from '../views/gcts.vue'
import s2s from '../views/s2s.vue'

const routes = [
    {
        path: '/',
        redirect: '/s2s',
    },
    {
        path: '/gcts',
        name: 'gcts',
        component: gcts
    },
    {
        path: '/s2s',
        name: 's2s',
        component: s2s
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
