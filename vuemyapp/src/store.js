import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photoData: []
  },
  mutations: {
    addPhoto(state, data){
      state.photoData=data;
    }
  },
  actions: {

  }
})
