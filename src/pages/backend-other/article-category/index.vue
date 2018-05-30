<template>
    <div class="article-category-wrap">
        <Panel>
            <h2 slot="panel-title">文章分类设置</h2>
            <a slot="panel-additional" href="javascript:;" class="z-btn z-btn-info z-btn-md fr" @click="handleShowArticleCategoryModal">新增分类</a>
            <table class="z-table">
                <tbody>
                <tr>
                    <th class="hidden-xs">#</th>
                    <th>名称</th>
                    <th>属性值</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="category, index in categoryList.list" :key="category._id">
                    <td align="center" width="50px" class="hidden-xs">{{index + 1}}</td>
                    <td>{{ category.name}}</td>
                    <td>{{ category.value}}</td>
                    <td align="center">{{ category.createAt | timeFormat}}</td>
                    <td align="center">{{ category.updateAt | timeFormat}}</td>
                    <td align="center" width="120px">
                        <template>
                            <a href="javascriipt:;" class="z-btn z-btn-danger" @click="handleShowDeleteModal(category)">删除</a>
                            <a href="javascriipt:;" class="z-btn z-btn-info" @click="handleShowArticleCategoryModal(category)">编辑</a>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </Panel>

        <Modal v-if="showArticleCategoryModal" @close="closeArticleCategoryModal">
            <h3 slot="header">{{ formData.articleCategory.name ? '修改分类' : '添加分类' }}</h3>
            <div slot="body">
                <input v-model="formData.articleCategory.name" type="text" placeholder="分类显示名称">
                <input v-model="formData.articleCategory.value" type="text" placeholder="分类值">
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-info" @click="submitArticleCategory">{{ formData.articleCategory.name ? '确认修改' : '确认添加' }}</a>
            </div>
        </Modal>

        <Modal v-if="showDeleteCategoryModal" @close="closeDeleteCategoryModal">
            <h3 slot="header">确认删除?</h3>
            <div slot="body">
                <p>确认删除名为 {{deleteCategory.name}} 的分类吗?</p>
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-danger" @click="handleDelCategory">确认删除</a>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
