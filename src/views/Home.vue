<template>
  <v-container>
    <v-autocomplete chips multiple></v-autocomplete>

    <v-row justify="space-around">
      <v-col v-for="img of images" :key="img.id">
        <v-img :src="img.url"> </v-img>
      </v-col>
    </v-row>
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
          this.images.push({ id: doc.id, ...doc.data() });
        });
      });
  }
};
</script>
