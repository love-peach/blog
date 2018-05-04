import { mapGetters } from 'vuex';
import moment from 'moment';
import { toThousands } from '../../util/util';
import api from '../../api/index';

import Tag from '../../components/tag/index.vue';
import Pagenation from '../../components/pagenation/index.vue';
import switchBar from '../../components/switch/index.vue';

export default {
    name: 'backend-article-list',
    title: '后台-文章管理',
    asyncData({ store, cookies, route }, config = { page: 1 }) {
        config.cookies = cookies;
        const { path } = route;
        return store.dispatch('backend/wordpress/getArticleList', {...config, path});
    },
    components: {
        Tag,
        Pagenation,
        switchBar
    },
    data() {
        return {
            page: 1,
            tableHeader: [
                {
                    name: '海报',
                    key: 'poster',
                    width: '80px',
                    class: 'visible-md visible-lg',
                    type: 'string'
                },
                {
                    name: '标题',
                    key: 'title',
                    width: '',
                    type: 'string'
                },
                // {
                //     name: '作者',
                //     key: 'author',
                //     width: '',
                //     type: 'string'
                // },
                {
                    name: '分类',
                    key: 'category',
                    width: '80px',
                    class: 'hidden-xs',
                    type: 'string'
                },
                {
                    name: '标签',
                    key: 'tagArr',
                    width: '',
                    align: 'center',
                    class: 'hidden-xs',
                    type: 'array'
                },
                {
                    name: '创建时间',
                    key: 'createAt',
                    width: '',
                    align: 'center',
                    class: 'visible-lg',
                    type: 'date'
                },
                {
                    name: '修改时间',
                    key: 'updateAt',
                    width: '',
                    align: 'center',
                    class: 'visible-md visible-lg',
                    type: 'date'
                },
                {
                    name: '浏览',
                    key: 'viewed',
                    width: '',
                    align: 'center',
                    class: 'hidden-xs',
                    type: 'number'
                },
                {
                    name: '赞',
                    key: 'liked',
                    width: '',
                    align: 'center',
                    class: 'hidden-xs',
                    type: 'number'
                },
                {
                    name: '评论',
                    key: 'comment',
                    width: '',
                    align: 'center',
                    class: 'hidden-xs',
                    type: 'number'
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
            topics: 'backend/wordpress/getArticleList'
        })
    },
    filters: {
        dataFormat(value, rows) {
            let result = '';
            switch (rows.type) {
                case 'string':
                    result = value;
                    break;
                case 'number':
                    result = toThousands(value);
                    break;
                case 'date':
                    result = moment(value).format('YYYY/MM/DD');
                    break;
                case 'array':
                    result = value.join(' ');
                    break;
                default:
                    result = value;
            }
            return result;
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.$options.asyncData({ store: this.$store, route: this.$route }, { page });
        },
        // 删除功能
        handleDelArticle(id) {
            console.log(id);
            const vm = this;
            api.delArticle({id})
                .then(function (res) {
                    console.log(res);
                    if (res.data.ok === 1) {
                        vm.$options.asyncData({ store: vm.$store, route: vm.$route }, { page: vm.page });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        // 上下架功能
        handleToggleOffState(value, id) {
            const vm = this;
            api.backendToggleOffState({offState: value, id})
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
