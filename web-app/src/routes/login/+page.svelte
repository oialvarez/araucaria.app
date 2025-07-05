<!-- Ruta: /login -->
<script lang="ts">
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../../lib/firebase';
  import { goto } from '$app/navigation'; // si usas SvelteKit para navegar

  let email: string = '';
  let password: string = '';
  let errorMessage: string = '';

  async function login() {
    errorMessage = '';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir a la página principal o dashboard
      goto('/dashboard'); // Puedes crear esta ruta en tu app
    } catch (error) {
      console.log(error);
      errorMessage = "Error al logearse";
    }
  }
</script>



<div class="home-page">
  <div class="page-container">

  
    <div class="welcome-content">
      <h1 class="welcome-title">Iniciar Sesión</h1>
      <form on:submit|preventDefault={login}>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" bind:value={email} required aria-label="Email" class="aviso-form-input" />
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input id="password" type="password" bind:value={password} required aria-label="Contraseña" class="aviso-form-input" />
        </div>

        <div class="action-buttons">
          <button type="button" class="register-button" on:click={() => goto('/')}>Volver al Inicio</button>
          <button type="submit" class="login-button">Entrar</button>
        </div>
      </form>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
      <div class="page-description">
          <p class="description-text">
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </p>
        </div>
    </div>
  </div>
</div>
