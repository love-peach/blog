import api from '../../api';
import mutationTypes from '../mutation-types';
import marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value;
    }
});

const state = () => ({
    lists: {
        list: [],
        hasNext: 0,
        page: 1,
        path: '',
        total: 10,
        totalPage: 1
    },
    item: {
        data: {},
        path: '',
        isLoad: false
    }
});

const actions = {
    async getArticleList({commit}, config) {
        const {data, code} = await api.backendGetArticleList({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_ARTICLE_LIST, {
                ...config,
                ...data
            });
        }
    },
    async getArticleItem({ commit, state }, config) {
        if (state.item.path === config.path) {
            return;
        }
        const { data, code } = await api.backendGetArticleItem({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_ARTICLE_ITEM, {
                data,
                ...config
            });
        }
    }
};

const mutations = {
    [mutationTypes.RECEIVE_ARTICLE_LIST](state, {list, hasNext, hasPrev, page, path, total, totalPage}) {
        state.lists = {
            list,
            hasNext,
            hasPrev,
            page,
            path,
            total,
            totalPage
        };
    },
    [mutationTypes.RECEIVE_ARTICLE_ITEM](state, { data, path }) {
        state.item = {
            data,
            path,
            isLoad: true
        };
    }
};

const getters = {
    getArticleList: (state) => {
        return state.lists;
    },
    getArticleItem: (state) => {
        return state.item;
    },
    getArticleItemMdHtml: (state) => {
        const renderer = new marked.Renderer();
        let index = 0;
        renderer.heading = function (text, level) {
            return `<h${level} id="titleAnchor-${index++}">${text}</h${level}>`;
        };
        return marked(state.item.data.content || '', { renderer: renderer });
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
