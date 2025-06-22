<script lang="ts">
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { app } from '../../firebase';
  import { goto } from '$app/navigation';

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
<div class="background">
  <div class="container">
    <div class="form-box">
      <h1>Registrarse</h1>
      <form on:submit|preventDefault={register}>
        <label>Email:</label>
        <input type="email" bind:value={email} required />

        <label>Contraseña:</label>
        <input type="password" bind:value={password} required />

        <label>Confirmar Contraseña:</label>
        <input type="password" bind:value={confirmPassword} required />

        <button type="submit">Registrarse</button>
      </form>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  </div>
</div>

<style>
  body {
    margin: 0;
  }

  /* Fondo con degradado y centrado completo */
  .background {
    height: 100vh;
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Contenedor del formulario con un max ancho */
  .container {
    max-width: 400px;
    width: 90%;
  }

  /* Estilizado del cuadro del formulario */
  .form-box {
    background-color: #f9d5e5; /* rosado pastel */
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }

  /* Título */
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  /* Las etiquetas */
  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }

  /* Inputs */
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

  /* Botón */
  button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem;
    background: #ff7f50; /* tono coral */
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

  /* Mensaje de error */
  .error {
    margin-top: 1rem;
    color: #b22222; /* rojo oscuro */
    font-weight: bold;
    text-align: center;
  }

  /* Enlace */
  a {
    color: #4682b4; /* azul acero */
    text-decoration: underline;
  }
  a:hover {
    color: #2e8b57; /* verde mar */
  }
</style>
