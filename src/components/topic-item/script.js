import topicItemAction from '../topic-item-action/index.vue';
import moment from 'moment';
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
    filters: {
        formatYear(value) {
            return moment(value).year();
        },
        formatMonth(value) {
            return moment(value).format('MMM');
        },
        formatDay(value) {
            return moment(value).format('DD');
        }
    },
    data() {
        return {
            mes: ''
        };
    },
    methods: {}
};
