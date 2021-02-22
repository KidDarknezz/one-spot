import Vue from 'vue'
import Vuex from 'vuex'

import authStore from './authStore'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      authStore
    },
    strict: process.env.DEV,
  });

  return Store;
}