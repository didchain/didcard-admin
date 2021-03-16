<template>
  <v-list dense light>
    <v-list-item>
      <v-list-item-avatar
        class="qk-logo"
        size="32"
        @click.stop="toggleNavHandle"
      >
        <v-img :src="didIcon"></v-img>
      </v-list-item-avatar>
      <v-list-item-title v-if="!!title">
        {{ title }}
      </v-list-item-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="minifyNavHandle">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
import didIcon from '@ui/assets/icons/did_icon.png';
export default {
  name: 'NavDrawerHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      didIcon,
    };
  },
  computed: {
    ...mapGetters('ui', ['icon', 'navMini']),
  },
  methods: {
    minifyNavHandle() {
      const state = this.navMini;
      this.$store.dispatch('ui/toggleNavMini', !state);
    },
    toggleNavHandle() {
      const state = this.navMini;
      this.$store.dispatch('ui/toggleNavMini', !state);
    },
  },
};
</script>
<style>
.qk-logo:hover {
  cursor: pointer;
}
</style>
