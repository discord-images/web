<template>
  <v-container>
    <TinyBox v-model="lightbox" :images="imageUrls" :no-thumbs="true"></TinyBox>

    <Sorting @search="getImages(selected, sorting)" />

    <v-row class="mt-8">
      <v-col v-for="(img, idx) of images" :key="img._id">
        <v-card>
          <v-img :src="img._url" @click="lightbox = idx" height="500px">
          </v-img>

          <v-card-title>
            {{ imageName(img._url) }}
          </v-card-title>

          <v-card-text>
            <v-chip-group>
              <v-chip v-for="l of confidentTags(img)" :key="l.value">
                {{ l.label }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "../firebase";
import TinyBox from "vue-tinybox";
import Sorting from "./Sorting.vue";

export default {
  name: "Home",
  components: {
    TinyBox,
    Sorting
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
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.images.push({ _id: doc.id, ...doc.data() });
        });
      });
  },
  methods: {
    getImages(selected, sorting) {
      let query = db.collection("images");
      for (const sel of selected) {
        query = query.where(sel, ">", 0);
      }
      console.log("TODO sorting  " + sorting);

      query
        .get()
        .then(res => console.log(res.data()))
        .catch(error => console.log(error));
    }
  },
  computed: {
    // all avilable image urls (for tinybox)
    imageUrls() {
      return this.images.map(img => img._url);
    },
    // the image filename taken from the url
    imageName() {
      return url => {
        const n = url.lastIndexOf("/");
        return url.substring(n + 1);
      };
    },
    // all tags of an image with a confidence higher than .9
    confidentTags() {
      return img => {
        let r = [];
        const keys = Object.keys(img).filter(x => !x.startsWith("_"));
        for (const label of keys) {
          if (img[label] > 0.9) {
            r.push({
              label: label,
              value: img[label]
            });
          }
        }
        return r;
      };
    }
  }
};
</script>
