<!-- Este componente se penso a futuro para ver una demostracion de lo que hace el sistema -->

<template>
  <div class="page-container">
    <h1>Leyendas Urbanas de Costa Rica</h1>
    <p class="intro-text">Descubre algunas de las historias más fascinantes y misteriosas de nuestro país.</p>

    <div class="legends-grid">
      <Card
        v-for="legend in legends"
        :key="legend.id"
        :title="legend.title"
        :image="legend.image_url"
        :description="legend.description"
        @click="showLegendDetails(legend)"
      />
    </div>

    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>{{ selectedLegend.title }}</h3>
      </template>
      <template #body>
        <img :src="selectedLegend.image_url" :alt="selectedLegend.title" class="modal-image" v-if="selectedLegend.image_url" />
        <p>{{ selectedLegend.description }}</p>
        <p><strong>Autor:</strong> {{ selectedLegend.author }}</p>
        </template>
      <template #footer>
        <button @click="showModal = false" class="btn-secondary">Cerrar</button>
        <template v-if="isLoggedIn">
          <button @click="editLegend(selectedLegend.id)" class="btn-primary">Editar</button>
          </template>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Card from '../components/Card.vue';
import Modal from '../components/Modal.vue';

import carretaImg from '../assets/images/carreta.png'; 
import lloronaImg from '../assets/images/La_llorona.png'; 
import cadejosImg from '../assets/images/cadejos.png'; 
import ceguaImg from '../assets/images/cegua.png';     
import padreImg from '../assets/images/Padre.png';     
import monjaImg from '../assets/images/monja.png';     

const legends = ref([]);
const showModal = ref(false);
const selectedLegend = ref({});
const router = useRouter();

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('userToken');
});

const staticLegends = [
  {
    id: 1,
    title: 'La Carreta Nagua',
    description: 'Una carreta fantasma que aparece en las noches sin luna, arrastrada por bueyes descarnados, anunciando la muerte a quienes la escuchan. Se dice que sus ruedas giran sin tocar el suelo, y su sonido es estremecedor.',
    image_url: carretaImg, 
    author: 'Tradición Popular'
  },
  {
    id: 2,
    title: 'La Llorona',
    description: 'El alma en pena de una mujer que ahogó a sus hijos y ahora vaga lamentándose por ríos y quebradas, buscando a sus pequeños. Su llanto es desgarrador y se escucha en las noches solitarias.',
    image_url: lloronaImg, 
    author: 'Folclore Latinoamericano'
  },
  {
    id: 3,
    title: 'El Cadejos',
    description: 'Un perro espectral que se aparece en los caminos por la noche. Existe el Cadejos blanco, que protege a los borrachos, y el Cadejos negro, que los arrastra al infierno. Se le reconoce por sus ojos rojos brillantes.',
    image_url: cadejosImg, 
    author: 'Mito Centroamericano'
  },
  {
    id: 4,
    title: 'La Segua',
    description: 'Una hermosa mujer que seduce a los hombres borrachos o mujeriegos en el camino. Al voltearse, revela un rostro de calavera o caballo, aterrorizándolos hasta la locura o la muerte.',
    image_url: ceguaImg, 
    author: 'Leyenda Costarricense'
  },
  {
    id: 5,
    title: 'El Padre sin Cabeza',
    description: 'Se dice que es el fantasma de un sacerdote que fue decapitado, y ahora vaga por iglesias antiguas y cementerios, buscando su cabeza o realizando misas fantasmales a medianoche.',
    image_url: padreImg, 
    author: 'Leyenda Colonial'
  },
  {
    id: 6,
    title: 'La Monja del Santuario',
    description: 'En Cartago, se cuenta la historia de una monja que aparece en los alrededores de la Basílica de Los Ángeles, a veces pidiendo ayuda o simplemente deambulando, con un halo de misterio.',
    image_url: monjaImg, 
    author: 'Leyenda Cartaginesa'
  },
];

onMounted(() => {
  legends.value = staticLegends;
});

const showLegendDetails = (legend) => {
  selectedLegend.value = legend;
  showModal.value = true;
};

const editLegend = (id) => {
  router.push(`/legends/edit/${id}`);
  showModal.value = false;
};
</script>

<style scoped>

.page-container {
  padding: 40px 20px;
}
h1 {
  color: #333;
  margin-bottom: 15px;
  font-size: 2.8em;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;

}
.intro-text {
  text-align: center;
  color: #666;
  font-size: 1.1em;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.action-bar {
  text-align: right;
  margin-bottom: 25px;
  padding-right: 15px;
}

.add-new-btn {
  padding: 10px 20px;
  font-size: 1em;
}

.legends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding-bottom: 30px;
}

.modal-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
.btn-primary {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #369c73;
}
</style>