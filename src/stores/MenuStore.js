import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  menu: [
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
      title: 'Channels',
      icon: 'fa fa-bullhorn',
      child: [
        {
          href: '/channels',
          title: 'All Channels'
        },
        {
          href: '/channels/my',
          title: 'My Channels'
        }
      ]
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
    return state.menu
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
