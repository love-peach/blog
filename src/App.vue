<template>
    <div id="app">
        <HeaderBar  />
        <div class="app-content">
            <keep-alive>
                <router-view :key="$route.fullPath" v-if="!$route.meta.notKeepAlive" class="app-view"></router-view>
            </keep-alive>
            <router-view v-if="$route.meta.notKeepAlive" ></router-view>
        </div>
        <FooterBar />
    </div>
</template>
<script>
    import HeaderBar from './components/header-bar/index.vue';
    import FooterBar from './components/footer-bar/index.vue';

    export default {
        name: 'app',
        components: {
            HeaderBar,
            FooterBar
        },
        computed: {
            backend() {
                return this.$route.path.indexOf('backend') >= 0;
            }
        }
    };
</script>
<style scoped lang="less">
    @import "./assets/less/mixins/variable.less";
    .app-content {
        min-height: 80vh;
        margin-top: 80px;
        margin-bottom: 40px;
    }
</style>
