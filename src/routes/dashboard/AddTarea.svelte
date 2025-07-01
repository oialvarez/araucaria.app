<script lang="ts">
  import { getFirestore, collection, addDoc } from 'firebase/firestore';
  import { getAuth } from 'firebase/auth';
  import { db, auth } from '../../lib/firebase';

  export let onTareaAgregada: () => void; // función callback

  let tareaText: string = '';
  let errorMensaje: string = '';

  async function agregarTarea() {
    errorMensaje = '';
    const user = auth.currentUser;
    if (!user) {
      errorMensaje = 'Debes estar autenticado.';
      return;
    }
    if (tareaText.trim() === '') {
      errorMensaje = 'Escribe algo para la tarea.';
      return;
    }
    try {
      await addDoc(collection(db, 'tareas'), {
        text: tareaText,
        completed: false,
        uid: user.uid
      });
      tareaText = '';
      // Puedes emitir un evento o llamar la función callback
      if (onTareaAgregada) onTareaAgregada();
    } catch (err) {
      console.error(err);
      errorMensaje = 'Error al agregar la tarea.';
    }
  }
</script>

<div class="add-tarea">
  <form on:submit|preventDefault={agregarTarea}>
    <input
      type="text"
      placeholder="Nueva tarea"
      bind:value={tareaText}
      required
    />
    <button type="submit">Agregar tarea</button>
  </form>
  {#if errorMensaje}
    <p class="error">{errorMensaje}</p>
  {/if}
</div>
