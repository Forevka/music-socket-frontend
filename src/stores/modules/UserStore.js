import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userid: -1,
  username: '',
  role: 'Guest',
  token: '',
  password: ''
}

const mutations = {
  change_user (state, userObj) {
    state.userid = userObj.userid
    state.username = userObj.username
    state.role = userObj.role
    state.token = userObj.token
    state.password = userObj.password

    localStorage.token = state.token
  }
}

const actions = {
  change_user (context, payload) {
    context.commit('change_user', payload)
  }
}

const getters = {
  getUser (state) {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
