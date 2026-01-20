import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../layout/Nav.vue'
import TabsAuth from '../layout/NavAuth.vue'
import Notification from '@/views/Notification.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
    {
    path: '/notifications',
    component: Notification
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'wait',
        component: () => import('@/views/WaitList.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/Add.vue')
      },
      {
        path: 'pay',
        component: () => import('@/views/Pay.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/User.vue')
      }
    ]
  },
  {
    path: '/auth/',
    component: TabsAuth,
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        component: () => import('@/views/auth/Login.vue')
      },
      {
        path: 'signin',
        component: () => import('@/views/auth/SignIn.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
