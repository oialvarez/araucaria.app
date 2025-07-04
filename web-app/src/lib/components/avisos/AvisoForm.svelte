<script lang="ts">
  import { getContext } from 'svelte';
  import { onMount } from 'svelte';
  import { getFirestore, Timestamp, doc, updateDoc, addDoc, collection } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/user';
  import type { Aviso } from '$lib/types';

  export let aviso: Aviso | null = null;
  let titulo = '';
  let descripcion = '';
  let fechaEvento: Date | null = null;
  let cursos: string[] = [];
  let archivos: string[] = [];
  let isLoading = false;
  const db = getFirestore();
  const storage = getStorage();

  // Helper para manejar fechas
  function formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : '';
  }

  // Convertir string de fecha a Date
  function parseDate(dateString: string): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  onMount(async () => {
    if (aviso) {
      titulo = aviso.titulo;
      descripcion = aviso.descripcion;
      fechaEvento = aviso.fechaEvento?.toDate() || null;
      cursos = aviso.cursos || [];
    }
  });

  // Actualizar fechaEvento cuando cambia el input
  function handleFechaEventoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    fechaEvento = parseDate(target.value);
  }

  async function handleSubmit() {
    isLoading = true;
    try {
      const data: Omit<Aviso, 'id'> = {
        titulo,
        descripcion,
        fechaPublicacion: Timestamp.now(),
        fechaEvento: fechaEvento ? Timestamp.fromDate(fechaEvento) : null,
        cursos,
        archivos,
        profesorId: null,
        administradorId: null
      };

      const currentUser = get(user);
      if (currentUser?.rol === 'profesor') {
        data.profesorId = currentUser.uid;
      } else {
        data.administradorId = currentUser.uid;
      }

      if (aviso) {
        await updateDoc(doc(db, 'avisos', aviso.id), data);
      } else {
        await addDoc(collection(db, 'avisos'), data);
      }
      
      isLoading = false;
      // Reset form
      titulo = '';
      descripcion = '';
      fechaEvento = null;
      cursos = [];
      archivos = [];
    } catch (error) {
      console.error('Error saving aviso:', error);
      isLoading = false;
    }
  }

  async function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `avisos/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    archivos = [...archivos, url];
  }

  function handleFileRemove(index: number) {
    archivos = archivos.filter((_, i) => i !== index);
  }
</script>

<div class="aviso-card"><div class="aviso-content">
  <form on:submit|preventDefault={handleSubmit} class="aviso-form">
    <div>
      <label for="titulo" class="aviso-form-label">Título</label>
      <input
        type="text"
        id="titulo"
        bind:value={titulo}
        required
        aria-required="true"
        aria-label="Título del aviso"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="descripcion" class="aviso-form-label">Descripción</label>
      <textarea
        id="descripcion"
        bind:value={descripcion}
        rows="4"
        required
        aria-required="true"
        aria-label="Descripción del aviso"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>

    <div>
      <label for="fechaEvento" class="aviso-form-label">Fecha del evento (opcional)</label>
      <input
        type="date"
        id="fechaEvento"
        value={formatDate(fechaEvento)}
        on:input={handleFechaEventoChange}
        aria-label="Fecha del evento"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="cursos" class="aviso-form-label">Cursos</label>
      <div id="cursos" class="aviso-badges">
        {#each cursos as curso}
          <span class="aviso-badge aviso-badge-curso">
            {curso}
            <button
              on:click={() => handleFileRemove(cursos.indexOf(curso))}
              class="aviso-remove-badge"
              aria-label="Remover curso {curso}"
            >
              ✕
            </button>
          </span>
        {/each}
      </div>
    </div>

    <div>
      <label for="archivos" class="aviso-form-label">Archivos adjuntos</label>
      <div id="archivos" class="aviso-badges">
        {#each archivos as archivo, i}
          <span class="aviso-badge aviso-badge-file">
            {archivo.split('/').pop()}
            <button
              on:click={() => handleFileRemove(i)}
              class="aviso-remove-badge"
              aria-label="Remover archivo {archivo.split('/').pop()}"
            >
              ✕
            </button>
          </span>
        {/each}
      </div>
      <input
        type="file"
        on:change={handleFileUpload}
        aria-label="Seleccionar archivo"
        class="aviso-form-input"
      />
    </div>

    <div class="aviso-actions">
      <button
        type="submit"
        disabled={isLoading}
        class="aviso-button aviso-button-marcar"
        aria-label="Enviar aviso"
      >
        {isLoading ? '...' : aviso ? 'Actualizar aviso' : 'Crear aviso'}
      </button>
    </div>
  </form>
</div>
