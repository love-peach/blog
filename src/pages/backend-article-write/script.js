import mdEditor from '../../components/md-editor/index.vue';
import switchBar from '../../components/switch/index.vue';
import api from '../../api/index';
import Multiselect from 'vue-multiselect';
import Tag from '../../components/tag/index.vue';
import { mapGetters } from 'vuex';

export default {
    props: [],
    name: 'admin-write',
    components: {
        mdEditor,
        switchBar,
        Multiselect,
        Tag
    },
    data() {
        return {
            formData: {
                title: '',
                category: '',
                tag: [],
                poster: '',
                content: '',
                offState: true
            },
            articleId: ''
        };
    },
    computed: {
        ...mapGetters({
            categoryList: 'backend/category/getCategoryList',
            tagList: 'backend/tag/getTagList'
        }),
        categoryListName() {
            return this.categoryList.list.map(item => item.name);
        },
        tagListName() {
            return this.tagList.list.map(item => item.name);
        },
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
    mounted() {
        this.$store.dispatch('backend/category/getCategoryList', { page: 1, limit: 100 });
        this.$store.dispatch('backend/tag/getTagList', { page: 1, limit: 100 });
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
        },
        handleAddTag(newTag) {
            const tag = {
                name: newTag,
                rank: this.tagList.length
            };

            const vm = this;
            api.backendPostArticleTag(tag)
                .then(function () {
                    vm.$store.dispatch('backend/tag/changeDataLocal', {...tag, changeType: 'add'});
                    vm.formData.tag.push(tag.name);
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
