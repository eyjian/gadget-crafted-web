import { createRouter, createWebHistory } from 'vue-router';
import TheWelcome from '../components/TheWelcome.vue';
import GenerateCreateTableSql from '../components/GenerateCreateTableSql.vue';
import Sql2Struct from '../components/Sql2Struct.vue';

const routes = [
    {
        path: '/',
        redirect: '/gcts',
    },
    {
        path: '/gcts',
        name: 'gcts',
        component: GenerateCreateTableSql
    },
    {
        path: '/s2s',
        name: 's2s',
        component: Sql2Struct
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes
});

export default router;
