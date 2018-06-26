import Modal from '../../components/modal/index.vue';
import ResourcePart from './resource-part/index.vue';
import api from '../../api/index';
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
    name: 'resource',
    components: {
        Modal,
        ResourcePart
    },
    mounted() {
        this.$store.dispatch('backend/resource/getResourceList', { page: 1, limit: 100 });
    },
    data() {
        return {
            showResourceModal: false,
            showDelResourceModal: false,
            showResourceItemModal: false,
            showDelResourceItemModal: false,
            isAddResource: false,
            deleteResource: null,
            resourceItemIndex: '',
            formData: {
                resource: {
                    name: '',
                    rank: '',
                    child: [],
                    id: ''
                },
                resourceItem: {
                    name: '',
                    url: '',
                    dis: '',
                    poster: '',
                    rank: ''
                }
            }
        };
    },
    computed: {
        ...mapGetters({
            resourceList: 'backend/resource/getResourceList'
        })
    },
    filters: {
        timeFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    methods: {
        // 显示资源分类弹框
        handleShowResourceModal(resource) {
            this.showResourceModal = true;
            if (resource._id) {
                this.isAddResource = false;
                this.initResourceForm(resource);
            } else {
                this.isAddResource = true;
                this.resetResourceForm();
            }
        },
        // 关闭资源分类弹框
        closeResourceModal() {
            this.resetResourceForm();
            this.showResourceModal = false;
        },
        // 显示删除资源分类弹框
        handleShowDelResourceModal(resource) {
            this.showDelResourceModal = true;
            this.deleteResource = resource;
        },
        // 关闭删除资源分类弹框
        closeDelResourceModal() {
            this.showDelResourceModal = false;
            this.deleteResource = null;
        },

        // 显示资源 子选项弹框
        handleShowResourceItemModal(resource, resourceItem, resourceItemIndex) {
            this.resourceItemIndex = resourceItemIndex === undefined ? '' : resourceItemIndex;
            this.initResourceForm(resource);
            resourceItem && this.initResourceItemForm(resourceItem);
            this.showResourceItemModal = true;
        },
        // 关闭资源 子选项弹框
        closeResourceItemModal() {
            this.resetResourceItemForm();
            this.showResourceItemModal = false;
        },
        // 显示删除资源 子选项弹框
        handleShowDelResourceItemModal(resource, resourceItem, resourceItemIndex) {
            this.showDelResourceItemModal = true;
            this.initResourceForm(resource);
            this.initResourceItemForm(resourceItem);
            this.resourceItemIndex = resourceItemIndex;
        },
        // 关闭删除资源 子选项弹框
        closeDelResourceItemModal() {
            this.showDelResourceItemModal = false;
            this.deleteResource = null;
        },

        // 初始化资源分类弹框表单
        initResourceForm(resource) {
            this.formData.resource.name = resource.name;
            this.formData.resource.rank = resource.rank;
            this.formData.resource.child = resource.child;
            this.formData.resource.id = resource._id;
        },
        // 重置资源分类弹框表单
        resetResourceForm() {
            const { resource } = this.formData;
            for (let key in resource) {
                if (key === 'child') {
                    resource[key] = [];
                } else {
                    resource[key] = '';
                }
            }
        },
        // 初始化资源分类弹框表单
        initResourceItemForm(resourceItemData) {
            const { resourceItem } = this.formData;
            for (let key in resourceItem) {
                resourceItem[key] = resourceItemData[key];
            }
        },
        // 重置资源分类弹框表单
        resetResourceItemForm() {
            const { resourceItem } = this.formData;
            this.resourceItemIndex = '';
            for (let key in resourceItem) {
                resourceItem[key] = '';
            }
        },

        // 提交资源分类表单
        submitResource() {
            const vm = this;
            const params = this.formData.resource;
            const toastText = params.id ? '修改成功' : '添加成功';
            api.backendPostResource(params)
                .then(function (res) {
                    vm.$toast(toastText, {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1500
                    });
                    vm.$store.dispatch('backend/resource/changeDataLocal', {...res.data, changeType: params.id ? 'edit' : 'add'});
                    vm.closeResourceModal();
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        submitResourceItem() {
            const vm = this;
            const params = {
                resourceId: this.formData.resource.id,
                resourceItem: this.formData.resourceItem,
                resourceItemIndex: this.resourceItemIndex
            };
            const toastText = params.resourceItemIndex ? '修改成功' : '添加成功';
            api.backendPostResourceItem(params)
                .then(res => {
                    vm.$toast(toastText, {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1500
                    });
                    vm.$store.dispatch('backend/resource/changeDataItemLocal', {...res.data, changeType: params.resourceItemIndex.toString() ? 'edit' : 'add'});
                    vm.closeResourceItemModal();
                })
                .catch(err => {
                    console.log(err, 'err');
                });
        },
        // 删除资源分类
        handleDelResource() {
            const vm = this;
            api.backendDelResource({id: vm.deleteResource._id})
                .then(function (res) {
                    if (res.data.ok === 1) {
                        vm.$toast('删除成功', {
                            type: 'success',
                            icon: 'icon-success',
                            duration: 1500
                        });
                        vm.$store.dispatch('backend/resource/changeDataLocal', {...vm.deleteResource, changeType: 'del'});
                        // todo 这个一定要写在 dispatch 下面,因为上面用到了 {...vm.deleteResource} 之后再将置空.
                        vm.closeDelResourceModal();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 删除资源 子分类
        handleDelResourceItem() {
            const vm = this;
            const params = {
                resourceId: this.formData.resource.id,
                resourceItemIndex: this.resourceItemIndex
            };
            api.backendDelResourceItem(params)
                .then(function (res) {
                    vm.$toast('删除成功', {
                        type: 'success',
                        icon: 'icon-success',
                        duration: 1500
                    });
                    vm.$store.dispatch('backend/resource/changeDataItemLocal', {...res.data, changeType: 'del', resourceItemIndex: params.resourceItemIndex});
                    vm.closeDelResourceItemModal();
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
