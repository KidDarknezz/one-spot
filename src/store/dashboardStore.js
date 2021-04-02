import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage";
import 'firebase/functions'

const state = {
  selectedEvent: null,
  loadingStatus: false,
  myEvents: []
}
const mutations = {
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload
  },
  setSelectedEvent(state, payload) {
    state.selectedEvent = payload
  },
  setAllMyEvents(state, payload) {
    state.myEvents = payload
  },
  setAddNewEvent(state, payload) {
    state.myEvents.push(payload)
  }
}
const actions = {
  getSelectedEvent({ commit }, payload) {
    firebase.firestore().collection('events').doc(payload).get().then(snapshot => {
      commit("setSelectedEvent", snapshot.data())
    })
  },
  emptySelectedEvent({ commit }) {
    commit("setSelectedEvent", null)
  },
  createManagerAccount({}, payload) {
    const createAccount = firebase.functions().httpsCallable('createUser')
    createAccount(payload).then(result => {
      console.log(result)
    })
  },
  async createEvent({commit}, payload) {
    if (confirm('Esta seguro que desea crear este evento?')) {
      commit('setLoadingStatus', true)
      const event = {
        name: payload.name,
          subtitle: payload.subtitle,
          description: payload.description,
          selectedCategories: payload.selectedCategories,
          dateAndTime: payload.dateAndTime,
          status: 'review',
          owner: firebase.auth().currentUser.uid,
          flyer: payload.flyer.name
      }
      const storageRef = firebase
        .storage()
        .ref(
          `events-assets/${firebase.auth().currentUser.uid}/${
            payload.flyer.name
          }`
        );
      await storageRef.put(payload.flyer);
      await firebase.firestore().collection('events').add(event)
      commit('setLoadingStatus', false)
    }
  },
  getMyEvents({commit}) {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection('events').where('owner', '==', uid).onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let ev = change.doc.data()
          ev.id = change.doc.id
          commit('setAddNewEvent', ev)
        }
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