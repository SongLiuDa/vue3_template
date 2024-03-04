import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import('@/views/account')
      }
    ]
  }
]
const isDev = process.env.NODE_ENV === 'development'
const base = isDev ? '/' : '/h5'
const router = createRouter({
  history: createWebHistory(base),
  scrollBehavior: () => ({ top: 0 }),
  routes
})

export default router
