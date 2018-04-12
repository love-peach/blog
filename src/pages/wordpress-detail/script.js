import { mapGetters } from 'vuex';
import cardTag from '../../components/card-tag/index.vue';
import cardMdNav from '../../components/card-md-nav/index.vue';

export default {
    props: [],
    name: 'wordpress-detail',
    title: '前端技术-详情',
    asyncData({ store, route }) {
        const { params: { id }, path } = route;
        return store.dispatch('frontend/wordpress/getArticleItem', { id, path });
    },
    components: {
        cardTag,
        cardMdNav
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        scrollHandler() {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            var jsCardMdNav = document.getElementById('jsCardMdNav');
            if (t >= 0) {
                jsCardMdNav.classList.add('fixed-side-card');
            } else {
                jsCardMdNav.classList.remove('fixed-side-card');
            }
        }
    },
    computed: {
        ...mapGetters({
            article: 'frontend/wordpress/getArticleItem',
            articleHtml: 'frontend/wordpress/getArticleItemMdHtml'
        })
    }
};
