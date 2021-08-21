import Vue from "vue";
import Vuex from "vuex";

import db from "../plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    labels: [],
    signedIn: false
  },

  getters: {
    imageUrls(state) {
      // all avilable image urls
      return state.images.map(img => img.url);
    }
  },

  mutations: {
    changeImages(state, updated) {
      state.images = updated;
    },

    changeLabels(state, updated) {
      state.labels = updated;
    },

    changeAuthStatus(state, updated) {
      console.log("auth status", updated);
      state.signedIn = updated;
    }
  },

  actions: {
    getImages(context, selected = []) {
      let query = db.collection("images").orderBy("time", "desc");

      if (selected.length > 0) {
        query = query.where(
          "labels",
          "array-contains-any",
          selected.slice(0, 10)
        );
      }

      query
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
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
    },

    setAuthStatus(context, authStatus) {
      context.commit("changeAuthStatus", authStatus);
    }
  }
});
