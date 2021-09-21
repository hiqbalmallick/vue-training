<template>
  <v-app>
    <side-nav />

    <v-app-bar app>
      <v-spacer />
      <v-btn icon>
        <v-badge overlap :content="cart.length ? cart.length : '0'">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app />
    <snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import SideNav from "./SideNav.vue";
import Snackbar from "./Snackbar.vue";

export default Vue.extend({
  components: { SideNav, Snackbar },
  computed: { ...mapState(["cart"]) },
  name: "Layout",
});
</script>
