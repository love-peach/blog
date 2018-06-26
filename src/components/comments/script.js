import CommentList from '../comment-list/index.vue';
import cookies from 'js-cookie';

export default {
    name: 'comment',
    props: {
        comments: {
            type: Object,
            default() {
                return {
                    total: 912,
                    havePrev: true,
                    list: [
                        {
                            time: '2018-09-09 10:54',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: '聚宝盆',
                            reply: [
                                {
                                    time: '2018-10-09 11:00',
                                    content: '及饿哦我骄傲加就偶尔发奇偶违反',
                                    authorId: 'awijfi903ijaoe',
                                    authorName: '张晋佩',
                                    reply: []
                                }, {
                                    time: '2018-10-09 11:10',
                                    content: '及饿哦我骄傲加就偶尔发奇偶违反',
                                    authorId: 'awijfi903ijaoe',
                                    authorName: '杨东亮007',
                                    reply: [
                                        {
                                            time: '2018-10-09 12:53',
                                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                                            authorId: 'awijfi903ijaoe',
                                            authorName: '叫我Ace',
                                            reply: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            time: '2018-09-09',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: 'jawiejof',
                            reply: [{
                                time: '2018-10-09',
                                content: '及饿哦我骄傲加就偶尔发奇偶违反',
                                authorId: 'awijfi903ijaoe',
                                authorName: 'jawiejof',
                                reply: []
                            }]
                        },
                        {
                            time: '2018-09-09',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: 'jawiejof',
                            reply: [{
                                time: '2018-10-09',
                                content: '及饿哦我骄傲加就偶尔发奇偶违反',
                                authorId: 'awijfi903ijaoe',
                                authorName: 'jawiejof',
                                reply: []
                            }]
                        },
                        {
                            time: '2018-10-09 11:00',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: '张晋佩',
                            reply: []
                        },
                        {
                            time: '2018-10-09 11:00',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: '张晋佩',
                            reply: []
                        },
                        {
                            time: '2018-10-09 11:00',
                            content: '及饿哦我骄傲加就偶尔发奇偶违反',
                            authorId: 'awijfi903ijaoe',
                            authorName: '张晋佩',
                            reply: []
                        }
                    ]
                };
            }
        }
    },
    components: {
        CommentList
    },
    data() {
        return {};
    },
    computed: {
        isLogin() {
            return !!cookies.get('userId');
        }
    },
    mounted() {},
    destroyed() {},
    methods: {
        login() {
            if (this.userAccount) {
                return;
            }
            this.$store.dispatch('globalStore/toggleSignInModal', true);
        }
    }
};
