<template>
  <div class="qk-main-content">
    <page-breadcrumbs page-title="首页" />
    <v-container>
      <div>
        <h1 class="text-center">欢迎使用区块链登录授权系统</h1>
      </div>
      <div>
        <h4>当前登录用户:</h4>
      </div>
      <div>
        <h5>当前用户权限角色:</h5>
      </div>
    </v-container>
  </div>
</template>

<script>
import PageBreadcrumbs from '@/ui/widgets/PageBreadcrumbs.vue';
export default {
  name: 'HomeIndex',
  components: {
    PageBreadcrumbs,
  },
};
</script>
<style></style>
