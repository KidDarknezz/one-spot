import Vue from 'vue'
import Vuex from 'vuex'

import authStore from './authStore'
import homeStore from './homeStore'
import eventStore from './eventStore'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      authStore,
      homeStore,
      eventStore
    },
    strict: process.env.DEV,
  });

  return Store;
}