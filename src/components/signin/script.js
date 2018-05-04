import { mapGetters } from 'vuex';
import api from '../../api/index';
import modal from '../modal/index.vue';

export default {
    components: {
        modal
    },
    name: 'signIn',
    data() {
        return {
            formData: {
                account: '',
                password: ''
            }
        };
    },
    computed: {
        ...mapGetters({
            globalStore: 'globalStore/getGlobal'
        })
    },
    methods: {
        closeModel() {
            this.$store.dispatch('globalStore/toggleSignInModal', false);
        },
        login() {
            const vm = this;
            const isChecked = this.checkedFormData();
            if (!isChecked) {
                return;
            }
            api.frontendSignIn(vm.formData)
                .then((result) => {
                    if (result.code === 200) {
                        vm.$toast(result.message, {
                            type: 'success',
                            icon: 'icon-success'
                        });
                        vm.$store.dispatch('globalStore/toggleSignInModal', false);
                        setTimeout(() => {
                            vm.$router.go(0);
                        }, 500);
                    } else {
                        vm.$toast(result.message, {
                            type: 'danger',
                            icon: 'icon-danger'
                        });
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goToRegister() {
            this.$store.dispatch('globalStore/toggleSignInModal', false);
            this.$store.dispatch('globalStore/toggleSignUpModal', true);
        },
        checkedFormData() {
            if (!this.formData.account) {
                this.$toast('请输入昵称', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (!this.formData.password) {
                this.$toast('请输入密码', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            // if (!(/^1[34578]\d{9}$/.test(this.phone))) {
            //     this.$toast({message: '请输入正确手机号', position: 'top'});
            //     return false;
            // }
            // if (!this.password) {
            //     this.$toast({message: '请输入密码', position: 'top'});
            //     return false;
            // }
            // if (this.password.length < 6) {
            //     this.$toast({message: '密码至少为 6 位', position: 'top'});
            //     return false;
            // }
            return true;
        }
    }
};
