<template>
  <div>
    <TinyBox
      v-model="lightbox"
      :images="$store.getters.imageUrls"
      :no-thumbs="true"
    ></TinyBox>

    <v-progress-circular
      :size="100"
      :width="10"
      color="primary"
      indeterminate
      v-if="!images"
      class="center mt-16"
    ></v-progress-circular>

    <v-row class="mt-8" v-else-if="images && images.length > 0">
      <v-col v-for="(img, idx) of images" :key="img.id">
        <v-card>
          <v-img :src="img.url" @click="lightbox = idx" height="500px"></v-img>

          <v-card-title>
            {{ imageName(img.url) }}
          </v-card-title>

          <v-card-subtitle>
            {{ img.caption }}
          </v-card-subtitle>

          <v-card-text>
            <v-chip-group>
              <v-chip v-for="l of img.labels" :key="l">
                {{ l }}
              </v-chip>
            </v-chip-group>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  v-if="img.text"
                  @click="copyToClipboard(img.text)"
                  color="secondary"
                  outlined
                >
                  <v-icon>mdi-clipboard-outline</v-icon>
                </v-btn>
              </template>
              <span>Copy text from Image</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info">No images found.</v-alert>
  </div>
</template>

<script>
import TinyBox from "vue-tinybox";

export default {
  name: "Home",

  components: {
    TinyBox,
  },

  data() {
    return {
      lightbox: null,
    };
  },

  mounted() {
    this.$store.dispatch("getImages");
  },

  computed: {
    images() {
      return this.$store.state.images;
    },

    imageName() {
      // the image filename taken from the url
      return (url) => {
        const n = url.lastIndexOf("/");
        return url.substring(n + 1);
      };
    },
  },

  methods: {
    copyToClipboard(val) {
      const el = document.createElement("textarea");
      el.value = val;
      document.body.appendChild(el);
      el.select();
      el.setSelectionRange(0, 999999);
      document.execCommand("copy");
      document.body.removeChild(el);
    },
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
