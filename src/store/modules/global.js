import mutationTypes from '../mutation-types';

const state = () => ({
    loading: false,
    cookies: {},
    showSignInModal: false,
    showSignUpModal: false,
    historyPageScrollTop: {}
});

const actions = {
    toggleSignInModal({commit}, isShow) {
        commit(mutationTypes.SET_SIGN_IN_MODAL, isShow);
    },
    toggleSignUpModal({commit}, isShow) {
        commit(mutationTypes.SET_SIGN_UP_MODAL, isShow);
    },
    saveScrollTop({ commit }, { path, scrollTop }) {
        commit(mutationTypes.SAVE_SCROLL_TOP, { path, scrollTop });
    }
};

const mutations = {
    [mutationTypes.SET_SIGN_IN_MODAL](state, isShow) {
        state.showSignInModal = isShow;
    },
    [mutationTypes.SET_SIGN_UP_MODAL](state, isShow) {
        state.showSignUpModal = isShow;
    },
    [mutationTypes.SAVE_SCROLL_TOP](state, { path, scrollTop }) {
        state.historyPageScrollTop[path] = scrollTop;
    }
};

const getters = {
    getGlobal: (state) => {
        return state;
    },
    getPageScrollTop: (state) => (path) => {
        return state.historyPageScrollTop[path] || 0;
    }
};

export default {
    actions,
    state,
    mutations,
    getters
};
