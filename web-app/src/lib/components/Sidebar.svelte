<script lang="ts">
  export let user: any = null;
  export let role: string | null = null;
 // 'apoderado', 'profesor', 'admin', null
  import { getAuth, signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';

  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Forzar refresco de la página y redirección a login para que el menú se actualice
      goto('/login');
      // Alternativamente, puedes usar location.reload(); si hay problemas de estado
    } catch (e) {
      alert('Error al cerrar sesión');
    }
  }
</script>

<nav class="sidebar">
  {#if !user}
    <a href="/">Home</a>
    <a href="/contacto">Contacto</a>
    <a href="/login">Login</a>
    <a href="/register">Registro</a>
  {:else if role === 'apoderado'}
    <details>
      <summary>Colegios</summary>
      <a href="/colegios">Mis colegios</a>
    </details>
    <details>
      <summary>Alumnos</summary>
      <a href="/alumnos">Mis alumnos</a>
    </details>
    <a href="/avisos">Avisos</a>
    <a href="/confirmaciones">Confirmaciones</a>
  {:else if role === 'profesor' || role === 'administrador'}
    <details>
      <summary>Colegios</summary>
      <a href="/colegios">Gestionar colegios</a>
    </details>
    <details>
      <summary>Cursos</summary>
      <a href="/cursos">Gestionar cursos</a>
    </details>
    <details>
      <summary>Alumnos</summary>
      <a href="/alumnos">Gestionar alumnos</a>
    </details>
    <a href="/avisos">Avisos</a>
    <a href="/confirmaciones">Confirmaciones</a>
  {:else}
    <span>Rol no reconocido</span>
  {/if}
  {#if user}
    <a href="#" class="logout-link" on:click|preventDefault={logout}>Cerrar sesión</a>
  {/if}
</nav>

<style>
.sidebar {
  width: 230px;
  min-height: 100vh;
  background: #f7f7fa;
  padding: 1.5rem 1rem;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.sidebar a,
.sidebar .logout-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: block;
}
.sidebar a:hover,
.sidebar .logout-link:hover {
  color: #1976d2;
}
.sidebar a:hover {
  color: #1976d2;
}
.sidebar details ul {
  list-style: none;
  padding-left: 1.2rem;
}
.sidebar details summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.3rem;
}
.sidebar-loading {
  color: #888;
  font-style: italic;
}
</style>
