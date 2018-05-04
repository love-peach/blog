import mdEditor from '../../components/md-editor/index.vue';
import switchBar from '../../components/switch/index.vue';
import api from '../../api/index';
export default {
    props: [],
    name: 'admin-write',
    components: {
        mdEditor,
        switchBar
    },
    data() {
        return {
            formData: {
                title: '',
                category: 'CSS',
                tag: '',
                poster: '',
                content: '',
                offState: true
            },
            articleId: ''
        };
    },
    computed: {
        isDisabled() {
            return this.formData.content === '';
        }
    },
    beforeMount() {
        const { params: { id }, path } = this.$route;
        if (id) {
            this.articleId = id;
            this.$store.dispatch('backend/wordpress/getArticleItem', { id, path }).then(() => {
                this.$nextTick(() => {
                    this.formData = Object.assign({}, this.formData, this.$store.getters['backend/wordpress/getArticleItem'].data);
                });
            });
        }
    },
    methods: {
        submit() {
            !this.isDisabled && this.postArticle();
        },
        postArticle() {
            const vm = this;
            const params = {
                ...this.formData,
                author: 'zhangjinpei'
            };
            api.backendPostArticle(params)
                .then(function (res) {
                    vm.$router.push({ path: `/detail/wordpress/${res.data._id}` });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    },
    watch: {
        'formData.title'(value) {
            console.log(value);
        }
    }
};
