<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Sorting v-if="signedIn" />
        <Home v-if="signedIn" />
        <v-alert v-if="!signedIn" type="error">
          Please sign In on the top right to view the page.
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Sorting from "./components/Sorting.vue";

export default {
  name: "App",

  mounted() {
    this.$store.dispatch("getImages");
    this.$store.dispatch("getLabels");
  },

  components: { Header, Home, Sorting },

  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  }
};
</script>
