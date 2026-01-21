import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../layout/Nav.vue'
import TabsAuth from '../layout/NavAuth.vue'
import Notification from '@/views/notification/Notification.vue';
import { useAuthStore } from '@/stores/auth'

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
    meta: { requiresAuth: true },
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

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Non connecté + route protégée → auth
  if (to.meta.requiresAuth && !authStore.user) {
    return '/auth/login'
  }

  // Déjà connecté + accès à /auth → tabs
  // if (to.path.startsWith('/auth') && authStore.user) {
  //   return '/tabs/home'
  // }

})


export default router
