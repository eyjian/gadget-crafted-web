<template>
  <div class="container">
    <h1>SQL 转 Go Struct 在线工具</h1>

    <div class="flex-input">
      <!-- 左：输入框 -->
      <div class="left-div input-sql">
        <label for="sqlInput">建表 SQL 语句:</label><p></p>
        <textarea id="sqlInput" v-model="request.sql" rows="15" @input="updateHeight"></textarea>
      </div>
      <!-- 中：间隙 -->
      <div class="center-div input-gap">
      </div>
      <!-- 右：示例框 -->
      <div class="right-div input-example">
        <label for="sqlExample">示例:</label><p></p>
        <div id="flex-sql-example">
          <textarea id="sqlExample" v-model="sqlExample" rows="15" readonly></textarea>
        </div>
      </div>
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
    <button class="generate-btn" @click="sendRequest">根据建表 SQL 生成 Go struct</button>

    <!-- 结果框 -->
    <div class="output-section">
      <label for="resultInput">Go Struct:</label>
      <textarea class="wd-1200" id="resultInput" v-model="response.Result" rows="15" readonly></textarea>
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
        json_with_prefix: 'Json Tag 保留前缀',
        form_with_prefix: 'Form Tag 保留前缀'
      },
      sqlExample: `-- 规范约束：只能一个"CREATE TABLE"，每行一个字段
CREATE TABLE \`t_user\` ( -- 需独占一行
  f_id INT NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  f_name VARCHAR NOT NULL DEFAULT '' COMMENT '姓名',
  f_age INT NOT NULL DEFAULT '0' COMMENT '年龄',
  f_phone VARCHAR NOT NULL COMMENT '手机',
  f_email VARCHAR NOT NULL COMMENT '电子邮箱',
  f_address VARCHAR NOT NULL COMMENT '联系地址',
  f_memo VARCHAR DEFAULT '' COMMENT '备注',
  PRIMARY KEY (f_id) -- 需独占一行
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; -- 需独占一行`
    };
  },
  methods: {
    updateHeight() {
      const sqlInput = document.getElementById('sqlInput');
      const sqlExample = document.getElementById('sqlExample');
      const flexSqlExample = document.getElementById('flex-sql-example');
      sqlExample.style.height = sqlInput.scrollHeight + 'px';
    },

    async sendRequest() {
      if (!this.request.sql.trim()) {
        this.request.sql = this.sqlExample
      }
      if (!this.request.sql.trim()) {
        alert('请输入建表 SQL 语句');
        return;
      }

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
          const responseBody = await response.text(); // 等待获取响应体的文本内容
          console.error(responseBody); // 打印响应体的文本内容
          this.response.Result = `服务响应错误: ${responseBody}`;
          throw new Error(this.response.Result); // 抛出包含响应体内容的错误
        }

        const data = await response.json();
        this.response.Result = data.result;
      } catch (error) {
        console.error('请求失败:', error);
        //this.response.Result = '请求失败，请检查控制台错误信息。';
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
  box-sizing: border-box; /* 包括内边距和边框在内的宽度和高度 */
  margin: 10px auto 0;
  width: 1350px; /* 固定宽度 */
  height: auto; /* 高度可以根据内容自适应，如果不需要自适应，也可以设置为固定值 */
  padding: 10px;
  font-family: Arial, sans-serif;
  color: black;
}

.flex-input {
  display: flex;
  flex-direction: row; /* 默认值，水平排列子元素 */
}

.left-div,
.center-div,
.right-div {
  align-items: center; /* 垂直居中对齐内容 */
  justify-content: center; /* 水平居中对齐内容 */
  border: 0px solid #ccc; /* 添加边框以便观察效果 */
}

.input-sql {
  display: inline-block;
  margin: 2px;
  flex:55;
}

.input-gap {
  margin: 2px;
}

.input-example {
  display: inline-block;
  margin: 2px;
  flex: 45;
  alignment: left;
}

#sqlExample{
  /*
    没有这个的时候会收缩到左侧，将 width 设置为 100% 可以确保元素完全填充满其父容器的宽度；
    如果没有设置 width 或者将其设置为其他值（如 auto），元素可能会根据其内容自动调整宽度，这可能导致元素收缩到左侧或右侧，而不是填充满整个父容器。
  */
  width: 100%;
  height: 100%;
  resize: none; /* 禁止调整大小 */
  overflow: hidden; /* 隐藏滚动条 */
  color: #888;
}

#sqlInput{
  min-width: 630px;
  resize: both; /* 允许用户自由放大或缩小textarea */
  overflow: auto;
  flex-grow: 1; /* 让textarea占据剩余空间 */
  overflow: auto; /* 当内容超出容器时出现滚动条 */
  /* resize: vertical; 只允许垂直调整大小 */
}

#resultInput{
  resize: vertical; /* 只允许垂直调整大小 */
}

.output-section {
  margin-bottom: 10px;
}

.switch-section {
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

@media (max-width: 768px) {
  .flex-column {
    flex: 0 0 calc(33.33% - 10px); /* 33.33%即每行3个，减去间距确保最后一行的元素也能对齐 */
  }
}

</style>
