<script lang="ts">
  import { getContext, get, onMount } from 'svelte';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import type { Aviso, Confirmacion } from '$lib/types';
  import { user } from '$lib/stores/user';
  import Avatar from '$lib/components/ui/Avatar.svelte';

  export let aviso: Aviso;
  export let onConfirm: (avisoId: string) => void;
  export let className = '';

  // Helper para manejar strings
  function getSafeString(value: string | null): string {
    return value || '';
  }

  let confirmacion: Confirmacion | null = null;
  let isLoading = false;
  const db = getFirestore();
  let userUid: string | null = null;

  // Obtener el UID del usuario
  onMount(() => {
    const currentUser = get(user);
    userUid = currentUser?.uid || null;
    loadConfirmacion();
  });

  async function loadConfirmacion() {
    if (!aviso.id || !userUid) return;
    
    const confirmacionRef = doc(db, 'avisos', aviso.id, 'confirmaciones', userUid);
    const confirmacionDoc = await getDoc(confirmacionRef);
    confirmacion = confirmacionDoc.data() as Confirmacion;
  }
</script>

<div class={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
  <div class="p-6">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center space-x-3">
        <Avatar name={getSafeString(aviso.profesorId || aviso.administradorId)} size="sm" color="bg-blue-500" />
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{aviso.titulo}</h3>
          <p class="text-sm text-gray-600">
            {aviso.fechaPublicacion?.toDate()?.toLocaleDateString() || 'Fecha no disponible'}
          </p>
          <p class="sr-only" aria-hidden="true">
            {aviso.profesorId ? `Publicado por el profesor ${aviso.profesorId}` : 
             aviso.administradorId ? `Publicado por el administrador ${aviso.administradorId}` : ''}
          </p>
        </div>
      </div>
      {#if aviso.fechaEvento}
        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          {aviso.fechaEvento?.toDate()?.toLocaleDateString() || 'Fecha no disponible'}
        </span>
      {/if}
    </div>

    <div class="prose max-w-none text-gray-700 mb-4">
      <p>{aviso.descripcion}</p>
    </div>

    {#if aviso.archivos?.length}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each aviso.archivos as archivo}
          <a href={archivo} target="_blank" class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {archivo.split('/').pop()}
          </a>
        {/each}
      </div>
    {/if}

    {#if aviso.cursos?.length}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each aviso.cursos as curso}
          <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {curso}
          </span>
        {/each}
      </div>
    {/if}

    <div class="flex justify-end">
      {#if confirmacion && confirmacion.leido}
        <button 
          class="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
          aria-label="Aviso leído"
        >
          ✅ Leído
        </button>
      {:else}
        <button 
          on:click={() => onConfirm(aviso.id)}
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
          aria-label="Marcar aviso como leído"
        >
          {isLoading ? '...' : 'Marcar como leído'}
        </button>
      {/if}
    </div>
  </div>
</div>
