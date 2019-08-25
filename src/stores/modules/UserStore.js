import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userid: -1,
  username: '',
  role: 'Guest',
  avatar: '',
  token: '',
  channelId: -1
}

const mutations = {
  change_user (state, userObj) {
    state.userid = userObj.userid
    state.username = userObj.username
    state.role = userObj.role
    state.token = userObj.token
    state.avatar = userObj.avatar
  },
  change_channel (state, channelObj) {
    state.channelId = channelObj.channelId
  }
}

const actions = {
  change_user (context, payload) {
    context.commit('change_user', payload)
  },
  change_channel (context, payload) {
    context.commit('change_channel', payload)
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
