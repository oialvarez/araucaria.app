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

<div class="bg-white rounded-lg shadow-md p-6">
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
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
      <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
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
      <label for="fechaEvento" class="block text-sm font-medium text-gray-700">Fecha del evento (opcional)</label>
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
      <label for="cursos" class="block text-sm font-medium text-gray-700">Cursos</label>
      <div id="cursos" class="mt-2 flex flex-wrap gap-2">
        {#each cursos as curso}
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {curso}
            <button
              on:click={() => handleFileRemove(cursos.indexOf(curso))}
              class="ml-1 text-red-500 hover:text-red-700"
              aria-label="Remover curso {curso}"
            >
              ✕
            </button>
          </span>
        {/each}
      </div>
    </div>

    <div>
      <label for="archivos" class="block text-sm font-medium text-gray-700">Archivos adjuntos</label>
      <div id="archivos" class="mt-2 flex flex-wrap gap-2">
        {#each archivos as archivo, i}
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            {archivo.split('/').pop()}
            <button
              on:click={() => handleFileRemove(i)}
              class="ml-1 text-red-500 hover:text-red-700"
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
        class="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        disabled={isLoading}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Enviar aviso"
      >
        {isLoading ? '...' : aviso ? 'Actualizar aviso' : 'Crear aviso'}
      </button>
    </div>
  </form>
</div>
