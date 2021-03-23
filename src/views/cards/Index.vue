<template>
  <div class="qk-main-content">
    <page-breadcrumbs page-title="卡片列表" />
    <v-container>
      <v-btn @click="test">test</v-btn>
    </v-container>
  </div>
</template>

<script>
import PageBreadcrumbs from '@/ui/widgets/PageBreadcrumbs.vue';

import { getRandom } from '@/libs/api/did-api.js';
export default {
  name: 'CardIndex',
  components: {
    PageBreadcrumbs,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    async test() {
      const response = await getRandom();
      console.log(response);
    },
  },
};
</script>
<style></style>
