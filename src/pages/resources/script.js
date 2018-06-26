import { mapGetters } from 'vuex';
import Panel from '../../components/panel/index.vue';

export default {
    name: 'resources',
    title: '前端资源',
    asyncData({ store }) {
        return store.dispatch('backend/resource/getResourceList', { page: 1, limit: 100 });
    },
    components: {
        Panel
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
