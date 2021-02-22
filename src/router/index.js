import Vue from 'vue'
import VueRouter from 'vue-router'

//LAYOUTS
import AuthLayout from '@/layouts/AuthLayout'
import OneSpotLayout from '@/layouts/OneSpotLayout'

//VIEWS
import Home from '../views/Home.vue'
import EventDetails from '@/views/EventDetails'
import LoginView from '@/views/LoginView'

//FIREBASE
import firebase from 'firebase/app'
import 'firebase/firebase-auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: LoginView
      }
    ]
  },
  {
    path: '/',
    component: OneSpotLayout,
    children: [
      {
        path: '/',
        name: 'OneSpot',
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/event/:eventId',
        name: 'Event Details',
        component: EventDetails,
        meta: {
          requiresAuth: true,
        },
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) next()
      else next('/login')
    })
  } else {
    next()
  }
})

export default router
