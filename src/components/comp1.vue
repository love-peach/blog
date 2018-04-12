<template>
    <section @click="cliekMe">组件 {{msg}}</section>
</template>
<script>
    export default {
        title: '组件er',
        data() {
            return {
                msg: '123'
            };
        },
        methods: {
            cliekMe(e) {
                console.log(e);
            }
        }
    };
</script>
