import { writable } from 'svelte/store';
import { auth, db, getAuth, onAuthStateChanged, doc, getDoc } from '$lib';
import type { Usuario } from '../types';
import type { User } from 'firebase/auth';

interface UserState extends Partial<Usuario> {
  loading: boolean;
  error: string | null;
}

export const user = writable<UserState>({
  uid: null,
  email: null,
  displayName: null,
  rol: null,
  colegioId: null,
  hijos: [],
  loading: false,
  error: null
});

// Función para manejar el estado de autenticación
export function setupAuthListener() {
  onAuthStateChanged(auth, async (authUser) => {
    try {
      if (authUser) {
        // Usuario está autenticado
        const userDocRef = doc(db, 'usuarios', authUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as Usuario;
          user.set({
            ...userData,
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            loading: false,
            error: null
          });
        } else {
          // Usuario existe en Firebase pero no en la base de datos
          user.set({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            rol: null,
            colegioId: null,
            hijos: [],
            loading: false,
            error: 'Usuario no encontrado en la base de datos'
          });
        }
      } else {
        // Usuario no está autenticado
        user.set({
          uid: null,
          email: null,
          displayName: null,
          rol: null,
          colegioId: null,
          hijos: [],
          loading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      user.set({
        uid: null,
        email: null,
        displayName: null,
        rol: null,
        colegioId: null,
        hijos: [],
        loading: false,
        error: 'Error al cargar los datos del usuario'
      });
    }
  });
}

// Funciones auxiliares
export const setLoading = (isLoading: boolean) => {
  user.update(state => ({
    ...state,
    loading: isLoading
  }));
};

export const setError = (error: string | null) => {
  user.update(state => ({
    ...state,
    error,
    loading: false
  }));
};

// Función para hacer logout
export async function logout() {
  try {
    await auth.signOut();
    user.set({
      uid: null,
      email: null,
      displayName: null,
      rol: null,
      colegioId: null,
      hijos: [],
      loading: false,
      error: null
    });
  } catch (error) {
    console.error('Error al hacer logout:', error);
    setError('Error al cerrar sesión');
  }
}
