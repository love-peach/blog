import MyToast from './toast.vue';

export default {
    install(Vue, defaultOptions = {}) {
        const CONSTRUCTOR = Vue.extend(MyToast);
        const CACHE = {};
        Object.assign(MyToast.DEFAULT_OPT, defaultOptions);

        function toast(msg, options = {}) {
            options.message = msg;
            let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR());
            if (!toast.$el) {
                let vm = toast.$mount();
                document.querySelector(options.parent || 'body').appendChild(vm.$el);
            }
            toast.queue.push(options);
        }
        Vue.toast = Vue.prototype.$toast = toast;
    }
};
