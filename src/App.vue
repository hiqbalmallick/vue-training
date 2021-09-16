<template>
  <layout />
</template>

<script lang="ts">
  import Vue from "vue";
  import Layout from "./components/Layout.vue";

  export default Vue.extend({
    components: { Layout },
    name: "App",

    data: () => ({
      //
    }),
  });
</script>
