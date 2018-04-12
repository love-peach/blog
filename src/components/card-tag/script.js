import card from '../card/index.vue';
export default {
    props: [],
    name: 'card-tag',
    components: {
        card
    },
    data() {
        return {
            tagList: [
                'javascript',
                'html',
                'css',
                'mongodb',
                'nodejs'
            ]
        };
    },
    methods: {}
};
