import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ChatBox from '@/components/ChatBox'

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
      path: '/chat',
      name: 'ChatBox',
      component: ChatBox
    }
  ]
})
