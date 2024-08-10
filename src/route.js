// router/index.js 或者 router.js
import { createRouter, createWebHistory } from 'vue-router';
import Sql2Struct from './components/Sql2Struct.vue'; // 假设你的组件在这个路径

const routes = [
    {
        path: '/sql2struct',
        name: 'Sql2Struct',
        component: Sql2Struct
    },
    // ...其他路由
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
