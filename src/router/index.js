import Vue from 'vue'
import Router from 'vue-router'
import index from "@/views/index.vue";
import login from "@/views/auth/login.vue";
import manage from "@/views/manage/manage.vue";
import Register from "@/views/auth/register.vue";

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/auth/login',
    name: 'login',
    component: login
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage
  }
]

const router = new VueRouter({
  routes
})

export default router
