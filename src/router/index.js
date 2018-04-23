import Vue from 'vue';
import Router from 'vue-router';

import home from '../pages/home/index.vue';
import wordpress from '../pages/wordpress/index.vue';
import wordpressDetail from '../pages/wordpress-detail/index.vue';
import wordpressWrite from '../pages/backend-article-write/index.vue';
import search from '../pages/search/index.vue';

import backend from '../pages/backend/index.vue';
import backendArticleList from '../pages/backend-article-list/index.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { name: 'home', path: '/', component: home },
            { name: 'wordpress', path: '/wordpress', component: wordpress },
            {
                name: 'article',
                path: '/wordpress/:id',
                component: wordpressDetail,
                meta: {
                    notKeepAlive: true
                }
            },
            { name: 'search', path: '/search/:key', component: search },
            { name: 'write', path: '/backend/article/write', component: wordpressWrite },
            { name: 'backend', path: '/backend', component: backend },
            { name: 'backendArticleList', path: '/backend/article', component: backendArticleList }
        ]
    });
}
