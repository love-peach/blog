import Vue from 'vue';
import Router from 'vue-router';

import comp1 from '../components/comp1.vue';
import comp2 from '../components/comp2.vue';
import wordpress from '../pages/wordpress/index.vue';
import wordpressDetail from '../pages/wordpress-detail/index.vue';
import wordpressWrite from '../pages/backend-article-write/index.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: comp1 },
            { path: '/wordpress', component: wordpress },
            { path: '/wordpress/:id', component: wordpressDetail },
            { path: '/item/:id', component: comp2 },
            { path: '/backend/article/write', component: wordpressWrite }
        ]
    });
}
