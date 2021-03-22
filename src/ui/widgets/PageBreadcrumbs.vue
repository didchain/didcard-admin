<template>
  <v-list dense class="qk-page-breadcrum">
    <v-list-item>
      <v-list-item-title>{{ pageTitle }}</v-list-item-title>
    </v-list-item>
    <v-divider v-if="!hideSplitor" />
  </v-list>
</template>

<script>
export default {
  name: 'PageBreadcrumbs',
  props: {
    pageTitle: {
      type: String,
      default: '',
    },
    hideSplitor: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style></style>
