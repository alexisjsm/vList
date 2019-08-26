import Vue from 'vue'
import App from './App.vue'
import eventBus from './components/plugins/event_bus'

Vue.use(eventBus)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
