import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTNjVSFxWMyMCCEC79Zg7JPFcAJ2V767o",
  authDomain: "discord-images.firebaseapp.com",
  projectId: "discord-images",
  storageBucket: "discord-images.appspot.com",
  messagingSenderId: "561420974982",
  appId: "1:561420974982:web:206d2e5a8a4f3529aa0a07"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

// var db = firebase.firestore();
// var auth = firebase.auth();

// export default { db, auth };
