import Vue from 'vue'
import App from './App.vue'
import { makeServer } from "./server"
import VueSwal from 'vue-swal'


Vue.config.productionTip = false
Vue.use(VueSwal)


if (process.env.NODE_ENV === "development") {
  makeServer()
}

new Vue({
  render: h => h(App),
}).$mount('#app')
