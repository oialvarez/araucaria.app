<!-- Ruta: /dashboard -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getFirestore, doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { db, auth } from '../../lib/firebase';
  import AddTarea from './AddTarea.svelte';


  // Las instancias de db y auth ya están importadas

  let tareas: any[] = []; // Considerar definir un tipo específico para las tareas más adelante
  let userUid: string | null = null;

  // Detectar usuario logueado
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userUid = user.uid;
        loadTareas();
      } else {
        // si no hay usuario, quizás redirigir a login
        // pero aquí simplemente no mostrar tareas
        userUid = null;
      }
    });
  });

  function loadTareas() {
    if (!userUid) return;
    const q = query(collection(db, 'tareas'), where('uid', '==', userUid));
    onSnapshot(q, (snapshot) => {
      tareas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  }

  // Función para cambiar estado de 'completed'
  async function toggleTarea(tareaId: string, currentState: boolean) {
    const tareaRef = doc(db, 'tareas', tareaId);
    await updateDoc(tareaRef, { completed: !currentState });
  }

  // Filtrar solo tareas no completadas
  $: tareasNoCompletadas = tareas.filter(t => !t.completed);
</script>



<div class="home-page">
  <div class="page-container">
    <h1>Dashboard - Tareas pendientes</h1>

    <AddTarea onTareaAgregada={loadTareas} />

    {#if tareasNoCompletadas.length > 0}
      <ul>
        {#each tareasNoCompletadas as tarea (tarea.id)}
          <li>
          <input
            type="checkbox"
            checked={tarea.completed}
            on:change={() => toggleTarea(tarea.id, tarea.completed)}
          />
          {tarea.text}
        </li>
        {/each}
      </ul>
    {:else}
      <p>No tienes tareas pendientes.</p>
    {/if}

  </div>
</div>
