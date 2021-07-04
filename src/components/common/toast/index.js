import Toast from './Toast';

const obj = {}

obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor =  Vue.extend(Toast)

  // 2.new一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象挂载到某一元素上
  toast.$mount(document.createElement('div'))

  // 4.将元素添加到body
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj