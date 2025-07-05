<!-- Layout principal de todas las rutas -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import app from '$lib/firebase';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/user';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { page } from '$app/stores';

  let role: string | null = null;

  // Obtiene el rol real del usuario desde Firestore
  $: if ($user) {
    (async () => {
      const db = getFirestore();
      try {
        const userDoc = await getDoc(doc(db, 'users', $user.uid));
        role = userDoc.exists() ? userDoc.data().rol : null;
      } catch (e) {
        role = null;
      }
    })();
  } else {
    role = null;
  }

  onMount(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (firebaseUser: any) => {
      user.set(firebaseUser);
      if (firebaseUser) {
        goto('/dashboard');
      } else {
        goto('/');
      }
    });
  });
</script>

  <div class="app-layout-flex">
    <Sidebar user={$user} {role} />
    <div class="app-main-area">
      <header class="header">
        <div class="header-container">
          <div class="header-logo">
            <h1 class="header-title">Araucaria App</h1>
          </div>

        </div>
      </header>
      <main class="main-content">
        <div class="content-container">
          <slot />
        </div>
      </main>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-content">
            <p class="footer-text">&copy; {new Date().getFullYear()} Araucaria App. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>

<style>
.app-layout-flex {
  display: flex;
  min-height: 100vh;
}
.app-main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
