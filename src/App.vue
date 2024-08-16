<template>
  <div id="app">
    <nav class="nav-bar">
      <ul>
        <li class="image-li">
          <img :src="imgUrl" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
        </li>
        <li><router-link to="/gcts">生成建表SQL</router-link></li>
        <li><router-link to="/s2s">SQL转Struct</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgUrl: '/public/favicon.png',
      imgAlt: 'Logo',
      imgWidth: '64px',   // 设置图片宽度
      imgHeight: '64px',  // 设置图片高度
    };
  },
};
</script>

<style>

#app {
  display: flex;
  width: 1500px; /* 固定宽度 */
  height: 1000px; /* 固定高度 */
}

.nav-bar ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-bar {
  width: 200px;
  background-color: #2c3e50;
  padding: 20px;
  color: white;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
}

.nav-bar li {
  margin-bottom: 10px;
}

.router-link-active {
  font-weight: bold;
}

</style>
