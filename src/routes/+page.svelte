<script>
  let email = '';
  let subscribed = false;

  async function handleSubmit() {
    // Aquí iría el código para enviar el correo a tu base de datos
    // o a un servicio de email marketing como Firebase Firestore o Mailchimp
    // Por ahora, solo simulamos la suscripción exitosa.
    subscribed = true;
    console.log('Correo suscrito:', email);
    email = ''; // Limpiar el campo después de la suscripción
  }
</script>

<style>
  /* Estilos generales */
  body {
    font-family: sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center; /* Centrar el contenido en pantallas pequeñas */
  }

  .container {
    width: 90%;
    /* Eliminar el max-width para que ocupe más espacio en pantallas grandes */
    /* max-width: 600px; */
    max-width: 800px; /* Aumentar el ancho máximo */
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: left; /* Alinear el texto a la izquierda en pantallas más grandes */
  }

  /* Título */
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    text-align: center; /* Centrar el título en todos los tamaños */
  }

  /* Descripción */
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #555;
  }

  /* Formulario */
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch; /* Estirar los elementos para ocupar todo el ancho */
  }

  input[type="email"] {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #2980b9;
  }

  /* Mensaje de agradecimiento */
  .success-message {
    margin-top: 1rem;
    color: #27ae60;
  }

  /* Enlace para compartir */
  .share-link {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: #777;
    text-align: center; /* Centrar el enlace en todos los tamaños */
  }

  .share-link a {
    color: #3498db;
    text-decoration: none;
  }

  .share-link a:hover {
    text-decoration: underline;
  }

  /* Media Queries para pantallas más grandes */
  @media (min-width: 768px) { /* Cambiar el breakpoint a 768px para tablets */
    h1 {
      font-size: 3rem; /* Aumentar el tamaño del título en pantallas más grandes */
    }

    p {
      font-size: 1.2rem; /* Aumentar el tamaño de la descripción en pantallas más grandes */
    }

    .container {
      text-align: left; /* Alinear el texto a la izquierda en pantallas más grandes */
    }

    form {
      flex-direction: row; /* Alinear los elementos del formulario en fila */
      align-items: center; /* Centrar verticalmente */
    }

    input[type="email"] {
      width: 60%; /* Reducir el ancho del campo de correo electrónico */
      margin-right: 0.5rem;
    }

    button {
      width: 40%; /* Ajustar el ancho del botón */
      font-size: 1.2rem; /* Aumentar el tamaño del texto del botón */
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
    <p class="share-link">¿Te sientes identificado? <a href="#">¡Comparte esta página con otros padres/madres que también necesitan un respiro!</a></p>
  {/if}
</div>
