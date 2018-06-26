<template>
    <div class="comment-form-wrap">
        <img class="user-avatar" src="" alt="" />

        <div v-show="userId" class="comment-form">
            <div class="form-box">
                <textarea name="" id=""></textarea>
            </div>
            <div class="form-bottom clearfix">
                <p class="user-name">Hello, <span>金佛艾尔</span></p>
                <span class="form-bottom-tip">Ctrl or ⌘ + Enter</span>
                <a href="javascript:;" class="z-btn z-btn-info"> 发表评论 </a>
            </div>
        </div>
        <div v-show="!userId" class="comment-without-login">
            登录之后才能评论,请点击
            <span class="btn-login" @click="login">登录</span>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

