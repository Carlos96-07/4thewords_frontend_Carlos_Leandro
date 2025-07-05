<template>
  <button :type="type" :class="['base-button', variantClass]" :disabled="loading || disabled">
    <span v-if="loading" class="spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  variant: {
    type: String,
    default: 'primary', 
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClass = computed(() => `base-button--${props.variant}`);
</script>

<style scoped>
.base-button {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Primary variant */
.base-button--primary {
  background-color: #42b983;
  color: white;
}
.base-button--primary:hover:not(:disabled) {
  background-color: #369c73;
}

/* Secondary variant */
.base-button--secondary {
  background-color: #6c757d;
  color: white;
}
.base-button--secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

/* Danger variant */
.base-button--danger {
  background-color: #e74c3c;
  color: white;
}
.base-button--danger:hover:not(:disabled) {
  background-color: #c0392b;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner for loading state */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>