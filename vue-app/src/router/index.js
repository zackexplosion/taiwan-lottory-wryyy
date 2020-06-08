import Vue from 'vue'
import Router from 'vue-router'
import GameList from '@/components/GameList'
import DailyCashIndex from '@/components/DailyCash/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GameList',
      component: GameList
    },
    {
      path: '/game/dailycash',
      name: 'dailycash',
      component: DailyCashIndex
    }
  ]
})
