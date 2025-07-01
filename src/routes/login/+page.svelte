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

<div class="container">
  <nav class="nav-home">
    <a href="/" class="home-link">Araucaria App</a>
  </nav>
  <div class="form-box">
    <h1 class="mt-8">Iniciar Sesión</h1>
    <h1>Iniciar Sesión</h1>
    <form on:submit|preventDefault={login}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" bind:value={email} required aria-label="Email" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" type="password" bind:value={password} required aria-label="Contraseña" />
      </div>

      <button type="submit" class="btn-primary">Entrar</button>
    </form>
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    <p>
      ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
    </p>
  </div>
</div>

<style>

  /* Centrado horizontal y vertical */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* pantalla completa */
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); /* fondo con degradado bonito */
    margin: 0;
  }

  /* Caja del formulario */
  .form-box {
    background-color: #f9d5e5; /* tono rosado pastel */
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    max-width: 400px;
    width: 90%;
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333; /* gris oscuro para el título */
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  input:focus {
    border-color: #66a6ff;
    box-shadow: 0 0 8px rgba(102,166,255,0.3);
    outline: none;
  }

  button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem;
    background: #ff7f50; /* coral */
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #ff6347; /* tomate más fuerte */
  }

  .error {
    margin-top: 1rem;
    color: #b22222; /* rojo oscuro */
    font-weight: bold;
    text-align: center;
  }

  a {
    color: #4682b4; /* azul acero */
    text-decoration: underline;
  }
  a:hover {
    color: #2e8b57; /* verde mar */
  }
</style>
