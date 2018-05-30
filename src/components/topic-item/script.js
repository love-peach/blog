import topicItemAction from '../topic-item-action/index.vue';
import dayjs from 'dayjs';
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
            return dayjs(value).format('YYYY');
        },
        formatMonth(value) {
            const monthEnStr = 'January_February_March_April_May_June_July_August_September_October_November_December';
            const monthEnArr = monthEnStr.split('_');
            const month = dayjs(value).$M;
            return monthEnArr[month].slice(0, 4).toUpperCase();
        },
        formatDay(value) {
            return dayjs(value).format('DD');
        }
    },
    data() {
        return {
            mes: ''
        };
    },
    methods: {}
};
