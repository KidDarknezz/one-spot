import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore";

import router from "@/router";

const state = {
  loadingStatus: false,
  activeUser: null,
};
const mutations = {
  setLoadingStatus(state, payload) {
    state.loadingStatus = payload;
  },
  setActiveUser(state, payload) {
    state.activeUser = payload;
  },
};
const actions = {
  loginUser({ commit }, payload) {
    commit("setLoadingStatus", true);
    firebase
      .auth()
      .signInWithEmailAndPassword(
        payload.email.replace(/\s/g, ""),
        payload.password
      )
      .then((resp) => {
        router.push("/");
        commit("setLoadingStatus", false);
      })
      .catch((err) => {
        alert(err);
      });
  },
  logoutUser({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout succesfull");
        commit("setActiveUser", null);
        router.replace("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async registerUser({ commit }, payload) {
    let sanitizedEmail = payload.email.replace(/\s/g, "");
    commit("setLoadingStatus", true);
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(sanitizedEmail, payload.password);
    await firebase
      .firestore()
      .collection("users")
      .doc(resp.user.uid)
      .set({
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        emailVerification: false,
        completeRegistration: false,
      });
    commit("setLoadingStatus", false);
    router.push("/");
  },
  getUserData({ commit }) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        commit("setActiveUser", doc.data());
      });
  },
  completeUserRegistration({}, payload) {
    console.log("finishing");
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({ completeRegistration: true });
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
