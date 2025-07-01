<script lang="ts">
  import { user } from '$lib/stores/user';
  import { logout } from '$lib/stores/user';
  import { onMount } from 'svelte';

  let isOpen = false;
  let currentUser: any = null;

  onMount(() => {
    user.subscribe((userData) => {
      currentUser = userData;
    });
  });

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }
</script>

<div class="relative">
  <button
    on:click={toggleMenu}
    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="Menú de usuario"
    aria-haspopup="true"
    aria-expanded={isOpen}
  >
    <span>{currentUser?.displayName || 'Usuario'}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div
      role="menu"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
      on:click={closeMenu}
    >
      <button
        on:click={logout}
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Cerrar Sesión
      </button>
    </div>
  {/if}
</div>
