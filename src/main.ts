import App from "@/App.vue";
import "@/filters";
import "@/plugins/axios";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import store from "@/store";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
