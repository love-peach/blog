<template>
    <div id="app">
        <HeaderBar />
        <router-view></router-view>
    </div>
</template>
<script>
    import HeaderBar from './components/header-bar/index.vue';

    export default {
        name: 'app',
        components: {
            HeaderBar
        }
    };
</script>
