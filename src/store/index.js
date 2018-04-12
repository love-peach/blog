import Vue from 'vue';
import Vuex from 'vuex';
// import {fetchItem} from '../api';
import frontendWordpress from './modules/frontend-wordpress';
import backendWrite from './modules/backend-write';

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
                    write: backendWrite
                }
            }
        }
    });
}
