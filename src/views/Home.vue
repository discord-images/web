<template>
  <v-container>
    <v-autocomplete chips multiple></v-autocomplete>
  </v-container>
</template>

<script>
import db from "../firebase";

export default {
  name: "Home",
  data() {
    return {
      images: []
    };
  },
  mounted() {
    db.collection("images")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  }
};
</script>
