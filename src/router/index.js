import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
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
  // 管理员
  {
    path: '/admin',
    component: () => import('@/views/admin')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
