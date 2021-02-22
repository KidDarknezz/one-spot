import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  mainCover: null,
  sponsoredEvents: [],
  createdRecently: [],
}
const mutations = {
  setMainCoverEvent(state, payload) {
    state.mainCover = payload
  },
  setSponsoredEvent(state, payload) {
    if (payload.event == 'main') state.mainCover = payload.data
    else state.sponsoredEvents.push(payload.data)
  },
  setRecentEvents(state, payload) {
    state.createdRecently.push(payload)
  }
}
const actions = {
  getHomeEvents({ commit }) {
    firebase.firestore().collection('homeSponsor').doc("homeSponsoredEvents").get().then(snapshot => {
      const mainEvent = snapshot.data().mainCover.replace(/\s/g, '')
      const spotlight_1 = snapshot.data().spotlight_1.replace(/\s/g, '')
      const spotlight_2 = snapshot.data().spotlight_2.replace(/\s/g, '')
      const spotlight_3 = snapshot.data().spotlight_3.replace(/\s/g, '')
      //get main
      firebase.firestore().collection('events').doc(mainEvent).get().then(event => {
        let ev = event.data()
        ev.id = event.id
        commit("setSponsoredEvent", { event: 'main', data: ev })
      })
      //get sponsor 1
      firebase.firestore().collection('events').doc(spotlight_1).get().then(event => {
        let ev = event.data()
        ev.id = event.id
        commit("setSponsoredEvent", { event: 'spotlight_1', data: ev })
      })
      //get sponsor 2
      firebase.firestore().collection('events').doc(spotlight_2).get().then(event => {
        let ev = event.data()
        ev.id = event.id
        commit("setSponsoredEvent", { event: 'spotlight_2', data: ev })
      })
      //get sponsor 3
      firebase.firestore().collection('events').doc(spotlight_3).get().then(event => {
        let ev = event.data()
        ev.id = event.id
        commit("setSponsoredEvent", { event: 'spotlight_3', data: ev })
      })
    })
    firebase.firestore().collection('events').orderBy('createdAt', 'desc').limit(6).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        let d = doc.data()
        d.id = doc.id
        commit('setRecentEvents', d)
      })
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