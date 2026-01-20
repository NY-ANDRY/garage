import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../layout/Nav.vue'
import TabsAuth from '../layout/NavAuth.vue'
import Notification from '@/views/notification/Notification.vue';
import CarCreate from '@/views/car/CarCreate.vue';

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
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: 'car',
        component: () => import('@/views/car/Car.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/add/Add.vue')
      },
      {
        path: 'pay',
        component: () => import('@/views/pay/Pay.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/user/User.vue')
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
