<template>
    <card title="文章分类">
        <ul class="card-category-list" @mouseleave="checkPathname">
            <li class="category-item" v-for="nav,index in categoryList" :key="index" @mouseover="changeTop(index)">
                <router-link
                    exact
                    :to="nav.path"
                    active-class="current"
                    class="category-item-link"
                >
                    {{nav.name}}
                </router-link>
            </li>
            <li class="category-item-slider" :style="{top: topIndex * 40 + 'px'}"></li>
        </ul>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

