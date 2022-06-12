import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FeedView from '../views/FeedView.vue'
import MisPostsView from '../views/MisPostsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/aae/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/aae/registro',
    name: 'registro',
    component: RegisterView
  },
  {
    path: '/aae/feed',
    name: 'feed',
    component: FeedView
  },
  {
    path: '/aae/mis-posts',
    name: 'mis-posts',
    component: MisPostsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
