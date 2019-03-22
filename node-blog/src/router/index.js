import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Home from '@/components/Home'
import Reading from '@/components/Reading/Reading'
import Writing from '@/components/Writing/Writing'
import About from '@/components/About/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: 'Reading',
          component: Reading
        },
        {
          path: 'Writing',
          component: Writing
        },
        {
          path: 'About',
          component: About
        }
      ]
    }
  ]
})
