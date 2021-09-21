<template>
  <div name="snackbars">
    <v-snackbar
      v-model="show"
      :color="color"
      :timeout="timeout"
      top="top"
      rounded="pill"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/SHOW_MESSAGE") {
        this.text = state.snackbar.text;
        this.color = state.snackbar.color;
        this.timeout = state.snackbar.timeout;
        this.show = true;
      }
    });
  },
  data() {
    return {
      show: false,
      color: "",
      text: "",
      timeout: 0,
    };
  },
};
</script>

<style lang="scss">
div.v-snack__content {
  text-align: center;
}
</style>
