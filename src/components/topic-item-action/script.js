import Clipboard from 'clipboard';
import cookies from 'js-cookie';
import api from '../../api/index';
let clipboard = null;
export default {
    props: {
        topic: {
            type: Object,
            required: true
        }
    },
    name: 'topic-item-action',
    data() {
        return {
            userId: cookies.get('userId')
        };
    },
    mounted() {
        const vm = this;
        this.$nextTick(() => {
            const ele = document.getElementById(this.topic._id);
            if (ele) {
                clipboard = new Clipboard(ele, {
                    text: function (trigger) {
                        return `${window.location.origin}/detail/wordpress/${trigger.getAttribute('id')}`;
                    }
                });
                clipboard.on('success', function (e) {
                    console.log(e);
                    vm.$toast('复制成功!', {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1000
                    });
                });
            }
        });
    },
    destroyed() {
        clipboard.destroy();
    },
    methods: {
        like() {
            const userAccount = cookies.get('userAccount');
            if (!userAccount) {
                this.$toast('请先登录', {
                    icon: 'icon-info',
                    size: 'sm'
                });
                this.$store.dispatch('globalStore/toggleSignInModal', true);
                return;
            }
            const vm = this;
            const articleId = this.topic._id;
            const apiInterface = this.topic.likeStatus ? 'frontendUnlike' : 'frontendLike';
            api[apiInterface]({ articleId })
                .then(() => {
                    vm.$store.dispatch('frontend/wordpress/toggleLikeStatus', {
                        id: vm.topic._id,
                        status: !vm.topic.likeStatus
                    });
                    vm.$toast('操作成功', {
                        duration: 1000,
                        icon: 'icon-success',
                        size: 'sm'
                    });
                })
                .catch(err => {
                    console.log(err, 'err');
                });
        },
        download() {
            api.frontendDownloadArticleItem({id: this.topic._id})
                .then(result => {
                    console.log(result, 'result');
                })
                .catch(err => {
                    console.log(err, 'err');
                });
        }
    }
};
