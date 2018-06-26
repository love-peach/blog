<template>
    <div class="z-container admin-write-wrap">
        <input v-model="formData.title" class="write-input title" type="text" placeholder="标题: 月光下的奔跑">
        <div class="z-row">
            <div class="z-col-lg-30">
                <multiselect
                    v-model="formData.category"
                    :options="categoryListName.slice(1)"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="请选择文章分类">
                </multiselect>
            </div>
            <div class="z-col-lg-30">
                <multiselect
                    v-model="formData.tag"
                    :options="tagListName"
                    :multiple="true"
                    :close-on-select="false"
                    :show-labels="false"
                    tag-placeholder="添加新标签"
                    :taggable="true"
                    @tag="handleAddTag"
                    placeholder="请填写文章标签">

                    <template slot="tag" slot-scope="props">
                        <Tag type="primary" size="sm" radius="3px" :closeAble="true" @close="props.remove(props.option)">
                            <span style="display: inline-block;margin-right: 3px">{{ props.option}}</span>
                        </Tag>
                    </template>
                </multiselect>
            </div>
        </div>


        <input v-model="formData.poster"  class="write-input poster" type="text" placeholder="粘贴图片URL">

        <mdEditor v-model="formData.content"/>

        <a
            href="javascript:;"
            class="z-btn z-btn-md z-btn-success fr"
            :class="{'z-btn-disabled': isDisabled}"
            @click="submit"
        >
            {{ articleId ? '确认修改' : '确认发布'}}
        </a>

        <div class="fr" style="margin-right: 40px;margin-top: 10px;">
            <switchBar v-model="formData.offState" title="是否公开"/>
        </div>
    </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
