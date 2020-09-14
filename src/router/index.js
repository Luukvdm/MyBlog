import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'


import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
