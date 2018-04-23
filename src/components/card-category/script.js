import card from '../card/index.vue';

export default {
    name: 'card-search',
    components: {
        card
    },
    data() {
        return {
            topIndex: 0,
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
    beforeMount() {
        this.checkPathname();
    },
    methods: {
        checkPathname() {
            const pathname = window.location.pathname;
            this.categoryList.forEach((item, index) => {
                if (item.path === pathname) {
                    this.topIndex = index;
                    return index;
                }
            });
        },
        changeTop(index) {
            this.topIndex = index;
        }
    }
};
