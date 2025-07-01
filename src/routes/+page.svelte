<script lang="ts">
  import { auth } from '$lib/firebase';
  import { onAuthStateChanged, getAuth } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let user: any = null;
  let email: string = '';
  let subscribed: boolean = false;

  // Redirigir a dashboard si hay sesión
  onAuthStateChanged(auth, (user) => {
    if (user && $page.url.pathname === '/') {
      goto('/dashboard');
    }
  });

  async function handleSubmit() {
    // Aquí iría la lógica para enviar el email a una lista de espera
    // Por ahora, solo mostramos el mensaje de éxito
    subscribed = true;
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Bienvenido a Araucaria
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Tu plataforma educativa para gestionar avisos y tareas
      </p>
      
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <a href="/login" class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
          Iniciar Sesión
        </a>
        <a href="/register" class="px-8 py-3 bg-white hover:bg-gray-50 text-blue-500 border border-blue-500 rounded-lg font-semibold transition-colors">
          Registrarse
        </a>
      </div>

      <div class="mt-12 text-gray-600 text-center">
        <p class="mb-4">
          <span class="font-semibold">Araucaria</span> es una plataforma diseñada especialmente para el contexto educativo,
          permitiendo a profesores, apoderados y administradores gestionar avisos y tareas de manera eficiente.
        </p>
        <p>
          ¿Eres apoderado? Mantente informado sobre los avisos de tus hijos y gestiona sus tareas.
          ¿Eres profesor? Comunica avisos importantes y asigna tareas a tus estudiantes.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .share-link a {
    color: #3498db;
    text-decoration: none;
  }

  .share-link a:hover {
    text-decoration: underline;
  }

  /* Media Queries para pantallas más grandes */
  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    .container {
      padding: 2rem;
    }
  }

  /* Media Queries para pantallas grandes */
  @media (min-width: 1024px) {
    h1 {
      font-size: 3.5rem;
    }

    .container {
      padding: 3rem;
    }
  }
</style>

<div class="container">
  <h1>¿Te ha pasado otra vez? Cartulina, entrevista, evento… ¡No te pierdas nada más!</h1>

  <p>Sabemos lo que se siente. La vida de un padre/madre es un torbellino de actividades, y es fácil que las cosas importantes se te escapen. </p>

  <p>Presentamos <strong>Araucaria App</strong>, la solución para mantenerte al tanto de todo lo que pasa en el colegio de tus hijos. Recibe recordatorios personalizados, organiza tus tareas y ¡nunca más te pierdas un evento importante!</p>

  {#if !subscribed}
    <form on:submit|preventDefault={handleSubmit}>
      <input type="email" placeholder="Tu correo electrónico" bind:value={email} required>
      <button type="submit">¡Devuélveme la cordura!</button>
    </form>
  {:else}
    <p class="success-message">¡Gracias por unirte a la lista de espera! Te mantendremos informado sobre el lanzamiento de Araucaria App.</p>
  {/if}

  {#if subscribed}
    <p class="share-link">
      ¿Te sientes identificado? 
      <a href="https://twitter.com/intent/tweet?url=https://araucaria-app.com&text=¡Necesitas ayuda para no perderte nada importante del colegio de tus hijos? 📚✨ Araucaria App es la solución!" aria-label="Compartir en Twitter">
        ¡Comparte esta página con otros padres/madres que también necesitan un respiro!
      </a>
    </p>
  {/if}
</div>
