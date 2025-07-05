<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Título del Modal</h3>
            </slot>
            <button class="modal-close-button" @click="$emit('close')">&times;</button>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>Contenido del modal.</p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">Cerrar</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; 
}

.modal-wrapper {
  max-width: 90%; 
  max-height: 90%; 
  overflow-y: auto; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.modal-container {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 600px; 
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-close-button {
  background: none;
  border: none;
  font-size: 1.8em;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;
}
.modal-close-button:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  flex-grow: 1; 
  overflow-y: auto; 
  color: #555;
  line-height: 1.6;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end; 
  background-color: #f5f5f5;
}

.modal-default-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.modal-default-button:hover {
  background-color: #0056b3;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: all 0.3s ease;
}
.modal-fade-enter-from .modal-container,
.modal-fade-leave-to .modal-container {
  transform: scale(0.9);
}
</style>