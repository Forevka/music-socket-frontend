import axios from 'axios'
import store from '../stores/index'

import Vue from 'vue'

class HTTP {
  _instance = null

  constructor () {
    this._http = axios.create({
      timeout: 2000,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
    HTTP._instance = this
  }

  static Instance () {
    if (HTTP._instance == null) {
      return new HTTP()
    }
    return HTTP._instance
  }

  login (login, password) {
    return this._http.post('/authentication', {
      login: login,
      password: password
    })
      .then(response => {
        store.dispatch('change_user', {
          userid: response.data.id,
          username: response.data.login,
          avatar: response.data.img_url,
          role: this.convertRole(response.data.role),
          token: response.data.token
        })
        localStorage.token = response.data.token
        Vue.prototype.$awn.success('Successfully logged as ' + response.data.login)
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  getMe (token) {
    let config = {
      headers: {
        token: token
      }
    }
    this._http.post('/methods/get_me', {asd: '1'}, config)
      .then(response => {
        store.dispatch('change_user', {
          userid: response.data.id,
          username: response.data.login,
          avatar: response.data.img_url,
          role: this.convertRole(response.data.role),
          token: localStorage.token
        })
        Vue.prototype.$awn.success('Successfully logged as ' + response.data.login)
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  convertRole (roleId) {
    if (roleId === 1) {
      return 'Member'
    } else {
      return 'Guest'
    }
  }

  getChannels (page = 0) {
    this._http.post('/get_channels_list', {page: page})
      .then(response => {
        // store.dispatch('add_channel_list', response.data.channels)
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  getAllChannels (page = 0) {
    this._http.post('/get_all_channel_list', {})
      .then(response => {
        store.dispatch('add_channel_list', response.data.channels)
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  getChannelById (chId) {
    return this._http.post('/get_channel', {id: chId})
      .then(response => {
        return response.data
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  parseError (error) {
    console.log(error)
    return error.response.data.message
  }
}

export default HTTP
