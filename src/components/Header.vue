<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-title>Discord Images</v-app-bar-title>
    <v-spacer></v-spacer>
    <span>TODO auth</span>
    <v-btn text>
      <div v-if="signedIn">
        <span class="mr-2">Sign Out</span>
        <v-icon>mdi-logout</v-icon>
      </div>
      <div v-else>
        <span class="mr-2">Sign In</span>
        <v-icon>mdi-account</v-icon>
      </div>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      signedIn: true
    };
  }
};
</script>
