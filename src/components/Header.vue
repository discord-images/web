<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>Discord Images</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="signOut()">
      <span class="mr-2">Sign Out</span>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { logout } from "../plugins/auth";

export default {
  name: "Header",

  methods: {
    signOut() {
      logout();
    }
  }
};
</script>
