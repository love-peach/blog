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

// getters
const getters = {
    demo: state => state.demo
};

// actions
const actions = {
    
};

// mutations
const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};
