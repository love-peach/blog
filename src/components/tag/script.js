export default {
    props: {
        type: {
            type: String,
            default: 'info'
        },
        size: {
            type: String,
            default: 'xs'
        },
        radius: {
            type: [String, Number],
            default: 0
        },
        closeAble: {
            type: Boolean,
            default: false
        }
    },
    name: 'tag',
    data() {
        return {
            mes: ''
        };
    },
    methods: {}
};
