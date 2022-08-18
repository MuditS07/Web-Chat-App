import firebase from "firebase/app";
import "firebase/auth";

export const auth =firebase.initializeApp(  {
  apiKey: "AIzaSyCCRKY0vBLGkJep8BYVZsV_L8aSKMF9CLI",
  authDomain: "fir-chat-app-1e864.firebaseapp.com",
  projectId: "fir-chat-app-1e864",
  storageBucket: "fir-chat-app-1e864.appspot.com",
  messagingSenderId: "344112554119",
  appId: "1:344112554119:web:0be0e931a02f89cd331822"
}).auth();
