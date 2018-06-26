import api from '../../api';
import mutationTypes from '../mutation-types';

const state = () => ({
    list: []
});

const actions = {
    async getResourceList({ commit }, config) {
        const {data, code} = await api.backendGetResourceList({...config});
        if (data && code === 200) {
            commit(mutationTypes.RECEIVE_RESOURCE_LIST, {
                ...config,
                ...data
            });
        }
    },
    changeDataLocal({ commit, state }, data) {
        commit(mutationTypes.CHANGE_RESOURCE_LOCAL, data);
    },
    changeDataItemLocal({ commit, state }, data) {
        commit(mutationTypes.CHANGE_RESOURCE_ITEM_LOCAL, data);
    }
};

const mutations = {
    [mutationTypes.RECEIVE_RESOURCE_LIST](state, data) {
        state.list = data.list;
    },
    [mutationTypes.CHANGE_RESOURCE_LOCAL](state, data) {
        const stateList = state.list;
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
    },
    [mutationTypes.CHANGE_RESOURCE_ITEM_LOCAL](state, data) {
        const stateList = state.list;
        let resourceIndex = 0;
        for (let i = 0; i < stateList.length; i++) {
            if (stateList[i]._id === data._id) {
                resourceIndex = i;
                break;
            }
        }
        stateList[resourceIndex].child = data.child;
    }
};

const getters = {
    getResourceList: (state) => {
        return state.list;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
