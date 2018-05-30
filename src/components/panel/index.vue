<template>
    <div class="panel-wrap">
        <div class="panel-header clearfix">
            <div class="header-title fl">
                <slot name="panel-title"></slot>
            </div>
            <span class="header-additional fr">
                <slot name="panel-additional"></slot>
            </span>
        </div>
        <div class="panel-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

