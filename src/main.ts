import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { createStore } from './store/store'

Vue.config.productionTip = false

Vue.filter(
  'currency',
  function (value: number, currency = 'USD', lang = 'en-US') {
    const formatter = new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })

    value = value / 100
    return formatter.format(value)
  }
)

Vue.use(Vuex)

const store = createStore()

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
