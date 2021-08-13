import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Tinybox from "vue-tinybox";

Vue.config.productionTip = false;

Vue.use(Tinybox);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
