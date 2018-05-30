import Vue from 'vue';
import Vuex from 'vuex';
import frontendWordpress from './modules/frontend-wordpress';
import backendWordpress from './modules/backend-wordpress';
import backendWrite from './modules/backend-write';
import backendUser from './modules/backend-user';
import category from './modules/category';
import global from './modules/global';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules: {
            frontend: {
                namespaced: true,
                modules: {
                    wordpress: frontendWordpress
                }
            },
            backend: {
                namespaced: true,
                modules: {
                    user: backendUser,
                    wordpress: backendWordpress,
                    write: backendWrite,
                    category: category
                }
            },
            globalStore: {
                namespaced: true,
                ...global
            }
        }
    });
}
