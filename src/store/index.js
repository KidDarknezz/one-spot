import Vue from 'vue'
import Vuex from 'vuex'

import authStore from './authStore'
import homeStore from './homeStore'
import dashboardStore from './dashboardStore'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      authStore,
      homeStore,
      dashboardStore
    },
    strict: process.env.DEV,
  });

  return Store;
}