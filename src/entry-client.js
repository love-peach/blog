import Vue from 'vue';
import { createApp } from './app';
import 'es6-promise/auto';
import '~assets/less/common.less';
import '~assets/css/github-markdown.css';
// import '~assets/css/hljs/monokai-sublime.css';
import '~assets/css/hljs/solarized_light.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import ProgressBar from './components/progress-bar/index.vue';
import Toast from './components/toast/index';
Vue.use(Toast);
dayjs.locale('zh-cn');

const loading = (Vue.prototype.$loading = new Vue(ProgressBar).$mount());
document.body.appendChild(loading.$el);

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        } else {
            next();
        }
    },
    // 路由切换时，保存页面滚动位置
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.$nextTick().then(() => {
                const scrollTop = vm.$store.getters['globalStore/getPageScrollTop'](to.fullPath);
                window.scrollTo(0, scrollTop);
            });
        });
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('globalStore/saveScrollTop', {
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        });
        next();
    }
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    // 我们只关心之前没有渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
        return diffed || (diffed = (prevMatched[i] !== c));
    });
    if (!activated.length) {
        return next();
    }
    loading.start();
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
        if (c.asyncData) {
            return c.asyncData({ store, route: to });
        }
    })).then(() => {
        // 停止加载指示器(loading indicator)
        loading.finish();
        next();
    }).catch(next);
});

router.onReady(() => app.$mount('#app'));
