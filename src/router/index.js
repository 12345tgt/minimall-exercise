import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const cart = ()=>import('views/cart/Cart')
const category = ()=>import('views/category/Category')
const home = ()=>import('views/home/Home')
const profile = ()=>import('views/profile/Profile')
const detail = ()=>import('views/detail/Detail')

const routes = [
  { path: '/', redirect: '/home'},
  { path: '/cart', component: cart, meta: { title: '购物车' }},
  { path: '/category', component: category, meta: { title: '分类' } },
  { path: '/home', component: home, meta: { title: '首页' }},
  { path: '/profile', component: profile, meta: { title: '我的' }},
  { path: '/detail/:id', component: detail, meta: { title: '详情'}},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router