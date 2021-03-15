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
    <template v-slot:img="{ props }">
      <v-img v-bind="props" :src="toolbarBgImg"></v-img>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

import toolbarImg from '@ui/assets/images/toolbar_bg.jpg';
export default {
  name: 'NavToolbarLayout',
  components: {},
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
<style>
.qk-toolbar {
  color: #fff;
}
</style>
