import Modal from '../../../components/modal/index.vue';
import Panel from '../../../components/panel/index.vue';
import api from '../../../api/index';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
    name: 'article-category',
    components: {
        Modal,
        Panel
    },
    mounted() {
        this.$store.dispatch('backend/category/getCategoryList', { page: 1, limit: 100 });
    },
    data() {
        return {
            showArticleCategoryModal: false,
            showDeleteCategoryModal: false,
            deleteCategory: null,
            formData: {
                articleCategory: {
                    name: '',
                    value: '',
                    id: ''
                }
            }
        };
    },
    computed: {
        ...mapGetters({
            categoryList: 'backend/category/getCategoryList'
        })
    },
    filters: {
        timeFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    methods: {
        handleShowArticleCategoryModal(category) {
            this.showArticleCategoryModal = true;
            if (category._id) {
                this.formData.articleCategory.name = category.name;
                this.formData.articleCategory.value = category.value;
                this.formData.articleCategory.id = category._id;
            } else {
                this.formData.articleCategory.name = '';
                this.formData.articleCategory.value = '';
                this.formData.articleCategory.id = '';
            }
        },
        closeArticleCategoryModal() {
            this.showArticleCategoryModal = false;
        },
        handleShowDeleteModal(category) {
            this.showDeleteCategoryModal = true;
            this.deleteCategory = category;
        },
        closeDeleteCategoryModal() {
            this.showDeleteCategoryModal = false;
            this.deleteCategory = null;
        },
        submitArticleCategory() {
            const vm = this;
            const { articleCategory } = this.formData;
            const toastText = articleCategory.id ? '修改成功' : '添加成功';
            api.backendPostArticleCategory(articleCategory)
                .then(function (res) {
                    vm.$toast(toastText, {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1500
                    });
                    vm.$store.dispatch('backend/category/changeDataLocal', {...res.data, changeType: articleCategory.id ? 'edit' : 'add'});
                    vm.closeArticleCategoryModal();
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 删除功能
        handleDelCategory() {
            const vm = this;
            api.backendDelCategory({id: vm.deleteCategory._id})
                .then(function (res) {
                    if (res.data.ok === 1) {
                        vm.$toast('删除成功', {
                            type: 'success',
                            icon: 'icon-success',
                            duration: 1500
                        });
                        vm.$store.dispatch('backend/category/changeDataLocal', {...vm.deleteCategory, changeType: 'del'});
                        // todo 这个一定要写在 dispatch 下面,因为上面用到了 {...vm.deleteCategory} 之后再将置空.
                        vm.closeDeleteCategoryModal();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
