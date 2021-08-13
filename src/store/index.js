import Vue from "vue";
import Vuex from "vuex";

import db from "../plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    labels: [],
    selected: [],
    sorting: []
  },
  getters: {
    // all avilable image urls
    imageUrls(state) {
      return state.images.map(img => img._url);
    }
  },
  mutations: {
    changeImages(state, updated) {
      state.images = updated;
    }
  },
  actions: {
    getImages(context) {
      let query = db.collection("images");
      // for (const sel of context.selected) {
      //   query = query.where(sel, ">", 0);
      // }
      // TODO sorting

      query
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push({ _id: doc.id, ...doc.data() });
          });
          context.commit("changeImages", data);
        })
        .catch(error => console.log(error));
    },
    getLabels() {
      db.collection("stats")
        .doc("labels")
        .get()
        .then(res => {
          this.labels = res.data();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
