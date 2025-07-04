import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

// Verificar si ya existe una instancia de Firebase
const existingApps = getApps();
let app = existingApps[0];

// Si no existe, inicializar una nueva instancia
if (!app) {
  app = initializeApp(firebaseConfig);
}

// Exportar servicios
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export { getAuth, onAuthStateChanged } from 'firebase/auth';
export { getFirestore, doc, getDoc } from 'firebase/firestore';

export default app;
