<template>
  <v-footer app :dense="toolbarDense">
    <div class="qk-footer">
      <div class="mid-message-wrapper">欢迎使用</div>
      <div class="right-logo-wrapper">访问量</div>
    </div>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppFootLayout',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('ui', ['toolbarDense']),
  },
};
</script>
<style lang="sass">
.qk-footer
  flex: 1 1 100%
  color: $footerColor
  display: flex
  flex-direction: row
  .mid-message-wrapper
    flex: 1 1 auto
    text-align: center
  .right-logo-wrapper
    flex: 0 0 220px
    color: blue
    text-align: right
</style>
<style></style>
