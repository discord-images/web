<template>
  <v-card class="my-4">
    <v-card-title>Search</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="8">
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
            @click="selected.push(label)"
          >
            {{ label }}
          </v-chip>
        </v-col>
        <v-col md="4">
          <v-radio-group v-model="sorting">
            <v-radio label="sort by confidence" value="confidence"></v-radio>
            <v-radio label="sort by recently" value="recently"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="search()">go</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from "../plugins/firebase";

export default {
  name: "Sorting",

  data() {
    return {
      labels: {},
      selected: [],
      sorting: "confidence"
    };
  },

  mounted() {
    db.collection("stats")
      .doc("labels")
      .get()
      .then(res => {
        this.labels = res.data();
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    search() {
      this.$emit("search", this.selected, this.sorting);
    }
  },

  computed: {
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
