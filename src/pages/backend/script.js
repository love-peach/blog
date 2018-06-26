export default {
    name: 'backend',
    title: '后台',
    data() {
        return {
            entranceList: [
                {
                    name: '用户管理',
                    path: '/backend/user',
                    icon: 'icon-user-manager'
                },
                {
                    name: '写文章',
                    path: '/backend/article/write',
                    icon: 'icon-write'
                },
                {
                    name: '文章管理',
                    path: '/backend/article',
                    icon: 'icon-article-manager'
                },
                {
                    name: '前端资源配置',
                    path: '/backend/resources',
                    icon: 'icon-article-manager'
                },
                {
                    name: '其他',
                    path: '/backend/other',
                    icon: 'icon-menu'
                }
            ]
        };
    },
    methods: {}
};
