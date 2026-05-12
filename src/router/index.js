import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Nyhedsoversigtside med karusel og alle nyheder
    {
      path: '/nyheder',
      name: 'nyheder',
      component: () => import('../views/NyhederView.vue'),
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
    },
    // Detaljeret nyhedsside som vises når man klikker "Læs mere" (id bruges til at finde den korrekte nyhed)
    {
      path: '/nyhed/:id',
      name: 'nyhed',
      component: () => import('../views/NyhedDetail.vue'),
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: () => import('../views/KontaktView.vue'),
    },
  ],
})

export default router
