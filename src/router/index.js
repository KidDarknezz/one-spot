import Vue from 'vue'
import VueRouter from 'vue-router'

//LAYOUTS
import AuthLayout from '@/layouts/AuthLayout'
import OneSpotLayout from '@/layouts/OneSpotLayout'

//VIEWS
import Home from '../views/Home.vue'
import EventDetails from '@/views/EventDetails'
import LoginView from '@/views/LoginView'

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
        component: Home
      },
      {
        path: '/event/:eventId',
        name: 'Event Details',
        component: EventDetails
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
