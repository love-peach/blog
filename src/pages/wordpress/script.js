import { mapGetters } from 'vuex';
import topicItem from '../../components/topic-item/index.vue';
import cardTag from '../../components/card-tag/index.vue';
import cardSearch from '../../components/card-search/index.vue';
import Pagenation from '../../components/pagenation/index.vue';

export default {
    name: 'wordpress',
    title: '前端技术',
    asyncData({ store, cookies, route }, config = { page: 1 }) {
        config.cookies = cookies;
        console.log(cookies, 'cookies111222');
        const { params: { key }, path } = route;
        return store.dispatch('frontend/wordpress/getArticleList', {...config, key, path});
    },
    components: {
        topicItem,
        cardTag,
        cardSearch,
        Pagenation
    },
    data() {
        return {
            page: 1
        };
    },
    methods: {
        loadMore() {
            const page = this.topics.page + 1;
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page });
        },
        changePage(page) {
            this.page = page;
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page });
        }
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/wordpress/getArticleList'
        })
    }
};
