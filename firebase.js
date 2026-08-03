import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApBYRE5XBtmfwmRNafAJ4fMjhBwbWHi74",
  authDomain: "lifelink-cc967.firebaseapp.com",
  projectId: "lifelink-cc967",
  storageBucket: "lifelink-cc967.firebasestorage.app",
  messagingSenderId: "865218137075",
  appId: "1:865218137075:web:e37457fc59cb70904b2086"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };