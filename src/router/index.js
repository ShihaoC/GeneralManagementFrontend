import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "@/views/auth/login.vue";
import manage from "@/views/manage/manage.vue";
import register from "@/views/auth/register.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/manage/manage.vue'),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/manage/department',
                name: 'test',
                component: () => import("@/components/system/employee.vue"),
                meta: {
                    title: '人员管理'
                }
            },
            {
                path: '/manage/post',
                name: 'test',
                component: () => import("@/components/system/department.vue"),
                meta: {
                    title: '岗位管理'
                }
            },
            {
                path: '/manage/power',
                name: 'test',
                component: () => import("@/components/system/authority.vue"),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: '/manage/operation',
                name: 'test',
                component: () => import("@/components/log/operation"),
                meta: {
                    title: '员工管理'
                }
            },
            {
                path: '/manage/logLogin',
                name: 'test',
                component: () => import("@/components/log/logLogin"),
                meta: {
                    title: '员工管理'
                }
            },
            {
                path: '/manage/reportForm',
                name: 'test',
                component: () => import("@/components/system/statement.vue"),
                meta: {
                    title: '员工管理'
                }
            },
            {
                path: '/system/resource',
                name: 'setting',
                component: () => import("@/components/system/resource.vue"),
                meta: {
                    title: '资源概览'
                }
            },
            {
                path: '/manage/menu',
                name: 'menu',
                component: () => import("@/components/system/menu-manage.vue"),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: '/manage/user',
                name: 'user',
                component: () => import("@/components/system/user.vue"),
                meta: {
                    title: '用户管理'
                }
            },

            {
                path: '/information',
                name: 'information',
                component: () => import("@/components/system/information.vue"),
                meta: {
                    title: '个人中心'
                },
                children: [
                    {
                        path: '/information/person',
                        name: 'person',
                        component: () => import("@/components/system/person.vue"),
                        meta: {
                            title: '个人信息'
                        }
                    },
                    {
                        path: '/information/pwd',
                        name: 'pwd',
                        component: () => import("@/components/system/pwd.vue"),
                        meta: {
                            title: '修改密码'
                        }
                    },

                ]
            }

        ]

    },
    {
        path: '/auth/register',
        name: 'register',
        component: register
    },
    {
        path: '/Home',
        name: 'Live2D',
        component: () => import("@/views/Live2D/Home.vue")
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import("@/views/error/404.vue")

    },


]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
