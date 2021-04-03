<template>
  <v-container fluid class="qk-menus-toolbar px-0 py-0">
    <div class="u-box">
      <label for="username">当前登录用户:</label>
      <span class="username">adhhds</span>
      <label for="role">[角色:</label>
      <span class="role">admin]</span>
    </div>
    <v-spacer></v-spacer>
    <!-- <v-icon>mdi-home</v-icon> -->
  </v-container>
</template>

<script>
export default {
  name: 'NavToolbarInnerMenu',
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
