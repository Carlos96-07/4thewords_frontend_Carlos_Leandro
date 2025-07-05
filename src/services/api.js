// ARCHIVO QUE FUNCIONA PARA INTERCAMBIAR DATA CON EL BACK-END

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);


// Función para login
export function login(email, password) {
  const form = new FormData();
  form.append('username', email);
  form.append('password', password);
  return api.post('/auth/login', form);
}

export function getWithToken(url) {
  return api.get(url);
}

export function postWithToken(url, data) {
  return api.post(url, data);
}

export function getByIdWithToken(url) {
  return api.get(url);
}

export function putWithToken(url, data) {
  return api.put(url, data);
}

export function deleteWithToken(url) {
  return api.delete(url);
}

export function uploadImageWithToken(formData) {
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function fetchProvinces() {
  return api.get('/location/provinces');
}

export function fetchCantons(provinceId) {
  return api.get(`/location/cantons?province_id=${provinceId}`);
}

export function fetchDistricts(cantonId) {
  return api.get(`/location/districts?canton_id=${cantonId}`);
}

export function fetchCategories() {
  return api.get('/location/categories');
}


export default api;
