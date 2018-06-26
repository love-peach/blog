<template>
    <div class="backend-resources-wrap">
        <div class="z-container">
            <div class="page-header clearfix">
                <h2 class="page-title fl">前端资源配置</h2>
                <a href="javascript:;" class="z-btn z-btn-success z-btn-md fr" @click="handleShowResourceModal">新增分类</a>
            </div>

            <ResourcePart
                v-for="resource, index in resourceList"
                :key="resource._id"
                :dataSource="resource"
                :dataIndex="index"
                @handleShowResourceModal="handleShowResourceModal"
                @handleShowDelResourceModal="handleShowDelResourceModal"
                @handleShowResourceItemModal="handleShowResourceItemModal"
                @handleShowDelResourceItemModal="handleShowDelResourceItemModal"
            />
        </div>
        <Modal v-if="showResourceModal" @close="closeResourceModal">
            <h3 slot="header">{{ isAddResource ? '添加分类' : '修改分类' }}</h3>
            <div slot="body">
                <input v-model="formData.resource.name" type="text" placeholder="前端资源分类名称">
                <input v-model="formData.resource.rank" type="text" placeholder="排序(数字越小越靠前)">
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-info" @click="submitResource">{{ isAddResource ? '确认添加' : '确认修改' }}</a>
            </div>
        </Modal>

        <Modal v-if="showDelResourceModal" @close="closeDelResourceModal">
            <h3 slot="header">确认删除?</h3>
            <div slot="body">
                <p>确认删除名为 {{deleteResource.name}} 的资源分类吗? 此分类下有 {{ deleteResource.child.length }} 个子选项。</p>
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-danger" @click="handleDelResource">确认删除</a>
            </div>
        </Modal>

        <Modal v-if="showResourceItemModal" @close="closeResourceItemModal">
            <h3 slot="header">{{ resourceItemIndex.toString() ? '修改子选项' : '添加子选项' }}</h3>
            <div slot="body">
                <input v-model="formData.resourceItem.name" type="text" placeholder="名称">
                <input v-model="formData.resourceItem.url" type="text" placeholder="域名/网址">
                <input v-model="formData.resourceItem.rank" type="text" placeholder="排序(数字越小越靠前)">
                <input v-model="formData.resourceItem.dis" type="text" placeholder="描述">
                <input v-model="formData.resourceItem.poster" type="text" placeholder="图标/图片">
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-info" @click="submitResourceItem">{{ resourceItemIndex.toString() ? '确认修改' : '确认添加' }}</a>
            </div>
        </Modal>

        <Modal v-if="showDelResourceItemModal" @close="closeDelResourceItemModal">
            <h3 slot="header">确认删除?</h3>
            <div slot="body">
                <p>确认删除名为 {{formData.resourceItem.name}} 的子分类吗?</p>
            </div>
            <div slot="footer">
                <a href="javascript:;" class="z-btn z-btn-full z-btn-md z-btn-danger" @click="handleDelResourceItem">确认删除</a>
            </div>
        </Modal>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
