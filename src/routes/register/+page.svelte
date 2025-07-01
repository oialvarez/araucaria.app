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
<div class="background">
  <nav class="nav-home">
    <a href="/" class="home-link">Araucaria App</a>
  </nav>
  <div class="container">
    <div class="form-box">
      <h1>Registrarse</h1>
      <form on:submit|preventDefault={register}>
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" bind:value={email} required aria-label="Email" />
        </div>

        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input id="password" type="password" bind:value={password} required aria-label="Contraseña" />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirmar Contraseña:</label>
          <input id="confirm-password" type="password" bind:value={confirmPassword} required aria-label="Confirmar Contraseña" />
        </div>

        <button type="submit" class="btn-primary">Registrarse</button>
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

<style lang="scss">
.nav-home {
  margin-bottom: 2rem;
  text-align: center;
}

.home-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
}

.home-link:hover {
  text-decoration: underline;
}

body {
  margin: 0;
}
body {
  margin: 0;
}

.background {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  max-width: 400px;
  width: 100%;
  margin: 0;
}

h1 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.error {
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.redirect {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
}

.redirect a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.redirect a:hover {
  text-decoration: underline;
}
</style>
