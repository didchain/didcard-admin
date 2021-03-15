import Vue from 'vue';
import Vuex from 'vuex';

import { APP_TITLE_NAME, DEFAULT_LOCALE } from './app-cnsts';
import actions from './app-cnsts';
import getters from './getters';
import mutations from './mutations';

//modules
import acc from './modules/acc';
import ui from './modules/ui';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    acc,
    ui,
  },
  state: {
    accessToken: null,
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
