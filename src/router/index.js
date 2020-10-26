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
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '/',
      nane:'login',
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
          component: About,
          meta: { requiresAuth: true, }
          // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
        {
          path: '/Main', name: 'Main', component: Main,
          meta: {
            keepAlive: false,
            requiresAuth: true,
          }
        },

        {
          path: '/filedetail',
          name: 'Detail',
          component: Detail,
          meta: {
            keepAlive: true,
            requiresAuth: true,
          }

        },
        {
          path: '/Senuphold', name: 'Senuphold', component: Senuphold,
          meta: {
            keepAlive: false,
            requiresAuth: true,
          }
        },

        {
          path: '/Appuphold', name: 'Appuphold', component: Appuphold,
          meta: {
            keepAlive: false,
            requiresAuth: true,
          }
        },

        {
          path: '/Auditing', name: 'Auditing', component: Auditing,
          meta: {
            keepAlive: true,
            requiresAuth: true,
          }
        },

        { path: '/Auditingnew', name: 'Auditingnew', component: Auditingnew },

        {
          path: '/Detail1', name: 'Detail1', component: Detail1,
          meta: {
            keepAlive: true,
            requiresAuth: true,
          }
        },

        {
          path: '/Edit', name: 'Edit', component: Edit,
          meta: {
            keepAlive: true,
            requiresAuth: true,
          }
        },

      ]
    },
    {
      path: '/login', // 用户管理
      component: Login
    }
  ]
})

// 全局前置守卫（回调函数）
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth == true) {
    // 去首页 判断登录
    // token
    if (window.localStorage.getItem('Authorization') != undefined) {
      // 存在就放行
      next()
    } else {
      // new一个实例出来
      new Vue().$message.error('请登录获取权限后使用')
      // 不存在
      router.push('login')
    }
  } else {
    // 放过去
    next()
  }
})


export default router
