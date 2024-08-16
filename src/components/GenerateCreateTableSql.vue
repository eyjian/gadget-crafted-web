<template>
  <div class="container">
    <h1>生成建表 SQL 工具</h1>

    <div class="flex-container">
      <!-- 左：输入框 -->
      <div class="left-div" id="input-text">
        <label for="sqlInput">建表文本:</label><p></p>
        <textarea id="sqlInput" v-model="request.text" rows="15"></textarea>
      </div>

      <!-- 中：间隙 -->
      <div class="center-div" id="input-gap"></div>

      <!-- 右：示例框 -->
      <div class="right-div" id="input-example">
        <label for="sqlExample">示例（分隔符前后可有空格或Tab符）:</label><p></p>
        <textarea id="sqlExample" v-model="textExample" rows="15" readonly></textarea>
      </div>
    </div>

    <!-- 控制 -->
    <div class="flex-control-section">
      <div id="container-tablename">
        <label>表名：</label>
        <input type="input" id="input-tablename" v-model="request.table_name">
      </div>

      <div id="container-delimiter">
        <label>分隔符：</label>
        <input type="input" id="input-delimiter" v-model="request.delimiter">
      </div>
    </div>

    <!-- 生成按钮 -->
    <button class="generate-btn" @click="sendRequest">根据建表文本生成建表 SQL</button>

    <!-- 结果框 -->
    <div class="flex-output-section">
      <div class="flex-label">
        <label for="resultInput">建表 SQL:</label>
        <button id="copy-btn" @click="copyResult">复制</button>
      </div>
      <textarea class="wd-1200" id="resultInput" v-model="response.Result" rows="16"></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 需安装 axios：npm install axios

export default {
  data() {
    return {
      request: {
        table_name:'',
        delimiter:'',
        text:'',
      },
      response: {
        Result: ''
      },
      textExample: `f_id;INT UNSIGNED NOT NULL AUTO_INCREMENT;自增 ID
f_name ;VARCHAR NOT NULL DEFAULT '' ;姓名
f_age ;INT NOT NULL DEFAULT '0' ;年龄
f_phone ;VARCHAR NOT NULL ;'手机
f_email ;VARCHAR NOT NULL ;电子邮箱
f_address ;VARCHAR NOT NULL ;联系地址
f_memo ;VARCHAR DEFAULT '' ;备注`
    };
  },
  methods: {
    copyResult() {
      const resultInput = document.getElementById('resultInput');
      navigator.clipboard.writeText(resultInput.value)
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
    },
    async sendRequest() {
      if (!this.request.text.trim()) {
        this.request.text = this.textExample;
        this.request.table_name = "t_user";
        this.request.delimiter = ";";
      }
      if (!this.request.delimiter.trim() || this.request.delimiter.trim().length !== 1) {
        alert('请指定单个字符作为分隔符');
        return;
      }
      if (!this.request.table_name.trim()) {
        alert('请指定表名');
        return;
      }
      if (!this.request.text.trim()) {
        alert('请输入建表文本');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:2024/api/generate_create_table_sql', this.request, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.info('请求成功', response.data)
        this.response.Result = response.data.create_table_sql;
      } catch (error) {
        console.error('请求失败:', error);

        // 检查 error.response 是否存在
        if (error.response) {
          // 检查 HTTP 状态码是否为 400
          if (error.response.status === 400) {
            // 获取错误内容
            const errorContent = error.response.data;
            console.error('HTTP 400 错误内容:', errorContent);
            this.response.Result = '请求失败，错误内容：' + JSON.stringify(errorContent);
          }
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          console.error('没有收到服务响应:', error.request);
          this.response.Result = '没有收到服务响应';
        } else {
          // 在设置请求时发生了一些事情，触发了错误
          console.error('请求设置错误:', error.message);
          this.response.Result = '请求设置错误';
        }
      }
    },
  },
};
</script>

<style>

.flex-container {
  display: flex;
  width: 100%;
}

#input-text {
  min-width: 500px;
  flex: 1;
}

#input-gap {
  width: 115px;
}

#input-example {
  flex: 1;
  width: 100%;
}

label {
  display: block;
}

.flex-control-section{
  display: flex;
  /* 设置上外边距为 10px */
  /* 设置下外边距为 10px */
  /* margin: 10px auto; */
  margin-top: 10px;
  margin-bottom: 20px;
}

#container-tablename {
  flex: 15;
}

#container-delimiter {
  flex: 85;
  width: 100%;
}

#input-tablename{
  margin: auto 1px;
}

#input-delimiter{
  margin: auto 1px;
}

.flex-label {
  display: flex;
  align-items: center; /* 垂直居中对齐子元素 */
}

.flex-output-section {
  display: block;
}

</style>
