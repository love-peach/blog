<template>
    <div class="wordpress-detail-wrap">
        <div class="detail-header" :style="{'background-image': article.data.poster ? 'url(' + article.data.poster + ')' : '' }">
            <div id="gradeWrap" class="grade-wrap">
                <div class="z-container" >
                    <div class="title-wrap">
                        <h1 class="title">{{article.data.title}}</h1>
                        <Tag type="primary" size="sm">{{article.data.author}}</Tag>
                        <Tag type="info" size="sm">{{article.data.category}}</Tag>
                        <Tag type="success" size="sm">{{article.data.createAt}}</Tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="z-container">
            <div class="z-row">
                <div class="z-col-lg-45 z-col-md-43 z-col-sm-40 z-col-xs-60">
                    <div class="detail-content">
                        <div class="markdown-body" v-html="articleHtml"></div>
                    </div>
                </div>
                <div class="z-col-lg-15 z-col-md-17 z-col-sm-20 z-col-xs-60 hidden-xs">
                    <div id="jsCardMdNav">
                        <cardTag />
                        <cardMdNav />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
