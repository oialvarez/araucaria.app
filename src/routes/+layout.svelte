<script lang="ts">
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
          // Redirigir al dashboard si está autenticado
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

<div class="min-h-screen bg-gray-100">
  {#if isInitialized}
    {#if currentUser}
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Araucaria App</h1>
            </div>
            <div class="flex items-center">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
    {/if}
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <slot />
      </div>
    </main>
  {/if}
</div>
