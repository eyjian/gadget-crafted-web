<template>
  <div class="container">
    <h1>SQL 转 Go Struct 在线工具</h1>

    <!-- 输入框 -->
    <div class="input-section">
      <label for="sqlInput">建表 SQL 语句:</label>
      <textarea class="wd-1200" id="sqlInput" v-model="request.sql" rows="10"></textarea>
    </div>

    <!-- 前缀控制 -->
    <div class="input-section">
      <div class="flex-container">
        <div class="flex-item">
          <label for="packageNameInput">包名:</label>
          <input type="text" id="packageNameInput" v-model="request.package_name">
        </div>
        <div class="flex-item"> <!-- 自定义标签 -->
          <label for="customTagsInput">自定义 Tags:</label>
          <input type="text" id="customTagsInput" v-model="request.custom_tags" placeholder="例如：">
        </div>
        <div class="flex-item">
          <label for="tablePrefixInput">表名前缀:</label>
          <input type="text" id="tablePrefixInput" v-model="request.table_prefix" placeholder="例如：t_">
        </div>
        <div class="flex-item">
          <label for="fieldPrefixInput">字段名前缀:</label>
          <input type="text" id="fieldPrefixInput" v-model="request.field_prefix" placeholder="例如：f_">
        </div>
      </div>
    </div>

    <!-- 开关 -->
    <div class="switch-section">
      <div class="grid-container">
        <div v-for="(value, key) in booleanOptions" :key="key" class="checkbox-container">
          <div class="flex-container">
            <input type="checkbox" :id="`checkbox-${key}`" v-model="request[key]">
            <label :for="`checkbox-${key}`"> {{ value }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成按钮 -->
    <button class="generate-btn" @click="sendRequest">生成 struct</button>

    <!-- 结果框 -->
    <div class="output-section">
      <label for="resultInput">响应结果:</label>
      <textarea class="wd-1200" id="resultInput" v-model="response.Result" rows="10" readonly></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      request: {
        sql: '',
        package_name: '',
        table_prefix: '',
        field_prefix: '',
        with_gorm: false,
        with_json: false,
        with_db: false,
        with_form: false,
        with_table_name_func: false,
        json_with_prefix: false,
        form_with_prefix: false,
        custom_tags: ''
      },
      response: {
        Result: ''
      },
      booleanOptions: {
        with_gorm: '生成 Gorm Tag',
        with_json: '生成 Json Tag',
        with_db: '生成 DB Tag',
        with_form: '生成 Form Tag',
        with_table_name_func: '生成 TableName 方法',
        json_with_prefix: 'Json Tag 添加前缀',
        form_with_prefix: 'Form Tag 添加前缀'
      }
    };
  },
  methods: {
    async sendRequest() {
      try {
        const response = await fetch('http://127.0.0.1:2024/api/sql2struct', {
          method: 'POST',
          //dataType: 'jsonp',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.request)
        });

        if (!response.ok) {
          throw new Error('网络响应错误');
        }

        const data = await response.json();
        this.response.Result = data.result;
      } catch (error) {
        console.error('请求失败:', error);
        this.response.Result = '请求失败，请检查控制台错误信息。';
      }
    }
  }
};
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
  max-width: 1350px;
  margin: 0 auto;
  padding: 100px; /* 影响页面整体布局是否居中 */
  font-family: Arial, sans-serif;
  color: black;
}

.input-section, .switch-section, .output-section {
  margin-bottom: 20px;
}

.wd-1200 {
  width: 100%;
  max-width: 1350px;
}

.flex-container {
  display: flex; /* 使容器成为一个 flex 容器 */
  align-items: center; /* 水平居中对齐 flex 容器内的元素 */
  //justify-content: center; /* 垂直居中对齐 flex 容器内的元素 */
  gap: 10px; /* 在 flex 容器内的元素之间添加间距 */
}

.flex-item {
  display: flex;
  align-items: center;
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
