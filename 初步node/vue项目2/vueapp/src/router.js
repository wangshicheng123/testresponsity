import Vue from 'vue'
import Router from 'vue-router'
import Reg from './views/reg.vue'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/index",
      redirect: "/"
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login.vue')
    }
  ]
})
