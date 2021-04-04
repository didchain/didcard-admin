<template>
  <v-app>
    <div class="single-main">
      <v-main>
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'SinglePageLayout',
};
</script>
<style>
.single-main {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: rgba(87, 127, 76, 1);
  background: -webkit-linear-gradient(-135deg, #fff, #96d3c1);
  background: -o-linear-gradient(-135deg, #fff, #96d3c1);
  background: -moz-linear-gradient(-135deg, #fff, #96d3c1);
  background: linear-gradient(-135deg, #fff, #96d3c1);
}
</style>
