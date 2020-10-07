import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Auditing from '../views/Auditing'
import Filedetail from '../views/Filedetail'
import Senuphold from '../views/Senuphold'
import Appuphold from '../views/Appuphold'
import Main from '../views/main'
import Detail from '../views/ChildPage/Detail'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },

  { path: '/Main', name: 'Main', component: Main },

  { path: '/Login', name: 'Login', component: Login },

  { path: '/Auditing', name: 'Auditing', component: Auditing },

  { path: '/Filedetail', name: 'Filedetail', component: Filedetail },

  { path: '/Senuphold', name: 'Senuphold', component: Senuphold },

  { path: '/Appuphold', name: 'Appuphold', component: Appuphold },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  { path: '/Detail', name: 'Detail', component: Detail }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
