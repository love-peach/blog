import { mapGetters } from 'vuex';

let vm = null;
export default {
    name: 'md-anchor-nav',
    props: {
        list: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
        offsetTopList: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        }
    },
    data() {
        vm = this;
        return {
            idPrefix: 'titleAnchor-'
        };
    },
    filters: {
        anchor: function (value) {
            return `#${vm.idPrefix}${value}`;
        }
    },
    computed: {
        ...mapGetters({
            highLightIndex: 'frontend/wordpress/getHighLightIndex'
        })
    },
    methods: {
        scrollToEle(eleIndex) {
            const targetOffsetTop = this.offsetTopList[eleIndex];
            // window.scrollTo(0, targetOffsetTop - 100);
            this.scrollMove(targetOffsetTop - 100, 200);
        },
        scrollMove(scrollTo, time) {
            var scrollFrom = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var count = 0;
            var every = 10;
            scrollTo = parseInt(scrollTo);
            time /= every;

            var interval = setInterval(function () {
                count++;
                document.documentElement.scrollTop = document.body.scrollTop = (scrollTo - scrollFrom) / time * count + scrollFrom;
                if (count >= time) {
                    clearInterval(interval);
                }
            }, every);
        }
    }
};
