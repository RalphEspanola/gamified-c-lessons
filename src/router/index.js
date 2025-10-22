import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import Lesson1ElementsOfCProgram from '@/components/system/Topic1/Lesson1/Lesson1ElementsOfCProgram.vue'
import Lesson2VariablesAndDataTypes from '@/components/system/Topic1/Lesson2/Lesson2VariablesAndDataTypes.vue'
import Lesson3ExecutableStatements from '@/components/system/Topic1/Lesson3/Lesson3ExecutableStatements.vue'
import Lesson4ArithmeticExpressions from '@/components/system/Topic1/Lesson4/Lesson4ArithmeticExpressions.vue'
import Lesson5StringFormatter from '@/components/system/Topic1/Lesson5/Lesson5StringFormatter.vue'
import Lesson6CommonProgrammingErrors from '@/components/system/Topic1/Lesson6/Lesson6CommonProgrammingErrors.vue'

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
    {
      path: '/topic1/lesson3',
      name: 'Lesson3ExecutableStatements',
      component: Lesson3ExecutableStatements,
    },
    {
      path: '/topic1/lesson4',
      name: 'Lesson4ArithmeticExpressions',
      component: Lesson4ArithmeticExpressions,
    },
    {
      path: '/topic1/lesson5',
      name: 'Lesson5StringFormatter',
      component: Lesson5StringFormatter,
    },
    {
      path: '/topic1/lesson6',
      name: 'Lesson6CommonProgrammingErrors',
      component: Lesson6CommonProgrammingErrors,
    },
  ],
})

export default router
