import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'

import firebase from 'firebase/app'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCjNTy9FIHYMTXvi2tDJHQaZF382dfUFnw",
  authDomain: "one-spot-e2e0c.firebaseapp.com",
  projectId: "one-spot-e2e0c",
  storageBucket: "one-spot-e2e0c.appspot.com",
  messagingSenderId: "490182160844",
  appId: "1:490182160844:web:b927c59b88f186680aad69",
  measurementId: "G-QS53XM99ZY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
