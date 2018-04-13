import { mapGetters } from 'vuex';
import topicItem from '../../components/topic-item/index.vue';
import cardTag from '../../components/card-tag/index.vue';
export default {
    name: 'wordpress',
    title: '前端技术',
    asyncData({ store, cookies }, config = { page: 1 }) {
        config.cookies = cookies;
        return store.dispatch('frontend/wordpress/getArticleList', {...config});
    },
    components: {
        topicItem,
        cardTag
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
