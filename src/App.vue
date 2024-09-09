<template>

    <div id="menu-container">
        <div class="logo-item menu-item">
            <img :src="imgUrl" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
        </div>
        <div class="menu-item menu-link-item">
            <router-link to="/gcts">生成建表SQL</router-link>
        </div>
        <div class="menu-item menu-link-item">
            <router-link to="/s2s">SQL转Struct</router-link>
        </div>
    </div>

    <div id="main-container">
        <div id="nav-container">
        </div>
        <div id="content-container">
            <!-- <router-view/> 可以看作是一个占位符，它告诉 Vue Router 在这里渲染匹配到的组件 -->
            <router-view/>
        </div>
    </div>

    <div id="footer-container">

    </div>

</template>

<script>

export default {

    data() {
        return {
            imgUrl: '/public/favicon.png',
            imgAlt: 'Logo',
            imgWidth: '64px',   // 设置图片宽度
            imgHeight: '64px',  // 设置图片高度
        }
    }
}

</script>

<style>

#menu-container {
    display: flex;
    flex-direction: row; /* 水平排列子元素 */
    height: 100px;
    border: 1px solid rgb(23, 13, 13); /* 设置细实线边框，颜色为蓝色 */
    margin: 1px;
}

#main-container {
    display: flex;
    height: 800px;
    border: 1px solid red; /* 设置细实线边框，颜色为蓝色 */
    margin: 1px;
}

#footer-container {
    height: 100px;
    border: 1px solid red; /* 设置细实线边框，颜色为蓝色 */
    margin: 1px;
}

#nav-container {
    width: 200px;
    border: 1px solid rgb(204, 255, 0); /* 设置细实线边框，颜色为蓝色 */
    margin: 1px;
}

#content-container {
    flex-grow: 1; /* 使子元素填充剩余空间 */
    border: 1px solid rgb(204, 255, 0); /* 设置细实线边框，颜色为蓝色 */
    margin: 1px;
}

.logo-item {
    width: 200px;
}

.menu-item {
    border: 1px solid rgb(204, 255, 0); /* 设置细实线边框，颜色为蓝色 */
    margin: 0 1px; /* 设置左右边距为1px */
    position: relative; /* 设置相对定位，使图片可以绝对定位 */

    align-content: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
}

.menu-link-item {
    margin: 0 10px; /* 设置左右边距为10px */
}

img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

a {
    text-decoration: none;
    color: black; /* 设置链接的默认颜色 */
    background-color: transparent; /* 设置链接的默认背景色 */
}

a:hover {
    background-color: yellow; /* 鼠标悬停时更改背景色 */
    font-weight: bold; /* 鼠标悬停时字体加粗 */
  }

</style>