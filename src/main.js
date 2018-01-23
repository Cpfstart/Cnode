// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import store from './store'
import router from './router'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(iView)
Vue.use(ElementUI)

Vue.config.productionTip = false
if (sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(sessionStorage.user))
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
