// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import './style_custom.scss'



Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueRouter)
// https://docs.sentry.io/clients/javascript/integrations/vue/
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

// A darker shade of magic.
// Relies on WebpackDefinePlugin that's used by the vue-cli template to pass config values from config/xxx.env.js
// That's passed in process.env. When it's not there it's A STRING 'undefined'. Wat.
if(process.env.SENTRY_DSN !== 'undefined' && process.env.SENTRY_DSN !== undefined) {
Raven
  .config(process.env.SENTRY_DSN, {
    release: process.env.COMMIT_HASH || 'release not set. Fail.'
  })
  .addPlugin(RavenVue, Vue)
  .install()
}

// window.Raven = Raven
// Raven.debug = true

import App from './App'

import router from "./router";



/* eslint-disable no-new */
export const myApp = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
