<template>
    <div
        class="switch-wrap"
        :class="{'is-disabled': disabled, 'is-checked': checked}"
        @click="switchValue"
    >
        <span class="switch-bar" ref="core">
            <span class="switch-point"></span>
        </span>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
