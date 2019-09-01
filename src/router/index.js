import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Channel from '@/components/Channel'
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
      path: '/channels',
      name: 'ChannelsList',
      component: ChannelsList
    }
  ]
})
