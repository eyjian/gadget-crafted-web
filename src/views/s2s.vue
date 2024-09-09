<template>

    <div id="input-container">
        <div id="sql-container">
            <textarea id="sql-input" placeholder="请输入建表SQL"></textarea>
        </div>
        <div id="example-container">
            <textarea id="example-input" placeholder="请输入建表SQL示例"></textarea>
        </div>
    </div>

    <div id="setting-container">
    </div>

</template>

<script setup>
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


</style>
