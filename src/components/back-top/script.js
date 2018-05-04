export default {
    name: 'backTop',
    data() {
        return {
            scrollTop: 0
        };
    },
    computed: {
        isShow() {
            return this.scrollTop > 1000;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler);
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    methods: {
        scrollHandler() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop;
        },
        backTop() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const vm = this;
            if (currentScroll > 0) {
                window.requestAnimationFrame(vm.backTop);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        }
    }
};
