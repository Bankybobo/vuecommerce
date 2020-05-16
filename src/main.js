import Vue from 'vue'
import App from './App.vue'
import {fb} from './firebase'
import store from './store/index'
import router from './router'
import 'bootstrap'
import './assets/app.scss'
import jQuery from 'jquery'
import Swal from 'sweetalert2'
window.Swal = Swal
window.$ = window.jQuery = jQuery
import VueFirestore from 'vue-firestore'
Vue.use(VueFirestore, {
  key: 'id',
  numerable: true
})
import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)


export const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


Vue.use(VueFirestore)


import 'popper.js'

Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('Products', require('./section/Products.vue').default)
Vue.component('add-to-cart', require('./components/AddToCart.vue').default)
Vue.config.productionTip = false



let app;
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
