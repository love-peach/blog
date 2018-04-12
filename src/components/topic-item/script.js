import topicItemAction from '../topic-item-action/index.vue';
export default {
    props: {
        topic: {
            type: Object,
            required: true
        }
    },
    name: 'topic-item',
    components: {
        topicItemAction
    },
    data() {
        return {
            mes: ''
        };
    },
    methods: {}
};
