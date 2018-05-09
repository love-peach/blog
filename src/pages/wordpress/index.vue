<template>
    <div class="wordpress-wrap z-container">
        <div class="z-row">
            <div class="z-col-lg-45 z-col-md-43 z-col-sm-40 z-col-xs-60">
                <h2 v-if="type === 'search' " class="search-tip hover-part-style">搜索：{{this.$route.params.keyword}}</h2>
                <div v-if="topics.list.length !== 0" class="topic-list">
                    <topicItem v-for="topic,index in topics.list" :key="index" :topic="topic"/>
                    <a v-if="topics.hasNext" href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-info btn-more" @click="loadMore">更多</a>
                </div>
                <div v-else class="no-topic-list">
                    暂无数据
                </div>
            </div>
            <div class="z-col-lg-15 z-col-md-17 z-col-sm-20 z-col-xs-60">
                <div id="jsCardMdNav" class="fixed-side-card">
                    <cardSearch />
                    <cardCategory v-if="type !== 'search' " />
                    <cardTag />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
