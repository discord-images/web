<template>
  <div>
    <TinyBox v-model="lightbox" :images="$store.getters.imageUrls" :no-thumbs="true"></TinyBox>

    <v-row class="mt-8">
      <v-col v-for="(img, idx) of images" :key="img._id">
        <v-card>
          <v-img :src="img._url" @click="lightbox = idx" height="500px"></v-img>

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
  </div>
</template>

<script>
import TinyBox from "vue-tinybox";

export default {
  name: "Home",

  components: {
    TinyBox
  },

  data() {
    return {
      lightbox: null
    };
  },

  computed: {
    images() {
      return this.$store.state.images;
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
