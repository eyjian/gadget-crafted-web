<template>

    <div id="input-container">
        <div id="sql-container">
            <textarea id="sql-input" placeholder="请输入建表SQL"></textarea>
        </div>
        <div id="example-container">
            <textarea id="example-input" placeholder="请输入建表SQL示例" readonly></textarea>
        </div>
    </div>

    <div class="setting-container">
        <div class="setting1-container">
            <div class="setting1-child-container">
                <label for="packageNameInput">包名:</label>
                <input type="text" id="packageNameInput" v-model="request.package_name">
            </div>

            <div class="setting1-child-container">
                <label for="tableNameInput">表名前缀:</label>
                <input type="text" id="tablePrefixInput" v-model="request.table_prefix" placeholder="例如：t_">
            </div>

            <div class="setting1-child-container">
                <label for="fieldNameInput">字段名前缀:</label>
                <input type="text" id="fieldPrefixInput" v-model="request.field_prefix" placeholder="例如：f_">
            </div>

            <div class="setting1-child-container">
                <label for="customTagsInput">自定义Tags:</label>
                <input type="text" id="customTagsInput" v-model="request.custom_tags" placeholder="例如：">
            </div>
        </div>
        <div class="setting2-container">
            <div class="setting2-child-container">
                <label><input type="checkbox" class="checkbox">生成 Gorm Tag</label>
                <label><input type="checkbox" class="checkbox">生成 Json Tag</label>
                <label><input type="checkbox" class="checkbox">生成 DB Tag</label>
                <label><input type="checkbox" class="checkbox">生成 Form Tag</label>
            </div>
            <div class="setting2-child-container">
                <label><input type="checkbox" class="checkbox">生成 TableName 方法</label>
                <label><input type="checkbox" class="checkbox">Json Tag 保留前缀</label>
                <label><input type="checkbox" class="checkbox">Form Tag 保留前缀</label>
            </div>
        </div>
        <div class="setting3-container">

        </div>
    </div>

</template>

<script>

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
            }
        }
    }

</script>

<style>

#input-container {
    display: flex;
    flex-direction: row;
    height: 300px;
    flex: 1; /* 使容器占据剩余空间 */
}

#sql-container {
    flex: 0 0 60%;
    width: 600px;
    max-width: 100%; /* 不超过父div的宽度 */
    max-height: 100%; /* 不超过父div的高度 */
    margin-right: 5px; /* 一半的间隙 */
}

#example-container {
    flex: 1;
    max-width: 100%; /* 不超过父div的宽度 */
    max-height: 100%; /* 不超过父div的高度 */
    margin-left: 5px; /* 另一半的间隙 */
}

#sql-input, #example-input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.setting-container {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

.setting1-container {
    display: flex;
    flex-direction: row;
    margin-right: 5px; /* 一半的间隙 */
    flex-grow: 1; /* 占满剩余空间 */
}

.setting1-container label {
    margin-right: 10px;
    margin-left: 20px;
}

.setting1-child-container {
    flex: 1; /* 每个子div平分父div的宽度 */
}

.setting2-child-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  margin: 10px 10px;
}

.setting2-child-container:first-child {
  justify-content: space-between; /* 第一行均匀分布 */
}

.setting2-child-container:last-child {
  justify-content: flex-start; /* 最后一行从左到右对齐 */
}

.checkbox {
  margin-right: 5px; /* 可选：设置复选框和标签之间的间隔 */
}

</style>
