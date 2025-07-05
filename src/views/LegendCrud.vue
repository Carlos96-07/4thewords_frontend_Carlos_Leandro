<!-- Componente para realizar funciones como insertar, actualizar, ver y eliminar -->

<template>
  <div class="page-container">
    <h1>Administrar Leyendas</h1>
    <p class="intro-text">Aquí puedes añadir y editar leyendas de Costa Rica.</p>

    <div class="action-bar">
      <button @click="openAddModal" class="btn-primary add-new-btn">Añadir Nueva Leyenda</button>
    </div>

    <div class="legends-grid">
      <Card
        v-for="legend in legends"
        :key="legend.id"
        :title="legend.name"
        :image="getAbsoluteImageUrl(legend.image_url)"
        :description="legend.description"
        @click="openEditModal(legend)"
      />
    </div>

    <Modal :show="showFormModal" @close="closeFormModal">
      <template #header>
        <h3>{{ isEditing ? 'Editar Leyenda' : 'Añadir Nueva Leyenda' }}</h3>
      </template>
      <template #body>
        <form @submit.prevent="saveLegend">
          <div class="form-group">
            <label for="name">Título (Nombre):</label>
            <input type="text" id="name" v-model="currentLegend.name" required />
          </div>

          <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea id="description" v-model="currentLegend.description" required></textarea>
          </div>

          <div class="form-group">
            <label for="date">Fecha:</label>
            <input type="datetime-local" id="date" v-model="currentLegend.date" required />
          </div>

          <div class="form-group">
            <label for="province_id">Provincia:</label>
            <select id="province_id" v-model.number="currentLegend.province_id" @change="onProvinceChange" required>
              <option value="" disabled>Seleccione una provincia</option>
              <option v-for="prov in provinces" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="canton_id">Cantón:</label>
            <select id="canton_id" v-model.number="currentLegend.canton_id" @change="onCantonChange" required>
              <option value="" disabled>Seleccione un cantón</option>
              <option v-for="cant in cantons" :key="cant.id" :value="cant.id">{{ cant.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="district_id">Distrito:</label>
        <select id="district_id" v-model.number="currentLegend.district_id" required>
            <option value="" disabled>Seleccione un distrito</option>
            <option v-for="dist in districts" :key="dist.id" :value="dist.id">{{ dist.name }}</option>
            </select>

          </div>

            <div class="form-group">
            <label for="category_id">Categoría:</label>
            <select id="category_id" v-model.number="currentLegend.category_id" required>
                <option disabled value="">Seleccione una categoría</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
                </option>
            </select>
            </div>

          <div class="form-group">
            <label for="image">Imagen:</label>
            <input type="file" id="image" @change="handleImageUpload" :required="!isEditing" />
            <p v-if="isEditing && currentLegend.image_url">
              Imagen actual:
              <a :href="getAbsoluteImageUrl(currentLegend.image_url)" target="_blank">Ver</a>
            </p>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
            <button type="button" @click="closeFormModal" class="btn-secondary">Cancelar</button>
            <button v-if="isEditing" type="button" @click="deleteLegend(currentLegend.id)" class="btn-danger">Eliminar</button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import Modal from '../components/Modal.vue';
import api, { getWithToken, fetchProvinces, fetchCantons, fetchDistricts } from '../services/api';
import { fetchCategories } from '../services/api';


const showFormModal = ref(false);
const isEditing = ref(false);
const currentLegend = ref({
  id: null,
  name: '',
  description: '',
  date: '',
  category_id: null,
  province_id: null,
  canton_id: null,
  district_id: null,
  image_url: '',
});

const selectedImageFile = ref(null);
const legends = ref([]);
const provinces = ref([]);
const cantons = ref([]);
const districts = ref([]);
const categories = ref([]);


const getAbsoluteImageUrl = (relativePath) => {
  if (relativePath && !relativePath.startsWith('http')) {
    const fileName = relativePath.split('/').pop();
    return `http://localhost:8080/uploads/${fileName}`;
  }
  return relativePath;
};

const fetchLegends = async () => {
  try {
    const response = await getWithToken('/');
    legends.value = response.data;
  } catch (err) {
    console.error('Error fetching legends:', err);
  }
};

const fetchAllCategories = async () => {
  try {
    const res = await fetchCategories();
    categories.value = res.data;
  } catch (err) {
    console.error('Error al cargar categorías', err);
  }
};


const fetchAllProvinces = async () => {
  try {
    const res = await fetchProvinces();
    provinces.value = res.data;
  } catch (err) {
    console.error('Error al cargar provincias', err);
  }
};

const fetchCantonsByProvince = async (provinceId) => {
  try {
    const res = await fetchCantons(provinceId);
    cantons.value = res.data;
  } catch (err) {
    console.error('Error al cargar cantones', err);
  }
};

const fetchDistrictsByCanton = async (cantonId) => {
  try {
    const res = await fetchDistricts(cantonId);
    districts.value = res.data;
  } catch (err) {
    console.error('Error al cargar distritos', err);
  }
};

const onProvinceChange = () => {
  fetchCantonsByProvince(currentLegend.value.province_id);
  currentLegend.value.canton_id = null;
  currentLegend.value.district_id = null;
  districts.value = [];
};

const onCantonChange = () => {
  console.log('CANTÓN SELECCIONADO:', currentLegend.value.canton_id);
  if (currentLegend.value.canton_id) {
    fetchDistrictsByCanton(currentLegend.value.canton_id);
    currentLegend.value.district_id = null;
  }
};
const handleImageUpload = (event) => {
  selectedImageFile.value = event.target.files[0];
};

const openAddModal = () => {
  isEditing.value = false;
  currentLegend.value = {
    id: null,
    name: '',
    description: '',
    date: new Date().toISOString().slice(0, 16),
    category_id: null,
    province_id: null,
    canton_id: null,
    district_id: null,
    image_url: '',
  };
  selectedImageFile.value = null;
  showFormModal.value = true;
};

const openEditModal = async (legend) => {
  isEditing.value = true;
  currentLegend.value = { ...legend };
  if (currentLegend.value.date) {
    currentLegend.value.date = new Date(currentLegend.value.date).toISOString().slice(0, 16);
  }
  await fetchCantonsByProvince(currentLegend.value.province_id);
  await fetchDistrictsByCanton(currentLegend.value.canton_id);
  selectedImageFile.value = null;
  showFormModal.value = true;
};

const closeFormModal = () => {
  showFormModal.value = false;
};

const saveLegend = async () => {
  try {
    const formData = new FormData();
    formData.append('name', currentLegend.value.name);
    formData.append('description', currentLegend.value.description);
    formData.append('date', currentLegend.value.date + ':00');
    formData.append('category_id', currentLegend.value.category_id);
    formData.append('province_id', currentLegend.value.province_id);
    formData.append('canton_id', currentLegend.value.canton_id);
    formData.append('district_id', currentLegend.value.district_id);

    if (selectedImageFile.value) {
      formData.append('image', selectedImageFile.value);
    } else if (!isEditing.value) {
      alert('Por favor, selecciona una imagen para la nueva leyenda.');
      return;
    }

    if (isEditing.value) {
      await api.put(`/${currentLegend.value.id}`, formData);
      alert('Leyenda actualizada con éxito!');
    } else {
      await api.post('/', formData);
      alert('Leyenda añadida con éxito!');
    }

    closeFormModal();
    fetchLegends();
  } catch (error) {
    console.error('Error saving legend:', error);
    let errorMessage = 'Error al guardar la leyenda.';
    if (error.response?.data?.detail) {
      errorMessage += ' Detalle: ' + (typeof error.response.data.detail === 'string' ? error.response.data.detail : JSON.stringify(error.response.data.detail));
    }
    alert(errorMessage + ' Verifique los datos e intente de nuevo.');
  }
};

const deleteLegend = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta leyenda?')) {
    try {
      await api.delete(`/${id}`);
      alert('Leyenda eliminada con éxito!');
      closeFormModal();
      fetchLegends();
    } catch (error) {
      console.error('Error deleting legend:', error);
      alert('Error al eliminar la leyenda. Por favor, intente de nuevo.');
    }
  }
};

onMounted(() => {
  fetchLegends();
  fetchAllProvinces();
  fetchAllCategories(); 
});
</script>

<style scoped>
/* Estilos omitidos por longitud, ya están en tu versión previa y están correctos */
</style>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.intro-text {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #666;
}

.action-bar {
  text-align: right;
  margin-bottom: 1.5rem;
}

.add-new-btn {
  background-color: #007BFF;
  color: #fff;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-new-btn:hover {
  background-color: #0056b3;
}

.legends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Modal Form */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-primary {
  background-color: #28a745;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .add-new-btn {
    width: 100%;
    text-align: center;
  }
}

</style>