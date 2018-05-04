<template>
    <modal v-if="globalStore.showSignUpModal" @close="closeModel">
        <h3 slot="header">注册</h3>
        <div class="sign-up-form" slot="body">
            <input v-model="formData.account" type="text" placeholder="昵称">
            <input v-model="formData.email" type="text" placeholder="邮箱">
            <input v-model="formData.password" type="password" placeholder="密码">
            <input v-model="formData.confirmPassword" type="password" placeholder="确认密码">
        </div>
        <div slot="footer">
            <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-success" @click="register">确定注册</a>
            <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-primary" @click="goToLogIn">直接登录</a>
        </div>
    </modal>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

