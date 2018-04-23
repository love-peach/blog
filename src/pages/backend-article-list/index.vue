<template>
    <div class="z-container backend-article-wrap">
        <div style="min-height: 563px;">
            <table>
                <tbody>
                <tr>
                    <th v-for="th, index in tableHeader" :key="index" :class="th.class">{{th.name}}</th>
                </tr>
                <tr v-for="topic, index in topics.list" :key="index">
                    <td v-for="th, thIndex in tableHeader" :key="thIndex" :width="th.width" :class="th.class" :align="th.align">
                        <template v-if="th.key === 'title' ">
                            <router-link :to=" '/wordpress/' + topic._id">{{topic[th.key]}}</router-link>
                        </template>
                        <template v-else-if="th.key === 'tagArr' ">
                            <Tag v-for="tag, tagIndex in topic[th.key]" :key="tagIndex" type="primary" radius="3px">{{tag}}</Tag>
                        </template>
                        <template v-else-if="th.key === 'poster' ">
                            <a class="img-wrap" href="javascript:;">
                                <img :src="topic[th.key]">
                            </a>
                        </template>
                        <template v-else-if="th.key === 'operation' ">
                            <switchBar title="是否上架" :value="topic.offState" activeColor="#83c44e" inactiveColor="#ffac13" @change="(value) => {handleToggleOffState(value, topic._id)}"></switchBar>
                            <a style="margin-left:5px;" href="javascript:;" class="z-btn z-btn-danger" @click="handleDelArticle(topic._id)">删除</a>
                            <router-link class="z-btn z-btn-info" :to="{ path: '/backend/article/write', query: { id:  topic._id}}">编辑</router-link>

                            <!--<router-link class="z-btn z-btn-success" :to=" '/wordpress/' + topic._id">查看</router-link>-->
                        </template>
                        <template v-else>
                            {{ topic[th.key] | dataFormat(th) }}
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="center" style="margin: 20px 0;">
            <Pagenation :all="topics.totalPage" :cur="page" :callback="changePage"/>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
