<template>
    <div class="backend-wrap">
        <ul class="quickly-entrance">
            <li class="entrance-item" v-for="entrance,index in entranceList" :key="index">
                <router-link class="entrance-link" :to="entrance.path">
                    <i :class="[entrance.icon,'iconfont']"></i><br>
                    {{entrance.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
