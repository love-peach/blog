import Vue from 'vue';
import Vuex from 'vuex';
import frontendWordpress from './modules/frontend-wordpress';
import backendWordpress from './modules/backend-wordpress';
import backendWrite from './modules/backend-write';
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
                    wordpress: backendWordpress,
                    write: backendWrite
                }
            },
            globalStore: {
                namespaced: true,
                ...global
            }
        }
    });
}
