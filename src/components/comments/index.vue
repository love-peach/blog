<template>
    <div class="comment-wrap">
        <h3 class="comment-title">全部评论 / <span class="comment-number">{{ comments.total }}</span></h3>
        <CommentList :commentsList="comments.list" :isLogin="isLogin"/>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

