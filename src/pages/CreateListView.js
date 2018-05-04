import baseConponent from './wordpress/index.vue';

export default function createListView(type) {
    return {
        name: `${type}`,

        asyncData({ store, cookies, route }, config = { page: 1 }) {
            config.cookies = cookies;
            const { params: { keyword, category }, path } = route;
            return store.dispatch('frontend/wordpress/getArticleList', {...config, keyword, category, path});
        },

        render(h) {
            return h(baseConponent, {props: {type}});
        }
    };
}
