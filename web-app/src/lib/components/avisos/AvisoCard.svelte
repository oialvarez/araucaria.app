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

<div class="aviso-card">
  <div class="aviso-content">
    <div class="aviso-header">
      <div class="aviso-header-row">
        <Avatar name={getSafeString(aviso.profesorId || aviso.administradorId)} size="sm" color="bg-blue-500" />
        <div>
          <h3 class="aviso-title">{aviso.titulo}</h3>
          <p class="aviso-date">
            {aviso.fechaPublicacion?.toDate()?.toLocaleDateString() || 'Fecha no disponible'}
          </p>
          <p class="sr-only" aria-hidden="true">
            {aviso.profesorId ? `Publicado por el profesor ${aviso.profesorId}` : 
             aviso.administradorId ? `Publicado por el administrador ${aviso.administradorId}` : ''}
          </p>
        </div>
      </div>
      {#if aviso.fechaEvento}
        <span class="aviso-badge aviso-badge-evento">
          {aviso.fechaEvento?.toDate()?.toLocaleDateString() || 'Fecha no disponible'}
        </span>
      {/if}
    </div>

    <div class="aviso-desc">
      <p>{aviso.descripcion}</p>
    </div>

    {#if aviso.archivos?.length}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each aviso.archivos as archivo}
          <a href={archivo} target="_blank" class="aviso-badge aviso-badge-file">
            {archivo.split('/').pop()}
          </a>
        {/each}
      </div>
    {/if}

    {#if aviso.cursos?.length}
      <div class="flex flex-wrap gap-2 mb-4">
        {#each aviso.cursos as curso}
          <span class="aviso-badge aviso-badge-curso">
            {curso}
          </span>
        {/each}
      </div>
    {/if}

    <div class="aviso-actions">
      {#if confirmacion && confirmacion.leido}
        <button 
          class="aviso-button aviso-button-leido"
          disabled
          aria-label="Aviso leído"
        >
          ✅ Leído
        </button>
      {:else}
        <button 
          on:click={() => onConfirm(aviso.id)}
          class="aviso-button aviso-button-marcar"
          disabled={isLoading}
          aria-label="Marcar aviso como leído"
        >
          {isLoading ? '...' : 'Marcar como leído'}
        </button>
      {/if}
    </div>
  </div>
</div>
