<template>
  <v-app>
    <side-nav />

    <v-app-bar app />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app />
  </v-app>
</template>

<script lang="ts">
  import Vue from "vue";
  import SideNav from "./SideNav.vue";

  export default Vue.extend({
    components: { SideNav },
    name: "Layout",
  });
</script>
