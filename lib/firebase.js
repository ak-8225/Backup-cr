// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoKJt8ety4aNMpRS0mKhjV6aC8gVMMJhQ",
  authDomain: "college-recommendation-app.firebaseapp.com",
  projectId: "college-recommendation-app",
  storageBucket: "college-recommendation-app.firebasestorage.app",
  messagingSenderId: "288021056027",
  appId: "1:288021056027:web:b1d1d0706a723fd70986be",
  measurementId: "G-3NP6KHBTZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Analytics (will only work in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error("Analytics failed to initialize:", error);
  }
}

export { db };
