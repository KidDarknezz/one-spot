import firebase from "firebase/app";
import "firebase/firestore";

import {
  geohashForLocation,
  geohashQueryBounds,
  distanceBetween,
} from "geofire-common";

const state = {
  mainCover: null,
  sponsoredEvents: [],
  createdRecently: [],
  //
  recommendedEvents: [],
  userLocation: null,
  nearByEvents: [],
  searchRadius: 2,
};
const mutations = {
  setMainCoverEvent(state, payload) {
    state.mainCover = payload;
  },
  setSponsoredEvent(state, payload) {
    if (payload.event == "main") state.mainCover = payload.data;
    else state.sponsoredEvents.push(payload.data);
  },
  setRecentEvents(state, payload) {
    state.createdRecently.push(payload);
  },
  setRecommendedEvents(state, payload) {
    state.recommendedEvents = payload;
  },
  setNearByEvents(state, payload) {
    state.nearByEvents = payload;
  },
  setNewSearchRadius(state, payload) {
    state.searchRadius = payload;
  },
};
const actions = {
  getHomeEvents({ commit }) {
    firebase
      .firestore()
      .collection("homeSponsor")
      .doc("homeSponsoredEvents")
      .get()
      .then((snapshot) => {
        const mainEvent = snapshot.data().mainCover.replace(/\s/g, "");
        const spotlight_1 = snapshot.data().spotlight_1.replace(/\s/g, "");
        const spotlight_2 = snapshot.data().spotlight_2.replace(/\s/g, "");
        const spotlight_3 = snapshot.data().spotlight_3.replace(/\s/g, "");
        //get main
        firebase
          .firestore()
          .collection("events")
          .doc(mainEvent)
          .get()
          .then((event) => {
            let ev = event.data();
            ev.id = event.id;
            commit("setSponsoredEvent", { event: "main", data: ev });
          });
        //get sponsor 1
        firebase
          .firestore()
          .collection("events")
          .doc(spotlight_1)
          .get()
          .then((event) => {
            let ev = event.data();
            ev.id = event.id;
            commit("setSponsoredEvent", { event: "spotlight_1", data: ev });
          });
        //get sponsor 2
        firebase
          .firestore()
          .collection("events")
          .doc(spotlight_2)
          .get()
          .then((event) => {
            let ev = event.data();
            ev.id = event.id;
            commit("setSponsoredEvent", { event: "spotlight_2", data: ev });
          });
        //get sponsor 3
        firebase
          .firestore()
          .collection("events")
          .doc(spotlight_3)
          .get()
          .then((event) => {
            let ev = event.data();
            ev.id = event.id;
            commit("setSponsoredEvent", { event: "spotlight_3", data: ev });
          });
      });
    firebase
      .firestore()
      .collection("events")
      .orderBy("createdAt", "desc")
      .limit(6)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let d = doc.data();
          d.id = doc.id;
          commit("setRecentEvents", d);
        });
      });
  },
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
