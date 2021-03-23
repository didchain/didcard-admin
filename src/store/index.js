import Vue from 'vue';
import Vuex from 'vuex';

import { APP_TITLE_NAME, DEFAULT_LOCALE } from './app-cnsts';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

//modules
import acc from './modules/acc';
import auth from './modules/auth';
import ui from './modules/ui';
import metamask from './modules/metamask';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    acc,
    auth,
    metamask,
    ui,
  },
  state: {
    accessToken: null,
    accessRole: null,
    locale: DEFAULT_LOCALE,
    appTitle: APP_TITLE_NAME,
  },
  actions,
  getters: {
    accessToken: (state) => state.accessToken,
    appTitle: (state) => state.appTitle,
    locale: (state) => state.locale,
    ...getters,
  },
  mutations,
});

export default store;
