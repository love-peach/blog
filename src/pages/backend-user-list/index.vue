<template>
    <div class="z-container backend-user-wrap">
        <Panel>
            <h3 slot="panel-title">用户管理</h3>
            <div style="min-height: 563px;">
                <table class="z-table">
                    <tbody>
                    <tr>
                        <th v-for="th, index in tableHeader" :key="index" :class="th.class">{{th.name}}</th>
                    </tr>
                    <tr v-for="user, index in users.list" :key="index">
                        <td v-for="th, thIndex in tableHeader" :key="thIndex" :width="th.width" :class="th.class" :align="th.align">
                            <template v-if="th.key === 'operation' ">
                                <a style="margin-left:5px;" href="javascript:;" class="z-btn z-btn-danger" @click="handleDelUser(user._id)">删除</a>
                                <a href="javascriipt:;" class="z-btn z-btn-info" >编辑</a>
                            </template>
                            <template>
                                {{ user[th.key] }}
                            </template>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="center" style="margin: 20px 0;">
                <Pagenation :all="users.totalPage" :cur="page" :callback="changePage"/>
            </div>
        </Panel>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
