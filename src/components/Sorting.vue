<template>
  <v-card class="my-4">
    <v-card-title>Search</v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="8">
          <v-autocomplete
            :items="labels"
            v-model="selected"
            chips
            deletable-chips
            multiple
          ></v-autocomplete>
          <!-- Suggested:
          <v-chip-group>
            <v-chip>funny</v-chip>
          </v-chip-group> -->
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
export default {
  name: "Sorting",
  data() {
    return {
      labels: ["nature", "funny", "blank", "text", "hello"],
      selected: ["nature", "funny"],
      sorting: "confidence"
    };
  },
  methods: {
    search() {
      this.$emit("search", this.selected, this.sorting);
    }
  }
};
</script>
