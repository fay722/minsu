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
  {
    path: '/homestaysInfo/:id',
    component: () => import('@/views/homestayInfo')
  },
  // 管理员
  {
    path: '/admin',
    component: () => import('@/views/admin')
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

export default router
// 路由守卫
// const store = useStore()
// router.beforeEach((to, from, next) => {
//   if (to.path === '/admin') {
//     // console.log(store.state.user.user.userName);
//     // if (store.state.user.user.userName) {
//     //   console.log('1');
//     //   next()
//     // } else {
//     //   console.log('2');
//     //   next(false)
//     // }
//   }
// })
