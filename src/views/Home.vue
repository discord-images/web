<template>
  <v-container>
    <v-row>
      <v-col v-for="img of images" :key="img.id">
        <v-card>
          <v-img :src="img.url" height="500px"> </v-img>

          <v-card-title>
            {{ imageName(img.url) }}
          </v-card-title>

          <v-card-text>
            <v-chip v-for="l in confidentTags(img.labels)" :key="l.value">
              {{ l.label }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "../firebase";
import "../auth"; // FIXME temporary

export default {
  name: "Home",
  data() {
    return {
      images: [],
      labels: []
    };
  },
  mounted() {
    // get some data initially
    db.collection("images")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.images.push({ id: doc.id, ...doc.data() });
        });
      });
  },
  computed: {
    imageName() {
      return url => {
        const n = url.lastIndexOf("/");
        return url.substring(n + 1);
      };
    },
    confidentTags() {
      return labels => {
        let r = [];
        for (const lab in labels) {
          r.push({
            label: lab,
            value: labels[lab]
          });
        }
        return r;
      };
    }
  }
};
</script>
