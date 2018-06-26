import card from '../card/index.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'card-search',
    components: {
        card
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            topIndex: 'frontend/wordpress/getCardCategoryIndex',
            categoryList: 'backend/category/getCategoryList'
        })
    },
    beforeMount() {
        this.checkPathname();
        this.$store.dispatch('backend/category/getCategoryList', { page: 1, limit: 100 });
    },
    methods: {
        checkPathname() {
            const pathname = window.location.pathname;
            this.categoryList.list.forEach((item, index) => {
                if (`/wordpress/${item.value}` === pathname) {
                    this.$store.dispatch('frontend/wordpress/setCardCategoryIndex', { index });
                }
            });
        },
        changeTop(index) {
            this.$store.dispatch('frontend/wordpress/setCardCategoryIndex', { index });
        }
    }
};
