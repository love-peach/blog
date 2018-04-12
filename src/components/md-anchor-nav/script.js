import { mapGetters } from 'vuex';

export default {
    name: 'md-anchor-nav',
    props: {
        list: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        }
    },
    filters: {
        anchor: function (value) {
            return `#titleAnchor-${value}`;
        }
    },
    computed: {
        ...mapGetters({
            highLightIndex: 'frontend/wordpress/getHighLightIndex'
        })
    }
};
