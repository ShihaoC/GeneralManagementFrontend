import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/views/index.vue";
import login from "@/views/auth/login.vue";
import manage from "@/views/manage/manage.vue";
import register from "@/views/auth/register.vue";

Vue.use(VueRouter)

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
  },
  {
    path: '/auth/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  routes
})

export default router
