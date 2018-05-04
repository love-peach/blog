<template>
    <card title="热门标签">
        <div class="hot-tag-list">
            <router-link
                class="hot-tag-item"
                v-for="tag,index in tagList"
                :to=" '/search/' + tag"
                :key="index"
            >{{ tag }}
            </router-link>
        </div>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

