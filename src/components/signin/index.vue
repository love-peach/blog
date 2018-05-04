<template>
    <modal v-if="globalStore.showSignInModal" @close="closeModel">
        <h3 slot="header">登录</h3>
        <div class="sign-in-form" slot="body">
            <input v-model="formData.account" type="text" placeholder="昵称">
            <input v-model="formData.password" type="password" placeholder="密码">
        </div>
        <div slot="footer">
            <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-success" @click="login">确定登录</a>
            <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-primary" @click="goToRegister">我要注册</a>
        </div>
    </modal>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

