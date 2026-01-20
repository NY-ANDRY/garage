import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../layout/Nav.vue'
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
