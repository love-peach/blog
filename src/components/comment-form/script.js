import cookies from 'js-cookie';

export default {
    name: 'comment-form',
    data() {
        return {
            userId: cookies.get('userId'),
            userAccount: cookies.get('userAccount')
        };
    },
    computed: {},
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
