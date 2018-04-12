<template>
    <div id="jsHeaderBar" class="header-bar">
        <div class="z-container">
            <div class="z-row">
                <div class="z-col-45">
                    <div class="nav-wrap">
                        <router-link to="/" active-class="current" exact class="nav-bread">zhangjinpei</router-link>
                        <router-link to="/" active-class="current" exact class="nav-link">首页</router-link>
                        <router-link to="/wordpress" active-class="current" exact class="nav-link">前端技术</router-link>
                        <router-link to="/thoughts" active-class="current" exact class="nav-link">图文有感</router-link>
                        <router-link to="/resources" active-class="current" exact class="nav-link">前端资源</router-link>
                        <router-link to="/board" active-class="current" exact class="nav-link">留言</router-link>
                    </div>
                </div>
                <div class="z-col-15">
                    <div class="search-wrap">
                        <input class="search-input" v-model="searchWord" type="text" @keyup.enter="search">
                        <span class="search-text" @click="search">搜索</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./style.less" scoped lang="less"></style>
<script src="./script.js"></script>

