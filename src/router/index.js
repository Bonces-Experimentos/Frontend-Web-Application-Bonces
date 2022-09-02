import Vue from 'vue'
import VueRouter from 'vue-router'
import FreeViews from '../views/freeViews/FreeViews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FreeViews,
    children: [
      {
        path: '',
        name: 'AboutUs',
        component: () => import('../views/freeViews/AboutUs.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/freeViews/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/freeViews/Register.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../views/authViews/AuthViews.vue'),
    children: [
      {
        path: '',
        name: 'Calculator',
        component: () => import('../views/authViews/Calculator.vue')
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('../views/authViews/History.vue')
      },
      {
        path: 'my-profile',
        name: 'MyProfile',
        component: () => import('../views/authViews/MyProfile.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
