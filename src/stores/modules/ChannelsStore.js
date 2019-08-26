const state = {
  channels: [],
  current_channel: {
    id: -1,
    description: '',
    name: '',
    img_url: ''
  }
}

const mutations = {
  add_channel (state, channel) {
    state.channels.push(channel)
  },
  current_channel (state, channel) {
    state.current_channel.id = channel.id
    state.current_channel.description = channel.description
    state.current_channel.name = channel.name
    state.current_channel.img_url = channel.img_url
  }
}

const actions = {
  add_channel_list (context, payload) {
    for (let i = 0; i < payload.length; i++) {
      context.commit('add_channel', payload[i])
    }
  },
  add_channel (context, payload) {
    context.commit('add_channel', payload)
  },
  change_current_channel (context, payload) {
    context.commit('current_channel', payload)
  }
}

const getters = {
  get_channel_by_id: (context, state) => (id) => {
    return context.channels.find(channel => channel.id === id)
  },
  get_current_channel (context, state) {
    return context.current_channel
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
