import Vue from 'vue'
import Vuex from 'vuex'

import { dashboard } from './Modules/Board'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard: dashboard
  }
})
