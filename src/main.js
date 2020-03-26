import Vue from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import eventBus from './components/plugins/event_bus'

import store from './store/store.js'

import buefy from 'buefy'
import 'buefy/dist/buefy.css'

// fontAwesome Icon
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas'
})

Vue.use(eventBus)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
