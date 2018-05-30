import api from '../../api';
import mutationTypes from '../mutation-types';

const state = () => ({
    lists: {
        list: [],
        hasNext: 0,
        page: 1,
        path: '',
        total: 10,
        totalPage: 1
    }
});

const actions = {
    async getCategoryList({ commit, state }, config) {
        if (state.lists.list.length > 0 && config.path === state.lists.path && config.page === 1) return;
        const {data, code} = await api.backendGetCategoryList({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_CATEGORY_LIST, {
                ...config,
                ...data
            });
        }
    },
    changeDataLocal({ commit, state }, data) {
        commit(mutationTypes.CHANGE_CATEGORY_LOCAL, data);
    }
};

const mutations = {
    [mutationTypes.RECEIVE_CATEGORY_LIST](state, {list, hasNext, hasPrev, page, path, total, totalPage}) {
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
    [mutationTypes.CHANGE_CATEGORY_LOCAL](state, data) {
        const stateList = state.lists.list;
        switch (data.changeType) {
            case 'add':
                stateList.unshift(data);
                break;
            case 'edit':
                let editIndex = 0;
                for (let i = 0; i < stateList.length; i++) {
                    if (stateList[i]._id === data._id) {
                        editIndex = i;
                        break;
                    }
                }
                stateList.splice(editIndex, 1, data);
                break;
            case 'del':
                let delIndex = 0;
                for (let i = 0; i < stateList.length; i++) {
                    if (stateList[i]._id === data._id) {
                        delIndex = i;
                        break;
                    }
                }
                stateList.splice(delIndex, 1);
                break;
            default:
                break;
        }
    }
};

const getters = {
    getCategoryList: (state) => {
        return state.lists;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
