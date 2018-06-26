<template>
    <Panel>
        <h2 slot="panel-title">{{dataSource.name}}</h2>
        <div slot="panel-additional" class="fr">
            <a href="javascript:;" class="z-btn z-btn-danger z-btn-md" @click="$emit('handleShowDelResourceModal', dataSource)">删除分类</a>
            <a href="javascript:;" class="z-btn z-btn-info z-btn-md" @click="$emit('handleShowResourceModal', dataSource)">编辑分类</a>
            <a href="javascript:;" class="z-btn z-btn-success z-btn-md" @click="$emit('handleShowResourceItemModal', dataSource)">新增子选项</a>
        </div>
        <table class="z-table">
            <tbody>
            <tr>
                <th class="hidden-xs">#</th>
                <th>图标/图片</th>
                <th>名称</th>
                <th>域名/网址</th>
                <th>描述</th>
                <th>操作</th>
            </tr>
            <tr v-for="resourceItem, index in dataSource.child" :key="index">
                <td align="center" width="50px" class="hidden-xs">{{index + 1}}</td>
                <td>{{ resourceItem.poster}}</td>
                <td>{{ resourceItem.name}}</td>
                <td align="center">{{ resourceItem.url }}</td>
                <td align="center">{{ resourceItem.dis }}</td>
                <td align="center" width="120px">
                    <template>
                        <a href="javascriipt:;" class="z-btn z-btn-danger" @click="$emit('handleShowDelResourceItemModal', dataSource, resourceItem, index)">删除</a>
                        <a href="javascriipt:;" class="z-btn z-btn-info" @click="$emit('handleShowResourceItemModal', dataSource, resourceItem, index)">编辑</a>
                    </template>
                </td>
            </tr>
            </tbody>
        </table>
    </Panel>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
