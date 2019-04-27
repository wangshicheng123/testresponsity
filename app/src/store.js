import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 234
  },
  // 用于一些计算使用的
  mutations: {
    add(state,nim){
      state.count+=num;
    }
  },
  actions: {

  }
})
