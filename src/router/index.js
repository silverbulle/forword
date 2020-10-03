import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../components/Home'
import About from '../views/About.vue'
import Main from '../views/Main.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/filedetail',
        name: 'Detail',
        component: Detail
      },

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
