<template>
  <v-navigation-drawer expand-on-hover dark app>
    <v-list>
      <router-link v-for="item in items" :key="item.title" :to="item.path">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    name: "SideNav",
    data: () => ({
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/" },
        { title: "About", icon: "mdi-help-box", path: "/about" },
      ],
    }),
  });
</script>

<style lang="scss" scoped>
  .v-navigation-drawer__content {
    a {
      text-decoration: none;
    }
  }
</style>
