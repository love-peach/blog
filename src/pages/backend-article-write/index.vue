<template>
    <div class="z-container admin-write-wrap">
        <input v-model="formData.title" class="write-input title" type="text" placeholder="标题: 月光下的奔跑">
        <select v-model="formData.category" class="write-select" >
            <option value ="CSS" >CSS</option>
            <option value ="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="Vue">Vue</option>
            <option value="React">React</option>
        </select>
        <input v-model="formData.tag"  class="write-input tag" type="text" placeholder="标签,中间用逗号分隔">
        <input v-model="formData.poster"  class="write-input poster" type="text" placeholder="粘贴图片URL">
        <mdEditor v-model="formData.content"/>


        <a
            href="javascript:;"
            class="z-btn z-btn-md z-btn-success fr"
            :class="{'z-btn-disabled': isDisabled}"
            @click="submit"
        >
            确认发布
        </a>

        <div class="fr" style="margin-right: 40px;margin-top: 10px;">
            <switchBar v-model="formData.offState" title="是否公开"/>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
