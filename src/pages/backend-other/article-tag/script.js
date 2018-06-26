import Modal from '../../../components/modal/index.vue';
import Panel from '../../../components/panel/index.vue';
import api from '../../../api/index';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
    name: 'article-tag',
    components: {
        Modal,
        Panel
    },
    mounted() {
        this.$store.dispatch('backend/tag/getTagList', { page: 1, limit: 100 });
    },
    data() {
        return {
            showArticleTagModal: false,
            showDeleteTagModal: false,
            deleteTag: null,
            formData: {
                articleTag: {
                    name: '',
                    rank: '',
                    id: ''
                }
            }
        };
    },
    computed: {
        ...mapGetters({
            tagList: 'backend/tag/getTagList'
        })
    },
    filters: {
        timeFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    methods: {
        handleShowArticleTagModal(tag) {
            this.showArticleTagModal = true;
            if (tag._id) {
                this.formData.articleTag.name = tag.name;
                this.formData.articleTag.rank = tag.rank;
                this.formData.articleTag.id = tag._id;
            } else {
                this.formData.articleTag.name = '';
                this.formData.articleTag.rank = '';
                this.formData.articleTag.id = '';
            }
        },
        closeArticleTagModal() {
            this.showArticleTagModal = false;
        },
        handleShowDeleteModal(tag) {
            this.showDeleteTagModal = true;
            this.deleteTag = tag;
        },
        closeDeleteTagModal() {
            this.showDeleteTagModal = false;
            this.deleteTag = null;
        },
        submitArticleTag() {
            const vm = this;
            const { articleTag } = this.formData;
            const toastText = articleTag.id ? '修改成功' : '添加成功';
            api.backendPostArticleTag(articleTag)
                .then(function (res) {
                    vm.$toast(toastText, {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1500
                    });
                    vm.$store.dispatch('backend/tag/changeDataLocal', {...res.data, changeType: articleTag.id ? 'edit' : 'add'});
                    vm.closeArticleTagModal();
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 删除功能
        handleDelTag() {
            const vm = this;
            api.backendDelTag({id: vm.deleteTag._id})
                .then(function (res) {
                    if (res.data.ok === 1) {
                        vm.$toast('删除成功', {
                            type: 'success',
                            icon: 'icon-success',
                            duration: 1500
                        });
                        vm.$store.dispatch('backend/tag/changeDataLocal', {...vm.deleteTag, changeType: 'del'});
                        // todo 这个一定要写在 dispatch 下面,因为上面用到了 {...vm.deleteTag} 之后再将置空.
                        vm.closeDeleteTagModal();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
