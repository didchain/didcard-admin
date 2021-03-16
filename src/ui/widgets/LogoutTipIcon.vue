<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on" @click="logoutHandle">
        <v-icon>
          {{ icons.logout }}
        </v-icon>
      </v-btn>
    </template>
    <span class="qk-icon-tip">
      {{ tips }}
    </span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LogoutTipIcon',
  props: {
    tips: {
      type: String,
      default: 'Logout',
    },
  },
  computed: {
    ...mapGetters('ui', ['icons']),
  },
  methods: {
    logoutHandle() {
      this.$router.replace({ path: '/signin' });
    },
  },
};
</script>
<style></style>
