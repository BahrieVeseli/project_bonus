// app/firebase/firebase.js

// Importimi i Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCniTxiTOUtc0qv1BGlbCVnE8X6kjx4FTE",
  authDomain: "fir-ecfbf.firebaseapp.com",
  projectId: "fir-ecfbf",
  storageBucket: "fir-ecfbf.firebasestorage.app",
  messagingSenderId: "59661906063",
  appId: "1:59661906063:web:e905e5bd3d3319bae080fa",
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);

// Inicializo Auth
export const auth = getAuth(app);
