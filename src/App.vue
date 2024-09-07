<template>

    <div id="main-container">
        <div id="nav-container">
            <ul>
                <li class="image-li">
                    <img :src="imgUrl" :alt="imgAlt" :width="imgWidth" :height="imgHeight">
                </li>
                <li><router-link to="/gcts">生成建表SQL</router-link></li>
                <li><router-link to="/s2s">SQL转Struct</router-link></li>
            </ul>
        </div>
        <div id="content-container">
        </div>
    </div>
    <div id="footer-container"></div>

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

#main-container {
    display: flex;
    height: 800px;
    border: 1px solid red; /* 设置细实线边框，颜色为蓝色 */
}

#footer-container {
    height: 100px;
    border: 1px solid red; /* 设置细实线边框，颜色为蓝色 */
}

#nav-container {
    width: 200px;
    border: 1px solid rgb(204, 255, 0); /* 设置细实线边框，颜色为蓝色 */
}

#content-container {
    flex-grow: 1; /* 使子元素填充剩余空间 */
    border: 1px solid rgb(204, 255, 0); /* 设置细实线边框，颜色为蓝色 */
}

ul li {
    list-style-type: none; /* 移除列表项前面的点 */
}

a {
    text-decoration: none; /* 去掉超链接的下划线 */
}

</style>