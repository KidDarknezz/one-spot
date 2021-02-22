import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  selectedEvent: null
}
const mutations = {
  setSelectedEvent(state, payload) {
    state.selectedEvent = payload
  }
}
const actions = {
  getSelectedEvent({ commit }, payload) {
    firebase.firestore().collection('events').doc(payload).get().then(snapshot => {
      commit("setSelectedEvent", snapshot.data())
    })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};