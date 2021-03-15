<template>
  <v-footer app :dense="toolbarDense">
    <v-container class="px-0 py-0">Footer</v-container>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppFootLayout',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('ui', ['toolbarDense']),
  },
};
</script>
<style></style>
