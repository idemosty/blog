import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    alias: '/tips',
    name: 'tips',
    component: () => import('./components/TipsList'),
  },
  {
    path: '/tips/:id',
    name: 'tip-details',
    component: () => import('./components/Tip'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('./components/AddTip'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('./components/NotFound'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
