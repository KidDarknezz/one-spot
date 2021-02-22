import firebase from 'firebase/app'
import 'firebase/firebase-auth'

import router from '@/router'

const state = {
  loadingStatus: false
}
const mutations = {
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload
  }
}
const actions = {
  loginUser({ commit }, payload) {
    commit("setLoadingStatus", true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(credentials => {
        router.replace('/')
        commit("setLoadingStatus", false)
      })
      .catch(err => {
        commit("setLoadingStatus", true)
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