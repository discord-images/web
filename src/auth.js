import { auth } from "./firebase";

auth
  .signInWithEmailAndPassword("test@example.com", "test123qwe")
  .then(userCredential => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid);
  })
  .catch(error => {
    console.log(error);
  });
