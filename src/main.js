import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload'; 

import toast from 'components/common/toast';

// import "normalize.css/normalize.css"
Vue.prototype.$bus = new Vue()
// 使用toast插件
Vue.use(toast)
// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

