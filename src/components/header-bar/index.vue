<template>
    <div id="jsHeaderBar" class="header-bar header-bar-black">
        <div class="z-container">
            <router-link to="/" active-class="current" exact class="nav-bread">
                <i class="iconfont icon-logo"></i>
            </router-link>
            <div class="fr hidden-xs">
                <router-link v-for="nav,index in navList" :to="nav.path" active-class="current" exact class="nav-link" :key="index">{{nav.name}}</router-link>
                <div class="nav-link nav-me" :class="{'nav-me-login': !!userAccount}">
                    <a class="nav-me-link" @click="login" href="javascript:;" :title="userAccount">
                        <i class="iconfont icon-person"></i>
                    </a>
                    <div class="sub-nav-wrap" v-show="userAccount">
                        <router-link to="/user/account" class="sub-nav-item">设置</router-link>
                        <a href="javascript:;" class="sub-nav-item" @click="logout">退出</a>
                    </div>
                </div>
            </div>
            <div class="nav-menu-wrap visible-xs">
                <a class="nav-menu" href="javascript:;"><i class="iconfont icon-menu"></i></a>
                <div class="nav-menu-list">
                    <router-link v-for="nav,index in navList" :to="nav.path" active-class="current" exact class="nav-link" :key="index">{{nav.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./style.less" scoped lang="less"></style>
<script src="./script.js"></script>

