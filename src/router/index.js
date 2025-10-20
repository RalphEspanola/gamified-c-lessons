import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import Lesson1ElementsOfCProgram from '@/components/system/Topic1/Lesson1/Lesson1ElementsOfCProgram.vue'
import Lesson2VariablesAndDataTypes from '@/components/system/Topic1/Lesson2/Lesson2VariablesAndDataTypes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/topic1/lesson1',
      name: 'Lesson1ElementsOfCProgram',
      component: Lesson1ElementsOfCProgram,
    },
    {
      path: '/topic1/lesson2',
      name: 'Lesson2VariablesAndDataTypes',
      component: Lesson2VariablesAndDataTypes,
    },
  ],
})

export default router
