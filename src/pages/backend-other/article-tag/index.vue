<template>
    <div class="article-tag-wrap">
        <Panel>
            <h2 slot="panel-title">文章标签设置</h2>
            <a slot="panel-additional" href="javascript:;" class="z-btn z-btn-info z-btn-md fr" @click="handleShowArticleTagModal">新增标签</a>
            <table class="z-table">
                <tbody>
                <tr>
                    <th class="hidden-xs">#</th>
                    <th>名称</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="tag, index in tagList.list" :key="tag._id">
                    <td align="center" width="50px" class="hidden-xs">{{index + 1}}</td>
                    <td>{{ tag.name }}</td>
                    <td align="center">{{ tag.createAt | timeFormat}}</td>
                    <td align="center">{{ tag.updateAt | timeFormat}}</td>
                    <td align="center" width="120px">
                        <template>
                            <a href="javascriipt:;" class="z-btn z-btn-danger" @click="handleShowDeleteModal(tag)">删除</a>
                            <a href="javascriipt:;" class="z-btn z-btn-info" @click="handleShowArticleTagModal(tag)">编辑</a>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </Panel>

        <Modal v-if="showArticleTagModal" @close="closeArticleTagModal">
            <h3 slot="header">{{ formData.articleTag.name ? '修改标签' : '添加标签' }}</h3>
            <div slot="body">
                <input v-model="formData.articleTag.name" type="text" placeholder="标签名称">
                <input v-model="formData.articleTag.rank" type="text" placeholder="排序">
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-info" @click="submitArticleTag">{{ formData.articleTag.name ? '确认修改' : '确认添加' }}</a>
            </div>
        </Modal>

        <Modal v-if="showDeleteTagModal" @close="closeDeleteTagModal">
            <h3 slot="header">确认删除?</h3>
            <div slot="body">
                <p>确认删除名为 {{deleteTag.name}} 的分类吗?</p>
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-danger" @click="handleDelTag">确认删除</a>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
