import firebase from 'firebase/app'
import 'firebase/firebase-auth'

import router from '@/router'

const state = {}
const mutations = {}
const actions = {
  loginUser({ }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(credentials => {
        console.log(credentials)
        router.replace('/')
      })
      .catch(err => {
        console.log(err)
        alert(err.message)
      })
  },
  logoutUser() {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout succesfull')
        router.replace('/login')
      })
      .catch(err => {
        console.log(err)
      })
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};