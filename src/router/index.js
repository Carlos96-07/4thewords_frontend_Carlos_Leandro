// ARCHIVO PARA CONFIGURAR LAS RUTAS DEL SISTEMA

import { createRouter, createWebHistory } from 'vue-router';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import LegendCrud from '../views/LegendCrud.vue';

const routes = [

  {
    path: '/',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin/legends', 
    name: 'AdminLegends',
    component: LegendCrud,
    meta: { requiresAuth: true }, // Ruta protegida
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protege las rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica si hay un token
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/') && isAuthenticated) {
    next('/admin/legends');
  } else {
   
    next();
  }
});

export default router;