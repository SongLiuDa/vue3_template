import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HOME',
    component: () => import('@/views/home')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/succ',
    name: 'SuccPage',
    component: () => import('@/views/succPage')
  },
  {
    path: '/404',
    name: 'ErrorPage',
    component: () => import('@/views/errorPage/404')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]
const router = createRouter({
  history: createWebHistory('/'),
  scrollBehavior: () => ({ top: 0 }),
  routes
})

export default router
