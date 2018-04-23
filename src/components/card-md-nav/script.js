import card from '../card/index.vue';
import mdAnchorNav from '../md-anchor-nav/index.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'card-md-nav',
    components: {
        card,
        mdAnchorNav
    },
    data() {
        return {};
    },
    mounted() {
        const vm = this;
        this.throttleScroll = vm.throttle(function () {
            vm.scrollHandler();
        }, 200);
        window.addEventListener('scroll', this.throttleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.throttleScroll);
    },
    methods: {
        scrollHandler() {
            const mdAnchorFloatBar = document.getElementById('mdAnchorFloatBar');
            const distance = -20;
            const headerList = this.getHeaderList();
            // 对所有的y值为正标的题，按y值升序排序。第一个标题就是当前处于阅读中的段落的标题。也即要高亮的标题
            let readingVO = headerList.filter(function (item) {
                return item.y > distance;
            }).sort(function (a, b) {
                return a.y - b.y;
            })[0];
            // TODO 如果已经到最底部了 继续下滑 readingVO 会取到 undefined , 报错 所以 这里需要判断下
            if (!readingVO) {
                return;
            }
            var floatBarHeight = headerList.slice(0, readingVO.index).reduce(function (preValue, curValue) {
                if (typeof preValue === 'number') {
                    return preValue + curValue.navTitleClientHeight;
                } else {
                    return preValue.navTitleClientHeight + curValue.navTitleClientHeight;
                }
            }, 0);
            this.$store.dispatch('frontend/wordpress/setHighlightIndex', {index: readingVO.index});
            mdAnchorFloatBar.style.top = `${floatBarHeight}px`;
            mdAnchorFloatBar.style.height = `${readingVO.navTitleClientHeight}px`;
        },
        getHeaderList() {
            const idPrefix = 'titleAnchor-';
            let list = [];
            for (var i = 0; i < this.articleTitles.length; i++) {
                let contentTitle = document.getElementById(`${idPrefix}${i}`);
                let navTitle = document.querySelector(`a[href="#${idPrefix}${i}"]`);
                if (!navTitle) {
                    continue;
                }
                list.push({
                    y: contentTitle.getBoundingClientRect().top,
                    navTitleOffsetTop: navTitle.offsetTop,
                    navTitleClientHeight: navTitle.clientHeight,
                    index: i,
                    navTitle
                });
            }
            return list;
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
    computed: {
        ...mapGetters({
            articleTitles: 'frontend/wordpress/getArticleItemTitles'
        })
    }
};
