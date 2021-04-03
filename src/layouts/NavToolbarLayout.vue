<template>
  <v-app-bar
    app
    :dense="toolbarDense"
    prominent
    dark
    flat
    class="qk-toolbar"
    :clipped-left="drawerPosition !== 'right'"
    :clipped-right="drawerPosition === 'right'"
  >
    <v-app-bar-title class="qk-toolbar-warp">
      <div class="title-inner">{{ appTitle }}</div>
    </v-app-bar-title>
    <v-spacer />
    <home-tip-icon />
    <full-screen-icon />
    <logout-tip-icon />
    <template v-slot:img="{ props }">
      <v-img v-bind="props" :src="toolbarBgImg"></v-img>
    </template>

    <template v-slot:extension>
      <nav-toolbar-inner-menu />
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

import FullScreenIcon from '@ui/widgets/FullScreenIcon.vue';
import LogoutTipIcon from '@ui/widgets/LogoutTipIcon.vue';
import HomeTipIcon from '@ui/widgets/HomeTipIcon.vue';
import toolbarImg from '@ui/assets/images/banner_dark.png';
import NavToolbarInnerMenu from './navs/NavToolbarInnerMenu';

export default {
  name: 'NavToolbarLayout',
  components: {
    HomeTipIcon,
    FullScreenIcon,
    NavToolbarInnerMenu,
    LogoutTipIcon,
  },
  data() {
    return {
      toolbarBgImg: toolbarImg,
    };
  },
  computed: {
    ...mapGetters('ui', ['toolbarDense', 'drawerPosition']),
    ...mapGetters(['appTitle']),
  },
};
</script>
<style>
.qk-toolbar-warp {
  flex: 1 1 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
