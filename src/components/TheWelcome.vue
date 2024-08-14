<template>
  <div class="container">
    <h1>小工具</h1>
  </div>
</template>

<script>
import axios from 'axios';

</script>

<style>

h1 {
  text-align: center;
  margin-bottom: 30px;
}

body {
  background-color: white;
  alignment: center;
  align-self: center;
}

/* 样式可以根据需要进行调整 */
.container {
  margin: 10px auto 0;
  max-width: 1350px;
  padding: 10px; /* 影响页面整体布局是否居中 */
  font-family: Arial, sans-serif;
  color: black;
}

.input-section {
  margin-bottom: 2px;
}

.switch-section, .output-section {
  margin-bottom: 10px;
}

.wd-1200 {
  width: 100%;
  max-width: 1350px;
}

.flex-container {
  display: flex; /* 使容器成为一个 flex 容器 */
  align-items: center; /* 水平居中对齐 flex 容器内的元素 */
//justify-content: center; /* 垂直居中对齐 flex 容器内的元素 */
  gap: 10px; /* 调整flex容器或grid容器中子元素之间的间距 */
}

.flex-item {
  display: flex;
  align-items: center;
  padding: 10px; /* 调整flex子元素的内边距 */
}

.flex-item label {
  white-space: nowrap;
  margin-right: 10px;
}

.flex-item input {
  flex-grow: 1;
}

.checkbox-container {
  margin-bottom: 10px; /* 可选：为每个复选框容器添加底部边距 */
}

.generate-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: black;
  border: none;
  cursor: pointer;
  margin-bottom: 20px; /* 调整这个值以增加按钮和结果框之间的间距 */
}

.generate-btn:hover {
  background-color: #45a049;
  color: white;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 第一行显示4个flex-container */
  grid-gap: 10px; /* 设置网格间距 */
}

.switch-section {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px; /* 调整这个值以减少两行间的间距 */
}

.flex-column {
  flex: 0 0 calc(25% - 10px); /* 25%即每行4个，减去间距确保最后一行的元素也能对齐 */
  margin-right: 10px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .flex-column {
    flex: 0 0 calc(33.33% - 10px); /* 33.33%即每行3个，减去间距确保最后一行的元素也能对齐 */
  }
}

</style>
