<template>
  <v-container>
    <TinyBox v-model="lightbox" :images="imageUrls" :no-thumbs="true"></TinyBox>

    <v-row>
      <v-col v-for="(img, idx) of images" :key="img.id">
        <v-card>
          <v-img :src="img.url" @click="lightbox = idx" height="500px"> </v-img>

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
import TinyBox from "vue-tinybox";

export default {
  name: "Home",
  components: {
    TinyBox
  },
  data() {
    return {
      lightbox: null,
      images: []
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
    imageUrls() {
      return this.images.map(x => x.url);
    },
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
