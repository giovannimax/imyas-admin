import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Bookings from './views/Bookings'
import ViewArtist from './views/ViewArtist'
import ViewClient from './views/ViewClient'
import Artists from './views/Artists'
import Clients from './views/Clients'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Home
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
      path: '/artists/:id',
      name: 'View Artist',
      component: ViewArtist
    },
    {
      path: '/clients/:id',
      name: 'View Client',
      component: ViewClient
    },
    {
      path: '/artists',
      name: 'Artists',
      component: Artists
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
  ]
})
