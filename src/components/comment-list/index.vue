<template>
    <ol class="comment-list-wrap">
        <li v-for="comment, index in commentsList" :key="index">
            <img src="" alt="" class="comment-avatar">
            <span class="comment-index"> {{ index + 1 }}</span>
            <div class="comment-box">
                <div class="comment-meta">
                    <span class="comment-name"> {{ comment.authorName }}</span>
                    <span class="comment-time">{{ comment.time }} {{isShowCommentForm}}</span>
                    <span v-if="!isLogin" class="comment-reply-btn" @click="showLoginModal"> 登录以回复 </span>
                    <span v-else class="comment-reply-btn" @click="changeStatus(index)" :style="{'display': scopesDefault[index] ? 'inline-block' : ''}"> {{ scopesDefault[index] ? '取消回复' : '回复' }} </span>
                </div>
                <div class="comment-content"> {{ scopesDefault }} - {{ scopes }} - {{ comment.content }}</div>

                <CommentForm v-if="scopesDefault[index]" style="margin: 40px 0 20px;"/>
            </div>
            <comment-list
                :isLogin="isLogin"
                :commentsList="comment.reply"
                v-if="comment.reply.length > 0"
                class="child"/>
        </li>
    </ol>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

