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
    component: manage,
    children: [
      {
        path: '/manage/department',
        name: 'test',
        component: ()=> import("@/components/staff/department")
      },
      {
        path: '/manage/post',
        name: 'test',
        component: ()=> import("@/components/staff/post")
      },
      {
        path: '/manage/power',
        name: 'test',
        component: ()=> import("@/components/staff/power")
      },
      {
        path: '/manage/operation',
        name: 'test',
        component: ()=> import("@/components/log/operation")
      },
      {
        path: '/manage/logLogin',
        name: 'test',
        component: ()=> import("@/components/log/logLogin")
      },
      {
        path: '/manage/reportForm',
        name: 'test',
        component: ()=> import("@/components/staff/reportForm")
      },
    ]

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
