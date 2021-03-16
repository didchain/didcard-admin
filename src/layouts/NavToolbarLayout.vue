<template>
  <v-app-bar
    app
    :dense="toolbarDense"
    prominent
    light
    flat
    class="qk-toolbar"
    :clipped-left="drawerPosition !== 'right'"
    :clipped-right="drawerPosition === 'right'"
  >
    <v-app-bar-title class="qk-toolbar-warp">
      <div class="title-inner">{{ appTitle }}</div>
    </v-app-bar-title>
    <v-spacer />
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
import toolbarImg from '@ui/assets/images/toolbar_bg.jpg';
import NavToolbarInnerMenu from './navs/NavToolbarInnerMenu';

export default {
  name: 'NavToolbarLayout',
  components: {
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
