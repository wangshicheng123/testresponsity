import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from "./views/Test.vue"
import Test2 from "./views/Test2.vue"
import Test3 from "./views/Test3.vue"
import Error from "./views/Error.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      // 重定向的path, 就是一个用于的一个连接，被点击回到另一个页面上
      path: '/redi/:name/:age',

      // 重定向（注意带参数的时候要加上参数）
      redirect: "./about/:name/:age"
    },
    {
      path: '/about/:name/:age',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/test/:id",
      component: Test,
      children: [
        {

          // 当前path的名称
          path: "/test/test2",
          component: Test2,

          // 当前path的别名
          alias: "/alias"

        },
        {
          path: "/test/test3",
          component: Test3
        }
      ]
    },
    {
      path: "*",
      component: Error
    }

  ]
})
