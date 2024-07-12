import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIIzt3RTmHZlr3rhv57ix03d4V-SilMuU",
  authDomain: "fir-app-5ad1d.firebaseapp.com",
  projectId: "fir-app-5ad1d",
  storageBucket: "fir-app-5ad1d.appspot.com",
  messagingSenderId: "207695719959",
  appId: "1:207695719959:web:2c71903ec2466d5a783652",
  measurementId: "G-QWCLZZTCK3",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
