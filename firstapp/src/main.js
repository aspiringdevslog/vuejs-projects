import Vue from 'vue'
import FirstApp from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Firebase from 'firebase'
import VueResource from 'vue-resource'
import Firestore from 'vue-firestore'
import VueFire from 'vuefire' 

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.use(Firestore)
Vue.use(VueFire)

Vue.use(Firebase)
Vue.use(VueResource)

new Vue({
  render: h => h(FirstApp),
}).$mount('#firstapp')
