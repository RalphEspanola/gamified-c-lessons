import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import Lesson1ElementsOfCProgram from '@/components/system/Topic1/Lesson1/Lesson1ElementsOfCProgram.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/lessons/1',
      name: 'Lesson1ElementsOfCProgram',
      component: Lesson1ElementsOfCProgram,
    },
  ],
})

export default router
