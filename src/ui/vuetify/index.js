import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';

import Vuetify, { VLayout } from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

const vuetifyOpts = {
  theme: {
    options: {},
    dark: false,
    themes: {
      light: {
        primary: '#458AF9',
        bpgray: '#8C9092',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
};

Vue.use(Vuetify, {
  components: {
    VLayout,
  },
});

const vuetify = new Vuetify(vuetifyOpts);

export default vuetify;
