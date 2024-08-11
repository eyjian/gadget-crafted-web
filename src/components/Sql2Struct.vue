<template>
  <div>
    <div>
      <label for="sqlInput">SQL:</label>
      <textarea id="sqlInput" v-model="request.Sql" rows="10"></textarea>
    </div>
    <div>
      <label for="packageNameInput">Package Name:</label>
      <input type="text" id="packageNameInput" v-model="request.PackageName">
    </div>
    <div>
      <label for="tablePrefixInput">Table Prefix:</label>
      <input type="text" id="tablePrefixInput" v-model="request.TablePrefix">
    </div>
    <div>
      <label for="fieldPrefixInput">Field Prefix:</label>
      <input type="text" id="fieldPrefixInput" v-model="request.FieldPrefix">
    </div>
    <div v-for="(value, key) in booleanOptions" :key="key">
      <label :for="`checkbox-${key}`">{{ key }}:</label>
      <input type="checkbox" :id="`checkbox-${key}`" v-model="request[key]">
    </div>
    <div>
      <label for="customTagsInput">Custom Tags:</label>
      <input type="text" id="customTagsInput" v-model="request.CustomTags">
    </div>
    <button @click="sendRequest">生成</button>
    <div>
      <label for="resultInput">响应结果:</label>
      <textarea id="resultInput" v-model="response.Result" rows="10" readonly></textarea>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      request: {
        Sql: '',
        PackageName: '',
        TablePrefix: '',
        FieldPrefix: '',
        WithGorm: false,
        WithJson: false,
        WithDb: false,
        WithForm: false,
        WithTableNameFunc: false,
        JsonWithPrefix: false,
        FormWithPrefix: false,
        CustomTags: ''
      },
      response: {
        Result: ''
      },
      booleanOptions: {
        WithGorm: '是否生成 Gorm tag',
        WithJson: '是否生成 Json tag',
        WithDb: '是否生成 Db tag',
        WithForm: '是否生成 Form tag',
        WithTableNameFunc: '是否生成 TableName 方法',
        JsonWithPrefix: '生成的 Json tag 时是否添加前缀',
        FormWith栏位: '生成的 Form tag 时是否添加前栏位'
      }
    };
  },
  methods: {
    async sendRequest() {
      try {
        const response = await fetch('http://localhost:2024/api/sql2struct', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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
/* 样式可以根据需要进行调整 */
div {
  margin-bottom: 10px;
}
textarea, input {
  width: 300px;
}
button {
  margin-top: 20px;
}
</style>
