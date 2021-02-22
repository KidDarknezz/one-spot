import Vue from 'vue'
import Vuex from 'vuex'

import authStore from './authStore'
import homeStore from './homeStore'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      authStore,
      homeStore
    },
    strict: process.env.DEV,
  });

  return Store;
}