<template>
  <div class="card">
    <img v-if="image" :src="image" :alt="title" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ truncateDescription(description) }}</p>
      <button @click="$emit('click')" class="card-button">Ver Detalles</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  image: String, // URL de la imagen
  description: String,
});

const emit = defineEmits(['click']);

const truncateDescription = (desc) => {
  if (!desc) return '';
  const maxLength = 100; // Define el largo máximo de la descripción
  return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  display: block;
  border-bottom: 1px solid #eee;
}

.card-content {
  padding: 20px;
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
  text-align: left;
}

.card-description {
  font-size: 0.95em;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  text-align: left;
  flex-grow: 1; 
}

.card-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  align-self: flex-start;
  transition: background-color 0.3s ease;
}
.card-button:hover {
  background-color: #369c73;
}
</style>