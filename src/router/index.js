import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../components/Home'
import About from '../views/About.vue'
import Main from '../views/Main.vue'
import Detail from '../views/Detail.vue'
import Login from '../components/Login'
import Senuphold from '../views/Senuphold'
import Appuphold from '../views/Appuphold'
import Auditing from '../views/Auditing'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
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
      { path: '/Main',name: 'Main',component: Main},
      {
        path: '/filedetail',
        name: 'Detail',
        component: Detail
      },
      { path:'/Senuphold',name:'Senuphold',component:Senuphold},

      { path:'/Appuphold',name:'Appuphold',component:Appuphold},

      { path:'/Auditing',name:'Auditing',component:Auditing},

      { path:'/Detail',name:'Detail1',component:Detail},


    ]
  },
  {
    path: '/login', // 用户管理
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
