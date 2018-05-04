<template>
    <div class="toast">
        <transition :name="mergedOption.transition">
            <div
                class="toast-wrapper"
                :id="mergedOption.id"
                :class="clazz"
                :transition="mergedOption.transition"
                v-show="showing"
            >
                <i class="iconfont" :class="[option.icon ? option.icon : '']"></i>
                <span class="toast-content" v-html="mergedOption.message"></span>
                <a class="toast-close" v-if="mergedOption.closeable" @click="close()">&times;</a>
            </div>
        </transition>
    </div>
</template>
<style lang="less" scoped src="./style.less"></style>
<script>
    const DEFAULT_OPT = {
        id: 'my-toast',
        className: '',
        horizontalPosition: 'center',
        verticalPosition: 'top',
        parent: 'body',
        transition: 'slide-down',
        duration: 3000,
        size: 'sm',
        type: 'info',
        icon: '',
        message: '',
        closeable: false
    };
    export default {
        DEFAULT_OPT: DEFAULT_OPT,
        data() {
            return {
                queue: [],
                option: {},
                showing: false
            };
        },
        computed: {
            mergedOption: function () {
                return Object.assign({}, DEFAULT_OPT, this.option);
            },
            clazz: function () {
                let clazz = [];
                let className = this.option.className;
                let toastType = this.mergedOption.type;
                let toastSize = this.mergedOption.size;
                let horizontalPosition = this.mergedOption.horizontalPosition;
                let verticalPosition = this.mergedOption.verticalPosition;
                let closeable = this.mergedOption.closeable;
                if (className) {
                    if (typeof className === 'string') {
                        clazz.push(className);
                    }
                    if (Array.isArray(className)) {
                        clazz = clazz.concat(className);
                    }
                }
                if (toastType) {
                    clazz.push(`toast-${toastType}`);
                }
                if (toastSize) {
                    clazz.push(`toast-${toastSize}`);
                }
                if (horizontalPosition) {
                    clazz.push(`toast-${horizontalPosition}`);
                }
                if (closeable) {
                    clazz.push('toast-closeable');
                }
                if (verticalPosition) {
                    clazz.push(`toast-${verticalPosition}`);
                }
                return clazz.join(' ');
            }
        },
        methods: {
            close: function () {
                this.showing = false;
                this.queue.shift();
            }
        },
        watch: {
            queue: function () {
                let pending = this.queue.length;
                if (pending === 0) {
                    return;
                }
                this.showing = true;
                this.option = this.queue[0];
                if ((!this.option.mode || this.option.mode === 'override') && pending > 1) {
                    clearTimeout(this.timeoutId);
                    this.showing = false;
                    this.timeoutId = null;
                    this.timeoutId = setTimeout(() => this.queue.shift());
                } else {
                    this.timeoutId = setTimeout(() => {
                        this.showing = false;
                        this.timeoutId = null;
                        setTimeout(() => this.queue.shift());
                    }, this.mergedOption.duration);
                }
            }
        }
    };
</script>
