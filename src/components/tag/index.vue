<template>
    <span
        :class="['tag', type ? `tag-${type}` : '', size ? `tag-${size}` : '']"
        :style="{'border-radius': radius}">
        <slot></slot>
    </span>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

