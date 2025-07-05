<!-- Ruta: / (Home) -->
<script lang="ts">
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/firebase';
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



<div class="home-page">
  {#if $page.url.pathname === '/'}
    <!-- Decoración visual -->
    <div class="page-decoration">
      <div class="pink-circle"></div>
      <div class="purple-circle"></div>
    </div>
    
    <div class="page-container">
      <div class="welcome-content">
        <h1 class="welcome-title">
          Bienvenido a Araucaria
        </h1>
        <p class="welcome-subtitle">
          Tu plataforma educativa para gestionar avisos y tareas
        </p>
        
        <div class="action-buttons">
          <a href="/register" class="register-button">
            Registrarse
          </a>
          <a href="/login" class="login-button">
            Iniciar Sesión
          </a>
        </div>

        <div class="page-description">
          <p class="description-text">
            <span class="platform-name">Araucaria</span> es una plataforma diseñada especialmente para el contexto educativo,
            permitiendo a profesores, apoderados y administradores gestionar avisos y tareas de manera eficiente.
          </p>
          <p class="description-text">
            ¿Eres apoderado? Mantente informado sobre los avisos de tus hijos y gestiona sus tareas.
            ¿Eres profesor? Comunica avisos importantes y asigna tareas a tus estudiantes.
          </p>
        </div>
      </div>
    </div>
  {/if}
</div>
