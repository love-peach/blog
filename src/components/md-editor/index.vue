<template>
    <div :class="['md-editor', editorMode]">
        <div class="editor-toolbar clearfix">
            <ul class="toolbar-mode fr">
                <li class="mode-item">
                    <a class="mode-item-link" href="javascript:;">全屏</a>
                </li>
                <li class="mode-item">
                    <a class="mode-item-link" href="javascript:;" title="写作模式" @click="setEditorMode('editMode')">写作</a>
                </li>
                <li class="mode-item">
                    <a class="mode-item-link" href="javascript:;" title="实时模式" @click="setEditorMode('liveMode')">实时</a>
                </li>
                <li class="mode-item">
                    <a class="mode-item-link" href="javascript:;" title="预览模式" @click="setEditorMode('previewMode')">预览</a>
                </li>
            </ul>
        </div>
        <div class="editor-write">
            <textarea v-model="mdText"></textarea>
        </div>
        <div class="editor-preview">
            <div class="markdown-body" v-html="mdHtml"></div>
        </div>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>

