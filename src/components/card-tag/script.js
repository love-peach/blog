import card from '../card/index.vue';
import { mapGetters } from 'vuex';

export default {
    props: [],
    name: 'card-tag',
    components: {
        card
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            tagList: 'backend/tag/getTagList'
        })
    },
    beforeMount() {
        this.$store.dispatch('backend/tag/getTagList', { page: 1, limit: 100 });
    },
    methods: {}
};
