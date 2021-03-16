<template>
  <v-list dense light>
    <template v-for="(menu, idx) in navMenus">
      <v-list-item
        v-if="!menu.children || !menu.children.length"
        :key="'_nav_' + idx"
        :to="menu.path"
      >
        <v-list-item-icon v-if="!!menu.icon">
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-if="!!menu.title">
          {{ menu.title }}
        </v-list-item-title>
      </v-list-item>
      <v-list-group
        v-else-if="menu.children.length"
        :key="'_navg_' + idx"
        no-action
        :value="idx === 0"
        :prepend-icon="menu.icon"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </template>
        <v-list-item
          v-for="(m, i) in menu.children"
          :key="'_subnav__' + i"
          :inactive="$route.path === m.path"
          :to="m.path"
        >
          <v-list-item-title class="ps-0">{{ m.title }}</v-list-item-title>
          <v-list-item-icon v-if="!!m.icon">
            <v-icon small>{{ m.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavMenusBox',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('auth', ['navMenus', 'navEmpty']),
    curPath() {
      return this.$route.path;
    },
  },
  mounted() {
    console.log(this.navMenus);
  },
  methods: {
    navToPage(path) {
      if (path && path !== this.$route.path) {
        this.$router.push({ path });
      }
    },
  },
};
</script>
<style></style>
