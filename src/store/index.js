import Vue from "vue";
import Vuex from "vuex";

import db from "../plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    labels: []
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
    },
    changeLabels(state, updated) {
      state.labels = updated;
    }
  },
  actions: {
    getImages(context, { selected, sorting }) {
      let query = db.collection("images");
      // for (const sel of context.selected) {
      //   query = query.where(sel, ">", 0);
      // }
      // TODO sorting
      console.log(selected);
      console.log(sorting);

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
    getLabels(context) {
      db.collection("stats")
        .doc("labels")
        .get()
        .then(res => {
          context.commit("changeLabels", res.data());
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
