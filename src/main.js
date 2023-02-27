import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)


import VueFullscreen from 'vue-fullscreen'
import '@/assets/icon/iconfont.css'

import Live2d from "@/components/Live2d.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";

import BasicChart from "@/components/Echearts/BasicChart.vue";

import particles from 'particlesjs'
import Role_Authority from "@/components/auth/Role_Authority.vue";
import {message} from '@/assets/util/resetMessage'

Vue.prototype.$echarts = echarts;

import ImageCropper from "@/components/cropper/ImageCropper.vue";

Vue.use(particles, Live2d)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(ElementUI);
Vue.prototype.$message = message
Vue.use(VueFullscreen)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.component("Breadcrumb", Breadcrumb)
Vue.component("BasicChart", BasicChart)
Vue.component("Role_Authority", Role_Authority)
Vue.component("ImageCropper", ImageCropper)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
