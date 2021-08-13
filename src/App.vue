<template>
  <v-app>
    <Header />
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import "./plugins/auth"; // FIXME temporary
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",

  components: { Header, Home }
};
</script>
