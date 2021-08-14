<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>Discord Images</v-app-bar-title>
    <v-spacer></v-spacer>
    <div v-if="signedIn">
      <v-btn text @click="signOut()">
        <span class="mr-2">Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn text @click="signIn()">
        <span class="mr-2">Sign In</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { logout, login } from "../plugins/auth";

export default {
  name: "Header",

  methods: {
    signOut() {
      logout();
    },
    signIn() {
      login("test@example.com", "test123qwe");
    }
  },

  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  }
};
</script>
