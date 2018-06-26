<template>
    <span
        :class="['tag', type ? `tag-${type}` : '', size ? `tag-${size}` : '', closeAble ? 'tag-close-able' : '']"
        :style="{'border-radius': radius}">
        <slot></slot>
        <i v-if="closeAble" class="iconfont icon-Close" @click="$emit('close')"></i>
    </span>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

