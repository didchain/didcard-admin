<template>
  <v-navigation-drawer
    app
    fixed
    light
    :value="navDrawerShow"
    :right="navDrawerRight"
    :clipped="true"
    :mini-variant.sync="mini"
  >
    <nav-drawer-header title="导航" />
    <v-divider></v-divider>
    <nav-menus-box />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

import NavMenusBox from './navs/NavMenusBox.vue';
import NavDrawerHeader from './navs/NavDrawerHeader';
export default {
  name: 'NavDrawerLayout',
  components: {
    NavMenusBox,
    NavDrawerHeader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('ui', ['navDrawerRight', 'navDrawerShow', 'navMini']),
    mini: {
      get: function () {
        return this.navMini;
      },
      set: function (val) {
        this.$store.dispatch('ui/toggleNavMini', val);
      },
    },
  },
};
</script>
<style></style>
