import { auth } from "./firebase";
import store from "../store";

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch("setAuthStatus", true);
  } else {
    store.dispatch("setAuthStatus", false);
  }
});

export function login(mail, password) {
  console.log("login");
  auth
    .signInWithEmailAndPassword(mail, password)
    .then(userCredential => {
      var user = userCredential.user;
      console.log(user.uid);
    })
    .catch(error => {
      console.log(error);
    });
}

export function logout() {
  console.log("logout");
  auth
    .signOut()
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
}
