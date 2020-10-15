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
import Detail1 from '../views/ChildePage/Detail'
import Edit from '../views/ChildePage/Edit'
import Auditingnew from '../views/Auditingnew'

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
      { path: '/Main', name: 'Main', component: Main ,
        meta:{
          keepAlive:false
        }
    },

      {
        path: '/filedetail',
        name: 'Detail',
        component: Detail,
        meta:{
          keepAlive:true
        }
        
      },
      { path: '/Senuphold', name: 'Senuphold', component: Senuphold,
    meta:{
          keepAlive:false
        } },

      { path: '/Appuphold', name: 'Appuphold', component: Appuphold,
      meta:{
        keepAlive:false
      } },

      { path: '/Auditing', name: 'Auditing', component: Auditing,
        meta:{
          keepAlive:true
        }  
    },

      { path: '/Auditingnew', name: 'Auditingnew', component: Auditingnew },

      { path: '/Detail1', name: 'Detail1', component: Detail1,
        meta:{
          keepAlive:true
        }
    },

      { path: '/Edit', name: 'Edit', component: Edit ,
        meta:{
          keepAlive:true
        }
    },

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
  routes,
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return{x:0,y:0}
    }
  }
})

export default router
