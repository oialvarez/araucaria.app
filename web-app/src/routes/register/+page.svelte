<!-- Ruta: /register -->
<script lang="ts">
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { initializeApp } from 'firebase/app';
  import { getAuth } from 'firebase/auth';
  import { firebaseConfig } from '../../lib/config';
  import { goto } from '$app/navigation';

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  let email: string = '';
  let password: string = '';
  let confirmPassword: string = '';
  let errorMessage: string = '';

  async function register() {
    errorMessage = '';
    if (password !== confirmPassword) {
      errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      goto('/dashboard'); // o a la página que desees después de registrarte
    } catch (error) {
      console.log(error);
      errorMessage = "Error al registrarse";
    }
  }
</script>

<!-- La estructura del formulario con estilos -->
<div class="home-page">
  <div class="page-container">
  
  
    <div class="welcome-content">
      <h1 class="welcome-title">Registrarse</h1>
      <form on:submit|preventDefault={register} autocomplete="off">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" bind:value={email} required aria-label="Email" class="aviso-form-input" autocomplete="email" />
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input id="password" type="password" bind:value={password} required aria-label="Contraseña" class="aviso-form-input" autocomplete="new-password" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirmar Contraseña:</label>
          <input id="confirm-password" type="password" bind:value={confirmPassword} required aria-label="Confirmar Contraseña" class="aviso-form-input" autocomplete="new-password" />
        </div>

        <div class="action-buttons">
            <button type="button" class="register-button" on:click={() => goto('/')}>Volver al Inicio</button>
            <button type="submit" class="login-button">Registrarse</button>
          </div>
      </form>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
      <div class="page-description">
            <p class="description-text">
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </div>
    </div>
  </div>
</div>
