<!-- Layout principal de todas las rutas -->
<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import app from '$lib/firebase';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/user';
  import UserMenu from '$lib/components/UserMenu.svelte';
  import { page } from '$app/stores';

  let auth: ReturnType<typeof getAuth>;
  let currentUser: any = null;
  let isInitialized = false;

  // Inicializar Firebase y Auth
  onMount(async () => {
    try {
      // Esperar a que Firebase esté completamente inicializado
      await new Promise(resolve => setTimeout(resolve, 1000));
      auth = getAuth(app);
      isInitialized = true;

      // Detectar cambios en la autenticación
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currentUser = user;
          // Redirigir al dashboard si está autenticado, excepto si está en la página de inicio
          if ($page.url.pathname === '/login' || $page.url.pathname === '/register') {
            goto('/dashboard');
          }
        } else {
          currentUser = null;
          // Redirigir a la ruta raíz si no está autenticado
          if ($page.url.pathname !== '/' && $page.url.pathname !== '/login' && $page.url.pathname !== '/register') {
            goto('/');
          }
        }
      });
    } catch (error) {
      console.error('Error al inicializar Firebase:', error);
    }
  });

  // Redirigir a la página de inicio si no hay sesión
  $: {
    if (isInitialized) {
      const userData = $user;
      if (!userData.uid && !userData.loading) {
        goto('/');
      }
    }
  }
</script>

{#if isInitialized}
  <div class="app-layout">
    <header class="header">
      <div class="header-container">
        <div class="header-logo">
          <h1 class="header-title">Araucaria App</h1>
        </div>
        {#if currentUser}
          <div class="header-user">
            <UserMenu />
          </div>
        {/if}
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
{/if}

