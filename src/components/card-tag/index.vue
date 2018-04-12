<template>
    <card title="热门标签">
        <div class="hot-tag-list">
            <a class="hot-tag-item" href="" v-for="tag in tagList">{{ tag }}</a>
        </div>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

