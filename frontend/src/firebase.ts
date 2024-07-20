// firebase.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAYdcib2z5IW5QzfomPmh_RSdcPmf-Xx-Y",
  authDomain: "bytesync-57d73.firebaseapp.com",
  projectId: "bytesync-57d73",
  storageBucket: "bytesync-57d73.appspot.com",
  messagingSenderId: "554899894524",
  appId: "1:554899894524:web:e91e44575fea4c6be7a779",
  measurementId: "G-QBK6NDFB4Q",
};

const app = initializeApp(firebaseConfig);

export { app };
