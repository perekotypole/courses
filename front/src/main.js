import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faTimes, faCheck, faEdit, faPlus,
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faTimes)
library.add(faCheck)
library.add(faEdit)
library.add(faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueApollo)

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app')
