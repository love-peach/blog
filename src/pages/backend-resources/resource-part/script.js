import Modal from '../../../components/modal/index.vue';
import Panel from '../../../components/panel/index.vue';
// import api from '../../../api/index';
// import { mapGetters } from 'vuex';
import dayjs from 'dayjs';

export default {
    name: 'resource-item',
    props: {
        dataSource: {
            type: Object,
            default: function () {
                return {};
            }
        },
        dataIndex: {
            type: Number
        }
    },
    components: {
        Modal,
        Panel
    },
    data() {
        return {
            msg: '123'
        };
    },
    computed: {},
    filters: {
        timeFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    methods: {
        demo() {
            console.log(this.msg, 'msg');
        }
    }
};
