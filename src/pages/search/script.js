import { mapGetters } from 'vuex';
import topicItem from '../../components/topic-item/index.vue';
import cardTag from '../../components/card-tag/index.vue';
import cardSearch from '../../components/card-search/index.vue';
export default {
    name: 'search',
    title: '搜索',
    asyncData({ store, cookies, route }, config = { page: 1 }) {
        config.cookies = cookies;
        const { params: { key }, path } = route;
        return store.dispatch('frontend/wordpress/getArticleList', {...config, key, path});
    },
    components: {
        topicItem,
        cardTag,
        cardSearch
    },
    data() {
        return {};
    },
    methods: {
        loadMore() {
            const page = this.topics.page + 1;
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page });
        }
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/wordpress/getArticleList'
        })
    }
};
