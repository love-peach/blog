import api from '../../api';
import mutationTypes from '../mutation-types';
import marked from 'marked';
import getMKTitles from '../../assets/js/getMKTitles';
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
    },
    highLightIndex: 0, // markdown 目录高亮索引
    cardCategoryIndex: 0, // 前端技术 分类高亮索引
    trending: []
});

const actions = {
    async getArticleList({ commit, state }, config) {
        if (state.lists.list.length > 0 && config.path === state.lists.path && config.page === 1) return;
        const {data, code} = await api.frontendGetArticleList({...config});
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
        const { data, code } = await api.frontendGetArticleItem({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_ARTICLE_ITEM, {
                data,
                ...config
            });
        }
    },
    toggleLikeStatus({ commit }, config) {
        commit(mutationTypes.SET_LIKE_STATUS, {
            ...config
        });
    },
    setHighlightIndex({ commit }, config) {
        commit(mutationTypes.SET_HIGHLIGHT_INDEX, {
            ...config
        });
    },
    setCardCategoryIndex({ commit }, config) {
        commit(mutationTypes.SET_CARD_CATEGORY_INDEX, {
            ...config
        });
    }
};

const mutations = {
    [mutationTypes.RECEIVE_ARTICLE_LIST](state, {list, hasNext, hasPrev, page, path, total, totalPage}) {
        if (page === 1) {
            list = [].concat(list);
        } else {
            list = state.lists.list.concat(list);
        }
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
    },
    [mutationTypes.SET_LIKE_STATUS](state, { id, status }) {
        if (state.item.data._id === id) {
            if (status) state.item.data.likeCount++;
            else state.item.data.likeCount--;
            state.item.data.likeStatus = status;
        }
        const obj = state.lists.list.find(item => item._id === id);
        if (obj) {
            if (status) obj.likeCount++;
            else obj.likeCount--;
            obj.likeStatus = status;
        }
    },
    [mutationTypes.SET_HIGHLIGHT_INDEX](state, { index }) {
        state.highLightIndex = index;
    },
    [mutationTypes.SET_CARD_CATEGORY_INDEX](state, { index }) {
        state.cardCategoryIndex = index;
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
    },
    getArticleItemTitles: (state) => {
        return getMKTitles(state.item.data.content || '');
    },
    getHighLightIndex: (state) => {
        return state.highLightIndex;
    },
    getCardCategoryIndex: (state) => {
        return state.cardCategoryIndex;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
