import CommentForm from '../../components/comment-form/index.vue';
export default {
    name: 'comment-list',
    components: {
        CommentForm
    },
    props: {
        commentsList: {
            type: Array,
            default() {
                return [];
            }
        },
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShowCommentForm: false,
            scopesDefault: [],
            scopes: []
        };
    },
    computed: {
        replyBtnText() {
            let replayBtnText = '回复';
            if (!this.isLogin) {
                replayBtnText = '登录以回复';
            } else if (this.isShowCommentForm) {
                replayBtnText = '取消回复';
            }
            return replayBtnText;
        }
    },
    mounted() {
    },
    destroyed() {
    },
    created() {
        this.scope();
    },
    methods: {
        showLoginModal() {
            this.$store.dispatch('globalStore/toggleSignInModal', true);
        },
        changeStatus(index) {
            if (this.scopesDefault[index] === true) {
                this.$set(this.scopesDefault, index, false);
            } else {
                this.scope();
                this.$set(this.scopesDefault, index, this.scopes[index]);
            }
        },
        scope() {
            this.commentsList.forEach((item, index) => {
                this.scopesDefault[index] = false;
                if ('reply' in item) {
                    this.scopes[index] = true;
                } else {
                    this.scopes[index] = false;
                }
            });
        }
    }
};
