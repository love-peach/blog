import { mapGetters } from 'vuex';
import cardTag from '../../components/card-tag/index.vue';
import cardMdNav from '../../components/card-md-nav/index.vue';
import Grade from '../../assets/js/grade';
import Tag from '../../components/tag/index.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

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
        cardMdNav,
        Tag
    },
    filters: {
        timeFromNow(value) {
            return dayjs(value).fromNow();
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
        const container = document.getElementById('gradeWrap');
        Grade(container, this.article.data.poster);
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        scrollHandler() {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            var jsCardMdNav = document.getElementById('jsCardMdNav');
            var jsGradeWrap = document.getElementById('gradeWrap');
            if (t >= jsGradeWrap.clientHeight) {
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
