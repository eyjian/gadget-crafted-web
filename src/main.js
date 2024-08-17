import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/dist/tdesign.css'; // 引入样式（文件在 node_modules 目录下）

const app = createApp(App);

app.use(router);
app.use(TDesign);
app.mount('#app');
