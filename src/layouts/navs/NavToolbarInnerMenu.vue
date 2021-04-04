<template>
  <v-container fluid class="qk-menus-toolbar px-0 py-0">
    <div class="u-box">
      <label for="username">当前登录用户:</label>
      <span class="username">{{ username }}</span>
      <label for="role">[角色:</label>
      <span class="role">{{ accessRole }}]</span>
    </div>
    <v-spacer></v-spacer>
    <!-- <v-icon>mdi-home</v-icon> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavToolbarInnerMenu',
  computed: {
    ...mapGetters(['accessRole']),
    ...mapGetters('acc', ['username']),
  },
};
</script>
<style>
.qk-menus-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.u-box * {
  font-size: 0.85rem;
}
</style>
