import mdEditor from '../../components/md-editor/index.vue';
import api from '../../api/index';
export default {
    props: [],
    name: 'admin-write',
    components: {
        mdEditor
    },
    data() {
        return {
            formData: {
                title: '',
                category: 'CSS',
                tag: '',
                poster: '',
                content: ''
            }
        };
    },
    methods: {
        submit() {
            const vm = this;
            const params = {
                ...this.formData,
                author: 'zhangjinpei'
            };
            api.postArticle(params)
                .then(function (res) {
                    vm.$router.push({ path: `/wordpress/${res.data._id}` });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
};
