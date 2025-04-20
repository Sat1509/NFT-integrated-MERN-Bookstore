
// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID, // 🔥 REQUIRED FIELD (missing in your config)
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_APPID,
  // databaseURL: import.meta.env.VITE_DATABASE_URL // Optional if using Realtime DB
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configure auth persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // Persist auth state across page reloads

export { auth, app }; // Export app instance for other services
