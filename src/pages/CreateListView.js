import baseConponent from './wordpress/index.vue';

export default function createListView(type) {
    return {
        name: `${type}-stories-view`,

        asyncData({store}) {
            return store.dispatch('FETCH_LIST_DATA', {type});
        },

        render(h) {
            return h(baseConponent, {props: {type}});
        }
    };
}
