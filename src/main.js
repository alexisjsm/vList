import Vue from 'vue'
import App from './App.vue'
import { rtdbPlugin } from 'vuefire'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import eventBus from './components/plugins/event_bus'

import store from './store'

Vue.use(eventBus)

Vue.use(rtdbPlugin)

// fontAwesome Icon
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
