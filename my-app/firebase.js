// app/firebase/firebase.js

// Importimi i Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCniTxiTOUtc0qv1BGlbCVnE8X6kjx4FTE",
  authDomain: "fir-ecfbf.firebaseapp.com",
  projectId: "fir-ecfbf",
  storageBucket: "fir-ecfbf.firebasestorage.app",
  messagingSenderId: "59661906063",
  appId: "1:59661906063:web:e905e5bd3d3319bae080fa",
};
const app = initializeApp(firebaseConfig);

// ✅ përdor platform check
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth };
