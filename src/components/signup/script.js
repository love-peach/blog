import { mapGetters } from 'vuex';
import api from '../../api/index';
import modal from '../modal/index.vue';

export default {
    components: {
        modal
    },
    name: 'signOut',
    data() {
        return {
            formData: {
                account: '',
                email: '',
                password: '',
                confirmPassword: ''
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
            this.$store.dispatch('globalStore/toggleSignUpModal', false);
        },
        register() {
            const vm = this;
            const isChecked = this.checkedFormData();
            if (!isChecked) {
                return;
            }
            api.frontendSignUp(vm.formData)
                .then((result) => {
                    if (result.code === 200) {
                        vm.$toast(result.message, {
                            type: 'success',
                            icon: 'icon-success'
                        });
                        vm.$store.dispatch('globalStore/toggleSignUpModal', false);
                    } else {
                        vm.$toast(result.message, {
                            type: 'danger',
                            icon: 'icon-danger'
                        });
                    }
                })
                .catch((err) => {
                    console.log(err, 'err');
                });
            console.log(this.formData);
        },
        goToLogIn() {
            this.$store.dispatch('globalStore/toggleSignUpModal', false);
            this.$store.dispatch('globalStore/toggleSignInModal', true);
        },
        checkedFormData() {
            if (!this.formData.account) {
                this.$toast('请填写昵称', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (!this.formData.email) {
                this.$toast('请填写邮箱', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            var emailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
            if (!(emailReg.test(this.formData.email))) {
                this.$toast('邮箱格式不正确', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (!this.formData.password) {
                this.$toast('请填写密码', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (this.formData.password.length < 6) {
                this.$toast('密码至少为 6 位', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (!this.formData.confirmPassword) {
                this.$toast('请再次确认密码', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }
            if (this.formData.password !== this.formData.confirmPassword) {
                this.$toast('密码不一致', {
                    type: 'danger',
                    icon: 'icon-danger'
                });
                return false;
            }

            // if (!(/^1[34578]\d{9}$/.test(this.phone))) {
            //     this.$toast({message: '请输入正确手机号', position: 'top'});
            //     return false;
            // }
            return true;
        }
    }
};
