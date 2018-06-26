import { mapGetters } from 'vuex';
import CommentForm from '../../components/comment-form/index.vue';
import Comments from '../../components/comments/index.vue';
import Panel from '../../components/panel/index.vue';

export default {
    name: 'board',
    title: '留言板',
    asyncData({ store }) {
        return store.dispatch('backend/resource/getResourceList', { page: 1, limit: 100 });
    },
    components: {
        Panel,
        Comments,
        CommentForm
    },
    data() {
        return {
            page: 1
        };
    },
    methods: {},
    computed: {
        ...mapGetters({
            resourceList: 'backend/resource/getResourceList'
        })
    }
};
