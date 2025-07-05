<!-- Componente principal Layout -->

<template>
  <div id="app-layout">
    <header class="app-header">
      <nav class="main-nav">
        <!-- Enlaces visibles cuando NO está logueado -->
        <router-link v-if="!isLoggedIn" to="/" class="nav-link">Inicio</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
       
        <!-- Botón de Cerrar Sesión, visible solo cuando está logueado -->
        <button v-if="showLogoutButton" @click="logout" class="nav-button">Cerrar Sesión</button>

      </nav>
    </header>

    <main class="app-main">
      <router-view></router-view>
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 Mi Proyecto de Leyendas</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isLoggedIn = ref(!!localStorage.getItem('userToken'));
const showLogoutButton = ref(false);

// Verifica si estás logueado y en la ruta específica
watchEffect(() => {
  const token = localStorage.getItem('userToken');
  isLoggedIn.value = !!token;
  showLogoutButton.value = isLoggedIn.value && route.path === '/admin/legends';
});

const logout = () => {
  localStorage.removeItem('userToken');
  isLoggedIn.value = false;
  router.push('/login');
};
</script>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: column; 
  min-height: 100vh; 
}

.app-header {
  background-color: #ffffff; 
  padding: 1em 2em; 
  border-bottom: 1px solid #e0e0e0; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
  position: sticky; 
  top: 0;
  z-index: 1000; 
  width: 100%;
}

.main-nav {
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-wrap: wrap; 
  max-width: 1200px; 
  margin: 0 auto; 
}

.nav-link, .nav-button {
  font-weight: bold;
  color: #2c3e50; 
  margin: 0 15px;
  text-decoration: none;
  padding: 10px 15px; 
  transition: color 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;
  border-radius: 8px; 
}

.nav-link:hover {
  color: #ffffff; 
  background-color: #42b983; 
}

.nav-link.router-link-exact-active {
  color: #ffffff; 
  background-color: #369c73; 
}

.nav-button {
  background-color: #e74c3c; 
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 18px;
  font-size: 1.05em;
  border-radius: 8px;
}

.nav-button:hover {
  background-color: #c0392b;
}

/* Estilos del Main Content */
.app-main {
  flex-grow: 1; /* ¡Esto es CLAVE! Hace que el contenido principal ocupe todo el espacio restante */
  padding: 20px;
  max-width: 1200px; /* Ancho máximo para el contenido, para que no se estire demasiado */
  margin: 20px auto; /* Centra el contenido principal y le da margen arriba/abajo */
  width: 100%; /* Asegura que ocupe el ancho disponible */
}

/* Estilos del Footer */
.app-footer {
  margin-top: auto; /* Empuja el footer hacia abajo, después de que main ha tomado su espacio */
  padding: 1.5em;
  background-color: #ffffff; /* Fondo blanco */
  border-top: 1px solid #e0e0e0;
  color: #666;
  font-size: 0.9em;
  text-align: center;
  width: 100%;
}

/* Media Queries para Responsiveness */
@media (max-width: 768px) {
  .app-header {
    padding: 1em; /* Menos padding en móviles */
  }
  .main-nav {
    flex-direction: column; /* Apila los enlaces en pantallas pequeñas */
    align-items: stretch; /* Estira los elementos para ocupar el ancho */
  }

  .nav-link, .nav-button {
    margin: 5px 0; /* Margen vertical */
    text-align: center;
  }
  .app-main {
    padding: 15px; /* Menos padding en el contenido principal para móviles */
    margin: 15px auto;
  }
}
</style>