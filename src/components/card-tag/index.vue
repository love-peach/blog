<template>
    <card title="热门标签">
        <div class="hot-tag-list">
            <router-link
                class="hot-tag-item"
                v-for="tag,index in tagList.list"
                :to=" '/search/' + tag.name"
                :key="index"
            >{{ tag.name }}
            </router-link>
        </div>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

