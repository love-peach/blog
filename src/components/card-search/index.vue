<template>
    <card>
        <div class="card-search-wrap">
            <div class="search-wrap">
                <input class="search-input" v-model="searchWord" type="text" @keyup.enter="search">
                <a class="search-text" @click="search">
                    <i class="iconfont icon-search"></i>
                </a>
            </div>
        </div>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

