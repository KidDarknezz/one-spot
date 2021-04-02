import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore";
import "firebase/storage";

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
    payload.emailVerification = firebase.auth().currentUser.emailVerified;
    state.activeUser = payload;
  },
  setUserRole(state, payload) {
    state.activeUser.role = payload
  }
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
        firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
          if (idTokenResult.claims.isClient || idTokenResult.claims.isAdmin) router.push("/dashboard");
          else router.push("/");
        })
        commit("setLoadingStatus", false);
      })
      .catch((err) => {
        alert(err);
        commit("setLoadingStatus", false);
      });
  },
  logoutUser({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
        console.log("logout succesfull");
        commit("setActiveUser", null);
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
      .createUserWithEmailAndPassword(sanitizedEmail, payload.password)
      .catch((e) => {
        commit("setLoadingStatus", false);
        alert(e);
        return e;
      });
    if (resp.constructor.name == "E") return;
    await firebase
      .firestore()
      .collection("users")
      .doc(resp.user.uid)
      .set({
        name: payload.name,
        lastName: payload.lastName,
        email: payload.email,
        completeRegistration: false,
      });
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .catch((err) => {
        console.log(err);
      });
    commit("setLoadingStatus", false);
    router.push("/");
  },
  getUserData({ commit }) {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(
        (doc) => {
          commit("setActiveUser", doc.data());
          firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
            if (idTokenResult.claims.isClient) commit('setUserRole', 'client')
            if (idTokenResult.claims.isAdmin) commit('setUserRole', 'admin')
          })
        },
        (err) => {
          console.log(err);
        }
      );
  },
  async completeUserRegistration({ commit }, payload) {
    commit("setLoadingStatus", true);
    let pp = "";
    if (payload.profilePic != null) {
      pp = payload.profilePic.name;
      const storageRef = firebase
        .storage()
        .ref(
          `users-profile/${firebase.auth().currentUser.uid}/${
            payload.profilePic.name
          }`
        );
      await storageRef.put(payload.profilePic);
    }
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        completeRegistration: true,
        interests: payload.selectedCategories,
        profilePic: pp,
      });
    commit("setLoadingStatus", false);
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
