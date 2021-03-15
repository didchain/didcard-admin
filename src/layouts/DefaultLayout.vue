<template>
  <v-app>
    <nav-toolbar-layout />
    <nav-drawer-layout />
    <v-main>
      <app-main-layout />
    </v-main>
    <app-foot-layout />
  </v-app>
</template>

<script>
import NavToolbarLayout from './NavToolbarLayout';
import NavDrawerLayout from './NavDrawerLayout';
import AppMainLayout from './AppMainLayout';
import AppFootLayout from './AppFootLayout';
export default {
  name: 'DefaultLayout',
  components: {
    NavToolbarLayout,
    NavDrawerLayout,
    AppMainLayout,
    AppFootLayout,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
<style></style>
