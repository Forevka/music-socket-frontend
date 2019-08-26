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
      href: '/dashboard',
      title: 'User',
      icon: 'fa fa-user'
    },
    {
      href: '/channel/1',
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
  getMenu (context, state) {
    if (state.getUser.userid === -1) {
      return context.menuUnLogged
    } else {
      return context.menuLogged
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
