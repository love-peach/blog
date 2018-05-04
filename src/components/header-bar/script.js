import api from '../../api/index';
import cookies from 'js-cookie';

export default {
    name: 'header-bar',
    data() {
        return {
            userId: cookies.get('userId'),
            userAccount: cookies.get('userAccount'),
            bodyScrollTop: 0,
            navList: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '前端技术',
                    path: '/wordpress'
                },
                {
                    name: '图文有感',
                    path: '/thoughts'
                },
                {
                    name: '前端资源',
                    path: '/resources'
                },
                {
                    name: '留言',
                    path: '/board'
                }
            ]
        };
    },
    mounted() {
        window.addEventListener('scroll', this.changeHeaderBarStyle);
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
        logout() {
            api.frontendSignOut()
                .then(() => {
                    this.$toast('成功登出', {
                        icon: 'icon-info',
                        size: 'sm'
                    });
                    setTimeout(() => {
                        this.$router.go(0);
                    }, 500);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        login() {
            if (this.userAccount) {
                return;
            }
            this.$store.dispatch('globalStore/toggleSignInModal', true);
        },
        scrollHandler() {
            const bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.bodyScrollTop = bodyScrollTop;
        },
        changeHeaderBarStyle() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const headerBar = document.getElementById('jsHeaderBar');
            const headerStyleStr = 'header-bar-black';
            if (scrollTop > 80) {
                headerBar.classList.remove(headerStyleStr);
            } else {
                headerBar.classList.add(headerStyleStr);
            }
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
