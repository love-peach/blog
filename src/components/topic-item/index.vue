<template>
    <div class="topic-item-wrap">
        <div class="topic-content">
            <div class="topic-head">
                <div class="topic-title-time">
                    <h1 class="head-title">
                        <router-link :to="{ path: '/detail/wordpress/' + topic._id }">{{ topic.title}}</router-link>
                    </h1>
                    <time class="head-time">
                        <span class="time-day">{{ topic.createAt | formatDay }}</span>
                        <span class="time-month">{{ topic.createAt | formatMonth }}</span>
                        <span class="time-year">{{ topic.createAt | formatYear }}</span>
                    </time>
                </div>
                <div class="topic-article-info">
                    <span class="info-author">作者: {{ topic.author }}</span>
                    <span class="info-category">分类: {{ topic.category }}</span>
                    <span class="info-tag">标签: {{ topic.tag.join(' ') }}</span>
                </div>
            </div>
            <div class="topic-body clearfix">
                <div class="topic-img-wrap">
                    <router-link class="topic-img-link" :to="{ path: '/detail/wordpress/' + topic._id }">
                        <img class="topic-img" :src="topic.poster" alt="">
                    </router-link>
                </div>
                <div class="topic-text-wrap">
                    <div class="topic-text">{{ topic.content }}</div>
                </div>
            </div>
        </div>
        <topicItemAction :topic="topic"/>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

