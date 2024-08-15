import { createRouter, createWebHistory } from 'vue-router'
import mainLayout from '@/shared/layouts/mainLayout.vue'
import Home from '@/home/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: mainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})

export default router
