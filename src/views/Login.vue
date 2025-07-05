<!-- Compónente de Acceso -->

<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required autocomplete="username" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required autocomplete="current-password" />
      </div>
      <button type="submit" class="btn-submit">Ingresar</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api'; 

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  try {
    const response = await login(email.value, password.value); 
    const token = response.data.access_token;

    localStorage.setItem('token', token);
    console.log(localStorage);

    // Redirige después de login exitoso
    router.push('/admin/legends');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.detail) {
      error.value = err.response.data.detail;
    } else {
      error.value = 'Ocurrió un error al intentar iniciar sesión.';
    }
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2.5rem 2rem;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
}

input[type="email"],
input[type="password"] {
  padding: 0.75rem 1rem;
  border: 1.8px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #2980b9;
  box-shadow: 0 0 5px rgba(41, 128, 185, 0.5);
}

.btn-submit {
  padding: 0.85rem 0;
  background: linear-gradient(135deg, #2980b9, #6dd5fa);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
  transition: background 0.4s ease;
}

.btn-submit:hover {
  background: linear-gradient(135deg, #6dd5fa, #2980b9);
  box-shadow: 0 7px 20px rgba(41, 128, 185, 0.6);
}

.error-message {
  margin-top: 1rem;
  color: #e74c3c;
  font-weight: 600;
  text-align: center;
  user-select: none;
  animation: shake 0.3s ease;
}

/* Animación sutil para error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
}
</style>
