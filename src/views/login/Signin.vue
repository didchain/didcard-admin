<template>
  <v-container>
    <v-btn @click="siginHandle">Home</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Signin',
  methods: {
    async siginHandle() {
      try {
        await this.$store.dispatch('login');
        await this.$router.replace({ path: '/' });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style></style>
