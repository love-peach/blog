import card from '../card/index.vue';

export default {
    name: 'card-search',
    components: {
        card
    },
    data() {
        return {
            searchWord: ''
        };
    },
    methods: {
        search() {
            if (this.searchWord === '') {
                return false;
            }
            this.$router.replace(`/search/${this.searchWord}`);
        },
        throttle(fn, delay) {
            var timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn();
                }, delay);
            };
        }
    },
    computed: {}
};
