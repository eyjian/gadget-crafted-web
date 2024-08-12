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
      </div>
    </div>

    <div class="input-section">
      <div class="flex-container">
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
      <div v-for="(value, key) in booleanOptions" :key="key" class="checkbox-container">
        <label :for="`checkbox-${key}`">{{ value }}:</label>
        <input type="checkbox" :id="`checkbox-${key}`" v-model="request[key]">
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
        with_gorm: '是否生成 Gorm Tag',
        with_json: '是否生成 Json Tag',
        with_db: '是否生成 DB Tag',
        with_form: '是否生成 Form Tag',
        with_table_name_func: '是否生成 TableName 方法',
        json_with_prefix: '生成的 Json Tag 时是否添加前缀',
        form_with_prefix: '生成的 Form Tag 时是否添加前缀'
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
body {
  background-color: white;
}

/* 样式可以根据需要进行调整 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: black;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.input-section, .switch-section, .output-section {
  margin-bottom: 20px;
}

.wd-1200 {
  width: 100%;
  max-width: 1200px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
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
  margin-bottom: 10px;
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
}

.generate-btn:hover {
  background-color: #45a049;
}
</style>
