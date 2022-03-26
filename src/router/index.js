import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const Layout = () => import('@/views/Layout')
const admin = () => import('@/views/admin')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/list',
    component: () => import('@/views/list')
  },
  {
    path: '/personal',
    component: () => import('@/views/personal')
  },
  {
    path: '/homestaysInfo/:id',
    component: () => import('@/views/homestayInfo')
  },
  // 管理员
  {
    path: '/admin',
    component: admin,
    children: [
      {
        path: '/admin/homeIndex',
        component: () => import('@/views/admin/components/homeIndex.vue')
      },
      {
        path: '/admin/user',
        component: () => import('@/views/admin/components/user.vue')
      },
      {
        path: '/admin/homestays',
        component: () => import('@/views/admin/components/homestays.vue'),
      },
      {
        path: '/admin/order',
        component: () => import('@/views/admin/components/order.vue')
      },
      {
        path: '/admin/tips',
        component: () => import('@/views/admin/components/tips.vue')
      },
      {
        path: '/admin/collect',
        component: () => import('@/views/admin/components/collect.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})
// 路由守卫
// router.beforeEach((to, from) => {
//   if (to.path === '/admin') {
//     // console.log(store.state.user.user)
//     if (store.state.user.user.userName === 'admin') {
//       return true
//     } else {
//       return false
//     }
//   } else if (to.path === '/login') {
//     return true
//   } else {

//   }
// })

export default router

