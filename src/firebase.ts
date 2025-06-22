// src/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyARSzqAh7GIYSGSyMNw133g_eVKyyIDUAo",
  authDomain: "araucaria-app.firebaseapp.com",
  databaseURL: "https://araucaria-app-default-rtdb.firebaseio.com",
  projectId: "araucaria-app",
  storageBucket: "araucaria-app.firebasestorage.app",
  messagingSenderId: "1093814528596",
  appId: "1:1093814528596:web:87441667747c5eabf39bc1",
  measurementId: "G-VB088W0VHR"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
