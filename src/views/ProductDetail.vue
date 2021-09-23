<template>
  <v-skeleton-loader :loading="loading">
    <v-img
      :lazy-src="productValue.image"
      max-height="150"
      max-width="250"
      :src="productValue.image"
    ></v-img>
  </v-skeleton-loader>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "ProductDetail",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["productValue"]),
  },
  created() {
    this.loading = true;
    this.getProductById(this.$router.currentRoute.params.id);
    this.loading = false;
  },
  methods: {
    ...mapActions(["getProductById"]),
  },
});
</script>
