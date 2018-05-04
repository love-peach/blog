<template>
    <card title="目录">
        <div class="md-anchor-nav-wrap">
            <div id="mdAnchorFloatBar" class="md-anchor-float-bar"></div>
            <mdAnchorNav :list="articleTitles.nav" :offsetTopList="offsetTopList"/>
        </div>
    </card>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

