<template>
  <v-card class="my-4">
    <v-card-title>Search</v-card-title>
    <v-card-text>
      <v-autocomplete
        :items="allLabels"
        v-model="selected"
        chips
        deletable-chips
        multiple
      ></v-autocomplete>
      Suggested:
      <v-chip
        v-for="label in popularLabels"
        :key="label"
        class="mx-1"
        @click="addToSelected(label)"
      >
        {{ label }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="search()">go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Sorting",

  data() {
    return {
      selected: []
    };
  },

  mounted() {
    this.$store.dispatch("getLabels");
  },

  methods: {
    search() {
      this.$store.dispatch("getImages", this.selected);
    },
    addToSelected(item) {
      if (!this.selected.includes(item)) {
        this.selected.push(item);
      }
    }
  },

  computed: {
    labels() {
      return this.$store.state.labels;
    },
    popularLabels() {
      return Object.keys(
        Object.fromEntries(
          Object.entries(this.labels)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
        )
      );
    },
    allLabels() {
      return Object.keys(this.labels);
    }
  }
};
</script>
