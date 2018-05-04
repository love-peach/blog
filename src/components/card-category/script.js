import card from '../card/index.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'card-search',
    components: {
        card
    },
    data() {
        return {
            categoryList: [
                {
                    name: '全部文章',
                    path: '/wordpress'
                },
                {
                    name: 'HTML',
                    path: '/wordpress/html'
                },
                {
                    name: 'CSS',
                    path: '/wordpress/css'
                },
                {
                    name: 'JavaScript',
                    path: '/wordpress/JavaScript'
                },
                {
                    name: 'Vue',
                    path: '/wordpress/vue'
                },
                {
                    name: 'Tools',
                    path: '/wordpress/tools'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            topIndex: 'frontend/wordpress/getCardCategoryIndex'
        })
    },
    beforeMount() {
        this.checkPathname();
    },
    methods: {
        checkPathname() {
            const pathname = window.location.pathname;
            this.categoryList.forEach((item, index) => {
                if (item.path === pathname) {
                    this.$store.dispatch('frontend/wordpress/setCardCategoryIndex', { index });
                }
            });
        },
        changeTop(index) {
            this.$store.dispatch('frontend/wordpress/setCardCategoryIndex', { index });
        }
    }
};
