<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Sorting />
        <Home />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import "./plugins/auth"; // FIXME temporary
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Sorting from "./components/Sorting.vue";

export default {
  name: "App",

  mounted() {
    this.$store.dispatch("getImages", {});
    this.$store.dispatch("getLabels");
  },

  components: { Header, Home, Sorting }
};
</script>
