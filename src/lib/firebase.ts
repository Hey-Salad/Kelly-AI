import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYpdpZw8X56hEwrV9TT_vfw4-rfXnK7SY",
  authDomain: "heysalad-app.firebaseapp.com",
  projectId: "heysalad-app",
  storageBucket: "heysalad-app.firebasestorage.app",
  messagingSenderId: "460868959248",
  appId: "1:460868959248:web:c4002969fe9aa525321e95",
  measurementId: "G-Z4JE6WN6P0"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);