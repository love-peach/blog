export default {
    name: 'header-bar',
    data() {
        return {
            searchWord: '',
            bodyScrollTop: 0
        };
    },
    mounted() {
        /* const vm = this;
         this.throttleScroll = vm.throttle(function () {
         vm.scrollHandler();
         }, 200);
         window.addEventListener('scroll', this.throttleScroll); */
    },
    destroyed() {
        window.removeEventListener('scroll', this.throttleScroll);
    },
    watch: {
        bodyScrollTop(newValue, oldValue) {
            this.toggleHeaderBarStyle(newValue, newValue - oldValue);
        }
    },
    methods: {
        search() {
            if (this.searchWord === '') {
                return false;
            }
            this.$router.replace(`/search?qs=${this.searchWord}`);
        },
        scrollHandler() {
            const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.bodyScrollTop = bodyScrollTop;
        },
        toggleHeaderBarStyle(scrollTop, distance) {
            const headerBar = document.getElementById('jsHeaderBar');
            const headerStyleStr = 'header-bar-hidden';
            if (scrollTop > 300) {
                headerBar.classList.add(headerStyleStr);
                if (distance < 0) {
                    headerBar.classList.remove(headerStyleStr);
                } else {
                    headerBar.classList.add(headerStyleStr);
                }
            } else {
                headerBar.classList.remove(headerStyleStr);
            }
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
    }
};
