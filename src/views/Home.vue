<template>
  <list-view />
</template>

<script lang="ts">
  import ListView from "@/components/ListView.vue";
  import Vue from "vue";

  export default Vue.extend({
    name: "Home",

    components: {
      ListView,
    },
  });
</script>
