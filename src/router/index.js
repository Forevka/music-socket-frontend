import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Channel from '@/components/Channel'
import ChannelDoesntExist from '@/components/ChannelDoesntExist'
import ChannelsList from '@/components/ChannelsList'

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
      path: '/channel_dont_exist',
      name: 'ChannelDoesntExist',
      component: ChannelDoesntExist
    },
    {
      path: '/channels',
      name: 'ChannelsList',
      component: ChannelsList
    }
  ]
})
