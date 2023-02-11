import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/views/index.vue";
import login from "@/views/auth/login.vue";
import test from "@/views/test.vue"

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
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = new VueRouter({
  routes
})

export default router
