import firebase from "firebase/app";
import "firebase/firestore";

import {
  geohashForLocation,
  geohashQueryBounds,
  distanceBetween,
} from "geofire-common";

const state = {
  recommendedEvents: [],
  selectedEvent: null,
  userLocation: null,
  nearByEvents: [],
  searchRadius: 2,
};
const mutations = {
  setRecommendedEvents(state, payload) {
    state.recommendedEvents = payload;
  },
  setNearByEvents(state, payload) {
    state.nearByEvents = payload;
  },
  setNewSearchRadius(state, payload) {
    state.searchRadius = payload;
  },
  setSelectedEvent(state, payload) {
    state.selectedEvent = payload;
  },
};
const actions = {
  getRecommendedEvents({ commit }, payload) {
    let recommendedEvents = [];
    payload.forEach((interest) => {
      firebase
        .firestore()
        .collection("events")
        .where("status", "==", "public")
        .where("selectedCategories", "array-contains", interest)
        .orderBy("publishedAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((event) => {
            let ev = event.data();
            ev.id = event.id;
            if (
              !recommendedEvents.some((recommended) => recommended.id === ev.id)
            )
              recommendedEvents.push(ev);
          });
        });
    });
    commit("setRecommendedEvents", recommendedEvents);
  },
  getSelectedEvent({ commit }, payload) {
    firebase
      .firestore()
      .collection("events")
      .doc(payload)
      .get()
      .then((snapshot) => {
        commit("setSelectedEvent", snapshot.data());
      });
  },
  emptySelectedEvent() {
    commit("setSelectedEvent", null);
  },
  getGeoEvents({ commit }, payload) {
    const center = [payload.lat, payload.lng];
    const radiusInM = state.searchRadius * 1000;
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = firebase
        .firestore()
        .collection("events")
        .where("status", "==", "public")
        .orderBy("geohash")
        .startAt(b[0])
        .endAt(b[1]);
      promises.push(q.get());
    }
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];
        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.data().coords.lat;
            const lng = doc.data().coords.lng;
            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }
        return matchingDocs;
      })
      .then((matchingDocs) => {
        let events = [];
        matchingDocs.forEach((match) => {
          let e = match.data();
          e.id = match.id;
          events.push(e);
        });
        commit("setNearByEvents", events);
      });
  },
  updateSearchRadius({ commit }, payload) {
    commit("setNewSearchRadius", payload);
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
