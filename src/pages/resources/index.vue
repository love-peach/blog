<template>
    <div class="resources-wrap z-container">
        <Panel v-for="resource in resourceList" :key="resource._id">
            <h2 slot="panel-title">{{resource.name}}</h2>
            <div class="z-row">
                <div v-for="resourceItem in resource.child" :key="resourceItem._id" class="z-col-lg-12">
                    <a class="resource-item-wrap" :href="resourceItem.url" target="_blank">
                        <h4 class="resource-header">
                            <img src="" alt="" class="header-img">
                            {{ resourceItem.name}}
                        </h4>
                        <p class="resource-dis">{{ resourceItem.dis}}</p>

                    </a>
                </div>
            </div>
        </Panel>
    </div>
</template>

<style lang="less" scoped src="./style.less"></style>
<script src="./script.js"></script>
