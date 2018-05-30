import api from '../../api';
import mutationTypes from '../mutation-types';

const state = () => ({
    lists: {
        hasNext: false,
        hasPrev: false,
        path: '',
        page: 1,
        data: []
    },
    item: {
        data: {},
        path: ''
    }
});

const actions = {
    async getUserList({commit}, config) {
        const {data, code} = await api.backendGetUserList({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_USER_LIST, {
                ...config,
                ...data
            });
        }
    }
};

const mutations = {
    [mutationTypes.RECEIVE_USER_LIST](state, {list, hasNext, hasPrev, page, path, total, totalPage}) {
        state.lists = {
            list,
            hasNext,
            hasPrev,
            page,
            path,
            total,
            totalPage
        };
    }
};

const getters = {
    getUserList: (state) => {
        return state.lists;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
