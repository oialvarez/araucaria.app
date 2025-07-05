<script lang="ts">
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import app from '$lib/firebase'; 
  
  let nombre = '';
  let email = '';
  let asunto = '';
  let mensaje = '';
  let enviando = false;
  let error: string | null = null;
  let exito = false;
  
  const functions = getFunctions(app);
  const sendContactEmail = httpsCallable(functions, 'sendContactEmail');
  
  async function enviarMensaje() {
    enviando = true;
    error = null;
    exito = false;
    
    try {
      await sendContactEmail({ nombre, email, asunto, mensaje });
      exito = true;
      // Resetear formulario
      nombre = '';
      email = '';
      asunto = '';
      mensaje = '';
    } catch (e) {
      error = `Error al enviar: ${(e as Error).message}`;
    } finally {
      enviando = false;
    }
  }
</script>

<div class="home-page">
  <div class="page-container">
    <h2>Contacto</h2>
    <form class="contacto-form" on:submit|preventDefault={enviarMensaje}>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input id="nombre" type="text" bind:value={nombre} required class="aviso-form-input" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" bind:value={email} required class="aviso-form-input" />
      </div>
      <div class="form-group">
        <label for="asunto">Asunto:</label>
        <input id="asunto" type="text" bind:value={asunto} required class="aviso-form-input" />
      </div>
      <div class="form-group">
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" bind:value={mensaje} required rows="5" class="aviso-form-input"></textarea>
      </div>
      {#if exito}
        <p class="success">¡Mensaje enviado con éxito!</p>
      {/if}
      {#if error}
        <p class="error">{error}</p>
      {/if}
      <button type="submit" class="add-tarea-button" disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar mensaje'}</button>
    </form>
  </div>
</div>
