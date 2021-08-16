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
    <div v-else class="d-inline-flex mt-6">
      <v-text-field
        dense
        solo
        light
        label="Password"
        v-model="password"
        type="password"
      ></v-text-field>
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

  data() {
    return {
      password: ""
    };
  },

  methods: {
    signOut() {
      logout();
    },
    signIn() {
      login("user@example.com", this.password);
    }
  },

  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    }
  }
};
</script>
