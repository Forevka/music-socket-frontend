import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Channel from '@/views/Channel'
import ChannelsList from '@/views/ChannelsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/channel/:id',
      name: 'Channel',
      component: Channel
    },
    {
      path: '/channels',
      name: 'ChannelsList',
      component: ChannelsList
    }
  ]
})
