import Vue from 'vue';
import App from './App';
import router from './router';

import vuetify from './ui/vuetify';

import Toast from './ui/toast/index';

import store from './store';

// import axiosProxy from './libs/api/axios-proxy';
// import Web3 from 'web3';
// global.Web3 = Web3;

// Vue.prototype.$http = axiosProxy;

Vue.config.productionTip = false;

Vue.use(Toast);

//
// store.dispatch('metamask/checkMetaMaskEnv');

const admin = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

global.$app = admin;
