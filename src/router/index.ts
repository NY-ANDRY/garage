import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../layout/Nav.vue'
import TabsAuth from '../layout/NavAuth.vue'
import Notification from '@/views/Notification.vue'
import { getLoginState } from '@/stores/auth'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/tabs/home' },

  { path: '/notifications', component: Notification },

  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/tabs/home' },
      { path: 'home', component: () => import('@/views/Home.vue') },
      { path: 'car', component: () => import('@/views/Car.vue') },
      { path: 'add', component: () => import('@/views/Add.vue') },
      { path: 'pay', component: () => import('@/views/Pay.vue') },
      { path: 'user', component: () => import('@/views/User.vue') }
    ]
  },
  {
    path: '/auth/',
    component: TabsAuth,
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/views/Auth.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isLoggedIn = await getLoginState()

  if (requiresAuth && !isLoggedIn) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
