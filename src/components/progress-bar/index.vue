<!-- borrowed from Nuxt! -->

<template>
    <div class="progress" :style="{
        'width': percent + '%',
        'height': height,
        'background-color': canSuccess ? color : failedColor,
        'opacity': show ? 1 : 0
    }"></div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
