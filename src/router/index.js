import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve)
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/components/detail'], resolve)
    },
    {
      path: '/commentText',
      name: 'commentText',
      component: resolve => require(['@/components/detail/commentText'], resolve)
    },
    {
      path: '/shareImg',
      name: 'shareImg',
      component: resolve => require(['@/components/shareImg'], resolve)
    },
    {
      path: '/',
      redirect: '/home'
    }
    
  ]
})
