import Vue from 'vue';
import Router from 'vue-router';

import home from '../pages/home/index.vue';
import wordpress from '../pages/wordpress/index.vue';
import category from '../pages/category/index.vue';
import search from '../pages/search/index.vue';
import wordpressDetail from '../pages/wordpress-detail/index.vue';
import wordpressWrite from '../pages/backend-article-write/index.vue';
import resources from '../pages/resources/index.vue';
import board from '../pages/board/index.vue';
import backend from '../pages/backend/index.vue';
import backendArticleList from '../pages/backend-article-list/index.vue';
import backendUserList from '../pages/backend-user-list/index.vue';
import backendResources from '../pages/backend-resources/index.vue';
import backendOther from '../pages/backend-other/index.vue';

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
                name: 'resources',
                path: '/resources',
                component: resources
            },
            {
                name: 'board',
                path: '/board',
                component: board
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
            },
            {
                name: 'backendUserList',
                path: '/backend/user',
                component: backendUserList
            },
            {
                name: 'backendResources',
                path: '/backend/resources',
                component: backendResources
            },
            {
                name: 'backendOther',
                path: '/backend/other',
                component: backendOther
            }
        ]
    });
}
