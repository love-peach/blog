import Vue from 'vue';
import Router from 'vue-router';

const home = () => import('../pages/home/index.vue');
const wordpress = () => import('../pages/wordpress/index.vue');
const category = () => import('../pages/category/index.vue');
const search = () => import('../pages/search/index.vue');
const wordpressDetail = () => import('../pages/wordpress-detail/index.vue');
const wordpressWrite = () => import('../pages/backend-article-write/index.vue');

const backend = () => import('../pages/backend/index.vue');
const backendArticleList = () => import('../pages/backend-article-list/index.vue');

// const createListView = id => () => import('../pages/CreateListView').then(m => m.default(id));

Vue.use(Router);

const scrollBehavior = to => {
    const position = {};
    if (to.hash) {
        position.selector = to.hash;
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0;
        position.y = 0;
    }
    return position;
};

export function createRouter() {
    return new Router({
        mode: 'history',
        scrollBehavior,
        routes: [
            {
                name: 'home',
                path: '/',
                component: home
            },
            {
                name: 'wordpress',
                path: '/wordpress',
                component: wordpress
            },
            {
                name: 'category',
                path: '/wordpress/:category',
                component: category
            },
            {
                name: 'search',
                path: '/search/:keyword',
                component: search
            },
            {
                name: 'detail',
                path: '/detail/wordpress/:id',
                component: wordpressDetail,
                meta: { scrollToTop: true, notKeepAlive: true }
            },
            {
                name: 'write',
                path: '/backend/article/write',
                component: wordpressWrite
            },
            {
                name: 'edit',
                path: '/backend/article/write/:id',
                component: wordpressWrite
            },
            {
                name: 'backend',
                path: '/backend',
                component: backend
            },
            {
                name: 'backendArticleList',
                path: '/backend/article',
                component: backendArticleList
            }
        ]
    });
}
