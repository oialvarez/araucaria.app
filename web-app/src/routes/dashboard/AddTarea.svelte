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
  <form class="add-tarea-form" on:submit|preventDefault={agregarTarea}>
    <textarea
      placeholder="Nueva tarea"
      bind:value={tareaText}
      required
      class="add-tarea-form-input"
      rows="3"
    ></textarea>
    <button type="submit" class="add-tarea-button add-tarea-button-marcar">Agregar tarea</button>
  </form>
  {#if errorMensaje}
    <p class="error">{errorMensaje}</p>
  {/if}
</div>

<style>
.add-tarea {
  width: 40vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-tarea-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  width: 100%;
  margin: 0;
}
.add-tarea-form-input:focus {
  border-color: var(--primary-color, #a259c4);
  background: #fff;
}
textarea.add-tarea-form-input {
  min-height: 48px;
  max-height: 9.6em;
  width: 100%;
  margin: 0;

  resize: none;
  line-height: 1.6;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.75rem 1.2rem;
  border-radius: 1.2rem;
  border: 1.5px solid #e0c3fc;
  background: #faf8fc;
  color: #4b306a;
  box-shadow: 0 2px 8px rgba(162,89,196,0.04);
}
.add-tarea-button {
  padding: 0 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  outline: none;
  min-height: 48px;
  height: 48px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-tarea-button-marcar {
  background: var(--primary-color, #a259c4);
  color: #fff;
}
.add-tarea-button-marcar:hover {
  background: #8e44ad;
}
</style>
