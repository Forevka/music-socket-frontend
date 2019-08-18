import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menuUnLogged: [
    {
      header: true,
      title: 'Menu'
    },
    {
      href: '/',
      title: 'Login',
      icon: 'fa fa-user'
    }
  ],
  menuLogged: [
    {
      header: true,
      title: 'Menu'
    },
    {
      href: '/',
      title: 'User',
      icon: 'fa fa-user'
    },
    {
      href: '/',
      title: 'Channel',
      icon: 'fa fa-bullhorn'
    }
  ]
}

const mutations = {
  CHANGE_MENU (state, payload) {
    state.menu.push({
      title: 'New',
      icon: 'fa fa-bullhorn'
    })
  }
}

const actions = {
  changeMenu (context) {
    context.commit('CHANGE_MENU')
  }
}

const getters = {
  getMenu (state) {
    if (Vue.prototype.$mainApp.current_user.userid === -1) {
      return state.menuUnLogged
    } else {
      return state.MenuLogged
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
