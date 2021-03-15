<template>
  <v-navigation-drawer
    app
    fixed
    :value="navDrawerShow"
    :right="navDrawerRight"
    :clipped="true"
  >
    <nav-menus-box />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

import NavMenusBox from './navs/NavMenusBox.vue';
export default {
  name: 'NavDrawerLayout',
  components: {
    NavMenusBox,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('ui', ['navDrawerRight', 'navDrawerShow']),
  },
};
</script>
<style></style>
