<template>
    <transition name="modal">
        <div class="modal-mask" @click="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container" @click.stop="">

                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>

                    <a class="mode-close" href="javascript:;" @click="$emit('close')">
                        <i class="iconfont icon-Close"></i>
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="less" src="./style.less"></style>
<script src="./script.js"></script>

