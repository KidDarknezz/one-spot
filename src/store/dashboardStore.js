import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

import {
  geohashForLocation,
  geohashQueryBounds,
  distanceBetween,
} from "geofire-common";

import router from "@/router";

const state = {
  selectedEvent: null,
  loadingStatus: false,
  myEvents: [],
  clientsAccounts: [],
  adminsAccounts: [],
  onReviewEvents: [],
};
const mutations = {
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload;
  },
  setSelectedEvent(state, payload) {
    state.selectedEvent = payload;
  },
  setAllMyEvents(state, payload) {
    state.myEvents = payload;
  },
  setMyEvents(state, payload) {
    state.myEvents = payload;
  },
  setNewEvent(state, payload) {
    state.myEvents.push(payload);
  },
  setClientsAccounts(state, payload) {
    state.clientsAccounts = payload;
  },
  setAdminsAccounts(state, payload) {
    state.adminsAccounts = payload;
  },
  setOnReviewEvents(state, payload) {
    state.onReviewEvents = payload;
  },
};
const actions = {
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
  emptySelectedEvent({ commit }) {
    commit("setSelectedEvent", null);
  },
  updateEventStatus({ commit }, payload) {
    let updateValues = { status: payload.status };
    if (payload.status == "public") updateValues.publishedAt = Date.now();
    if (confirm("Deseas modificar el status de este evento?")) {
      commit("setLoadingStatus", true);
      firebase
        .firestore()
        .collection("events")
        .doc(payload.event)
        .update(updateValues)
        .then((resp) => {
          commit("setLoadingStatus", false);
          router.push("/review-events");
        });
    }
  },
  async createManagerAccount({ commit }, payload) {
    commit("setLoadingStatus", true);
    let accData = {
      email: payload.email,
      name: payload.name,
      password: payload.password,
      type: payload.type,
    };
    if (payload.profile) {
      let randomNum = Math.floor(1000 + Math.random() * 9000);
      accData.profile = `${randomNum}_${payload.profile.name}`;
      const storageRef = firebase
        .storage()
        .ref(`clients-profile/${accData.profile}`);
      await storageRef.put(payload.profile);
    } else {
      accData.profile = "";
    }
    commit("setLoadingStatus", false);
    const createAccount = firebase.functions().httpsCallable("createUser");
    createAccount(accData).then((result) => {
      console.log(result);
    });
  },
  getClientsAccounts({ commit }, payload) {
    let clients = [];
    firebase
      .firestore()
      .collection("users")
      .where("role", "==", "client")
      .get()
      .then((snapshot) => {
        snapshot.forEach((client) => {
          let c = client.data();
          c.id = client.id;
          clients.push(c);
        });
      });
    commit("setClientsAccounts", clients);
  },
  getOnReviewEvents({ commit }, payload) {
    let reviewEvents = [];
    firebase
      .firestore()
      .collection("events")
      .where("status", "==", "review")
      .get()
      .then((snapshot) => {
        snapshot.forEach((event) => {
          let e = event.data();
          e.id = event.id;
          reviewEvents.push(e);
        });
      });
    commit("setOnReviewEvents", reviewEvents);
  },
  getAdminsAccounts({ commit }, payload) {
    let admins = [];
    firebase
      .firestore()
      .collection("users")
      .where("role", "==", "admin")
      .get()
      .then((snapshot) => {
        snapshot.forEach((admin) => {
          let a = admin.data();
          a.id = admin.id;
          admins.push(a);
        });
      });
    commit("setAdminsAccounts", admins);
  },
  async createEvent({ commit }, payload) {
    if (confirm("Esta seguro que desea crear este evento?")) {
      commit("setLoadingStatus", true);
      const event = {
        name: payload.event.name,
        subtitle: payload.event.subtitle,
        description: payload.event.description,
        selectedCategories: payload.event.selectedCategories,
        dateAndTime: payload.event.dateAndTime,
        status: "review",
        flyer: payload.event.flyer.name,
        owner: firebase.auth().currentUser.uid,
        ownerName: payload.owner.name,
        ownerProfile: payload.owner.profile,
        place: payload.event.place,
        coords: payload.event.coords,
        geohash: geohashForLocation([
          payload.event.coords.lat,
          payload.event.coords.lng,
        ]),
      };
      const storageRef = firebase
        .storage()
        .ref(
          `events-assets/${firebase.auth().currentUser.uid}/${
            payload.event.flyer.name
          }`
        );
      await storageRef.put(payload.event.flyer);
      firebase
        .firestore()
        .collection("events")
        .add(event)
        .then((resp) => {
          event.id = resp.id;
          commit("setNewEvent", event);
          commit("setLoadingStatus", false);
        });
    }
  },
  getMyEvents({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    let events = [];
    firebase
      .firestore()
      .collection("events")
      .where("owner", "==", uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((event) => {
          let ev = event.data();
          ev.id = event.id;
          events.push(ev);
        });
        commit("setMyEvents", events);
      });
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
