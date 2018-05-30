import { mapGetters } from 'vuex';
import api from '../../api/index';

import Tag from '../../components/tag/index.vue';
import Pagenation from '../../components/pagenation/index.vue';
import Panel from '../../components/panel/index.vue';

export default {
    name: 'backend-user-list',
    title: '后台-用户管理',
    asyncData({ store, cookies, route }, config = { page: 1 }) {
        config.cookies = cookies;
        const { path } = route;
        return store.dispatch('backend/user/getUserList', {...config, path});
    },
    components: {
        Tag,
        Pagenation,
        Panel
    },
    data() {
        return {
            page: 1,
            tableHeader: [
                {
                    name: '账号',
                    key: 'account',
                    width: '',
                    type: 'string'
                },
                {
                    name: '操作',
                    key: 'operation',
                    width: '170px',
                    align: 'center'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            users: 'backend/user/getUserList'
        })
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page });
        },
        // 删除功能
        handleDelUser(id) {
            console.log(id);
            const vm = this;
            api.backendDelUser({id})
                .then(function (res) {
                    console.log(res);
                    if (res.data.ok === 1) {
                        vm.$options.asyncData({ store: vm.$store, route: vm.$route }, { page: vm.page });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
