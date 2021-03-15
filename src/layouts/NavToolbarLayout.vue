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
    <v-spacer />
    <full-screen-icon />
    <template v-slot:img="{ props }">
      <v-img v-bind="props" :src="toolbarBgImg"></v-img>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

import FullScreenIcon from '@ui/widgets/FullScreenIcon.vue';
import toolbarImg from '@ui/assets/images/toolbar_bg.jpg';
export default {
  name: 'NavToolbarLayout',
  components: {
    FullScreenIcon,
  },
  data() {
    return {
      toolbarBgImg: toolbarImg,
    };
  },
  computed: {
    ...mapGetters('ui', ['toolbarDense', 'drawerPosition']),
  },
};
</script>
<style></style>
