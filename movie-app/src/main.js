import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在入口文件main.js文件中引入rem.js文件（@默认是src代表src文件夹）
import "@/assets/js/rem.js"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
