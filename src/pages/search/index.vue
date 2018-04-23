<template>
    <div class="page-search-wrap z-container">
        <div class="z-row">
            <div class="z-col-lg-45 z-col-md-43 z-col-sm-40 z-col-xs-60">
                <div class="topic-list">
                    <h2 class="search-tip hover-part-style">搜索：{{this.$route.params.key}}</h2>
                    <topicItem v-for="topic,index in topics.list" :key="index" :topic="topic"/>
                </div>
                <div v-if="topics.list.length === 0" class="no-topic-list">
                    暂无数据
                </div>
                <a v-if="topics.hasNext" href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-primary" @click="loadMore">更多</a>
            </div>
            <div class="z-col-lg-15 z-col-md-17 z-col-sm-20 z-col-xs-60">
                <cardSearch />
                <cardTag />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
