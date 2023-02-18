import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Live2d from "@/components/Live2d.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";

import particles from 'particlesjs'
Vue.use(particles,Live2d)


import axios from 'axios'
import VueAxios from "vue-axios";
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.use(VueAxios,axios)
Vue.component("Breadcrumb",Breadcrumb)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
