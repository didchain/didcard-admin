<template>
  <div class="qk-main-content">
    <page-breadcrumbs page-title="首页" />
    <v-container>
      <div>
        <h1 class="text-center">欢迎使用XXX系统</h1>
      </div>
      <div>
        <h4>当前登录用户:</h4>
        <span>{{ username }}</span>
      </div>
      <div>
        <h5>当前用户权限角色:</h5>
        <span>{{ accessRole }}</span>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PageBreadcrumbs from '@/ui/widgets/PageBreadcrumbs.vue';
export default {
  name: 'HomeIndex',
  components: {
    PageBreadcrumbs,
  },
  computed: {
    ...mapGetters(['accessRole']),
    ...mapGetters('acc', ['username']),
  },
};
</script>
<style></style>
