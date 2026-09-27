import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDeWjaV57NS2yLgLfdwEanTFCF5-Y7fYS4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blockchain-82da7.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blockchain-82da7",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blockchain-82da7.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "773870568347",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:773870568347:web:7a16f4716525a56f83173e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EHR2D0DRNB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// Luôn cho người dùng chọn tài khoản Google
googleProvider.setCustomParameters({
  prompt: "select_account",
});