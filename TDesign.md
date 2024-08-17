# 使用 TDesign Vue 组件

在已有基础上使用 [TDesign](https://tdesign.tencent.com/vue-next/getting-started) 组件。

# 安装 TDesign

```shell
sudo npm i tdesign-vue-next
```

# 引入 TDesign Vue 组件库

在项目的入口文件（如 main.js 或 main.ts）中完成。

```js
// main.js 或 main.ts
import { createApp } from 'vue';
import App from './App.vue';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/dist/index.css'; // 引入样式

const app = createApp(App);

app.use(TDesign);
app.mount('#app');
```

# 使用 TDesign 组件

```vue
<template>
  <t-button type="primary">主要按钮</t-button>
</template>

<script>
export default {
  name: 'MyComponent'
};
</script>
```
