<template>
  <v-container fluid>
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'AppMainLayout',
};
</script>
<style></style>
