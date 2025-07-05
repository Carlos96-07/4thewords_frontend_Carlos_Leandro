<template>
  <div class="form-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <template v-if="type === 'textarea'">
      <textarea
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :rows="rows"
        :class="{ 'input-error': error }"
      ></textarea>
    </template>
    <template v-else>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :class="{ 'input-error': error }"
      />
    </template>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'textarea'].includes(value),
  },
  error: String, // Mensaje de error para mostrar
  rows: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(['update:modelValue']);

const id = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box; 
}

input:focus, textarea:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
  outline: none;
}

.input-error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 5px;
}
</style>