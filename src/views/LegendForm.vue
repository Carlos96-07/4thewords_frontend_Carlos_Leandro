<!-- COMPONENTE QUE FUNCIONA PARA INSERCIÓN DE DATOS Y ACTUALIZAR -->

<template>
  <div class="page-container form-card">
    <h1>{{ isEditing ? 'Editar Leyenda' : 'Crear Nueva Leyenda' }}</h1>
    <form @submit.prevent="submitForm">
      <BaseInput
        v-model="legend.title"
        label="Título"
        placeholder="Título de la leyenda"
        :error="errors.title"
      />
      <BaseInput
        v-model="legend.description"
        label="Descripción"
        type="textarea"
        placeholder="Una breve descripción de la leyenda"
        :error="errors.description"
      />
      <BaseInput
        v-model="legend.image_url"
        label="URL de la Imagen"
        placeholder="https://ejemplo.com/imagen.jpg"
        :error="errors.image_url"
      />
      <BaseInput
        v-model="legend.author"
        label="Autor"
        placeholder="Autor de la leyenda"
        :error="errors.author"
      />
      
      <div class="form-actions">
        <BaseButton type="submit" :loading="loading">{{ isEditing ? 'Guardar Cambios' : 'Crear Leyenda' }}</BaseButton>
        <BaseButton type="button" @click="cancel" variant="secondary">Cancelar</BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api'; 
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

const route = useRoute();
const router = useRouter();

const legend = reactive({
  title: '',
  description: '',
  image_url: '',
  author: ''
});

const errors = reactive({});
const loading = ref(false);
const isEditing = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    try {
      const response = await api.get(`/legends/${route.params.id}`);
      Object.assign(legend, response.data); // Llena el formulario con los datos existentes
    } catch (error) {
      console.error('Error al cargar leyenda para editar:', error);
    }
  }
});

const validateForm = () => {
  let isValid = true;
  errors.title = '';
  errors.description = '';

  if (!legend.title.trim()) {
    errors.title = 'El título es obligatorio.';
    isValid = false;
  }
  if (!legend.description.trim()) {
    errors.description = 'La descripción es obligatoria.';
    isValid = false;
  }
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/legends/${route.params.id}`, legend); // Endpoint PUT 
      console.log('Leyenda actualizada con éxito');
    } else {
      await api.post('/legends', legend); // Endpoint POST 
      console.log('Leyenda creada con éxito');
    }
    router.push('/legends'); // Redirige a la lista después de guardar
  } catch (error) {
    console.error('Error al guardar leyenda:', error);
  } finally {
    loading.value = false;
  }
};

const cancel = () => {
  router.push('/legends'); // Vuelve a la lista de leyendas
};
</script>

<style scoped>
.form-card {
  max-width: 600px;
  margin: 30px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}
.form-actions {
  display: flex;
  justify-content: flex-end; 
  gap: 15px; 
  margin-top: 30px;
}
</style>