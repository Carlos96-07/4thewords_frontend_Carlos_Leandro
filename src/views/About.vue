<!-- Componente con información general del sistema -->

<template>
  <div class="combined-page-container">
    <div class="page-section welcome-section">
      <h1>¡Bienvenido a Mi Proyecto de Leyendas!</h1>
      <p>Descubre historias fascinantes de mitos y leyendas de todo el mundo.</p>
      <p>Explora nuestra colección o comparte tus propias leyendas.</p>
      <router-link to="/admin/legends" class="btn-primary">Ver Leyendas</router-link>
    </div>

    <div class="page-section about-project-section">
      <h2>Acerca de este Proyecto</h2> <p>Este proyecto está dedicado a la recopilación y difusión de leyendas urbanas de Costa Rica.</p>
      <p>Creemos en el poder de las historias para conectar culturas y generaciones.</p>
      <p>Desarrollado con Vue 3 y FastAPI.</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.combined-page-container {
  padding: 20px; 
  max-width: 1000px; 
  margin: 30px auto; 
}

.page-section {
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px; 
  text-align: center; 
}

.welcome-section h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem; 
  font-family: 'Times New Roman', Times, serif;
}

.welcome-section p {
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
  max-width: 700px; 
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem; 
}

.btn-primary {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #369c73;
}

.about-project-section h2 { 
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem; 
  font-family: 'Times New Roman', Times, serif;
}

.about-project-section p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
  max-width: 600px; 
  margin-left: auto;
  margin-right: auto;
  font-size: 1rem; 
}


@media (max-width: 768px) {
  .page-section {
    padding: 30px 15px; 
    margin-bottom: 30px; 
  }
  .welcome-section h1 {
    font-size: 2em; 
  }
  .about-project-section h2 {
    font-size: 1.8em;
  }
}
</style>