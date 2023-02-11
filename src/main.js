import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navbar from "@/components/navbar.vue";

import axios from 'axios'
import VueAxios from "vue-axios";
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.use(VueAxios,axios)

Vue.component("navbar",navbar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')