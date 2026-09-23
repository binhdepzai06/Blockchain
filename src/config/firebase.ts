import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeWjaV57NS2yLgLfdwEanTFCF5-Y7fYS4",
  authDomain: "blockchain-82da7.firebaseapp.com",
  projectId: "blockchain-82da7",
  storageBucket: "blockchain-82da7.firebasestorage.app",
  messagingSenderId: "773870568347",
  appId: "1:773870568347:web:7a16f4716525a56f83173e",
  measurementId: "G-EHR2D0DRNB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// Luôn cho người dùng chọn tài khoản Google
googleProvider.setCustomParameters({
  prompt: "select_account",
});