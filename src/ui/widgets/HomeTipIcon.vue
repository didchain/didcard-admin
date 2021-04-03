<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on" @click="goHomeHandle">
        <v-icon>
          {{ icons.home }}
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
  name: 'HomeTipIcon',
  props: {
    tips: {
      type: String,
      default: 'Home',
    },
  },
  computed: {
    ...mapGetters('ui', ['icons']),
  },
  methods: {
    goHomeHandle() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
<style></style>
