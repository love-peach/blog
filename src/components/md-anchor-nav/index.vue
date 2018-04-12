<template>
    <ul class="md-anchor-nav">
        <li v-for="(nav, index) in list" :key="index">
            <a :href="nav.index | anchor" :class="{active: highLightIndex === nav.index}">{{nav.title}}</a>
            <md-anchor-nav :list="nav.children" v-if="nav.children.length > 0"/>
        </li>
    </ul>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

