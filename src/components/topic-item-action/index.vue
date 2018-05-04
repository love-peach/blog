<template>
    <div class="topic-action-wrap clearfix">
        {{topic.likes}}
        {{topic.likeStatus}}
        <a href="javascript:;" class="topic-action" :class="{'is-liked': topic.likeStatus}" @click="like">
            <i class="iconfont icon-like"></i> {{ topic.likeCount }} 赞
        </a>
        <a href="javascript:;" class="topic-action">
            <i class="iconfont icon-comment"></i> {{ topic.commentCount }} 评论
        </a>
        <a href="javascript:;" class="topic-action">
            <i class="iconfont icon-view"></i> {{ topic.viewed}} 浏览
        </a>
        <a href="javascript:;" class="topic-action" :id="topic._id" title="复制链接">
            <svg class="octicon octicon-clippy" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"></path></svg>
        </a>
        <!--<a href="javascript:;" class="topic-action" @click="download">-->
            <!--<i class="iconfont icon-md"></i> 下载-->
        <!--</a>-->
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

