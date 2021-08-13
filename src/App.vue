<template>
  <v-app>
    <Header />
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import "./auth"; // FIXME temporary
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";

export default {
  components: { Header, Home },
  name: "App"
};
</script>
