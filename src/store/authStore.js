import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firestore'

import router from '@/router'

const state = {
  loadingStatus: false,
  activeUser: null
}
const mutations = {
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload
  },
  setActiveUser(state, payload) {
    console.log(payload)
    state.activeUser = payload
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
        commit("setLoadingStatus", false)
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
  async registerUser({ commit }, payload) {
    let sanitizedEmail = payload.email.replace(/\s/g, "");
    commit("setLoadingStatus", true);
    const resp = await firebase.auth().createUserWithEmailAndPassword(sanitizedEmail, payload.password)
    await firebase.firestore().collection('users').doc(resp.user.uid).set({
      name: payload.name,
      lastName: payload.lastName,
      email: payload.email,
      emailVerification: false,
      completeRegistration: false
    })
    firebase.firestore().collection('users').doc(resp.user.uid).onSnapshot(doc => {
      commit('setActiveUser', doc.data())
    })
    commit("setLoadingStatus", false);
    router.push("/email-validation");
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