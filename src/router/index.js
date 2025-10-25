import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import Lesson1ElementsOfCProgram from '@/components/system/Topic1/Lesson1/Lesson1ElementsOfCProgram.vue'
import Lesson2VariablesAndDataTypes from '@/components/system/Topic1/Lesson2/Lesson2VariablesAndDataTypes.vue'
import Lesson3ExecutableStatements from '@/components/system/Topic1/Lesson3/Lesson3ExecutableStatements.vue'
import Lesson4ArithmeticExpressions from '@/components/system/Topic1/Lesson4/Lesson4ArithmeticExpressions.vue'
import Lesson5StringFormatter from '@/components/system/Topic1/Lesson5/Lesson5StringFormatter.vue'
import Lesson6CommonProgrammingErrors from '@/components/system/Topic1/Lesson6/Lesson6CommonProgrammingErrors.vue'
import Topic1QuizCFundamentals from '@/components/system/Topic1/Topic1Quiz/Topic1QuizCFundamentals.vue'
import Lesson1ControlTructures from '@/components/system/Topic2/Lesson1ControlStructures.vue'
import Lesson2ConditionsAndLogicalExpressions from '@/components/system/Topic2/Lesson2ConditionsAndLogicalExpressions.vue'
import Lesson3TheIfStatement from '@/components/system/Topic2/Lesson3TheIfStatement.vue'
import Lesson4NestedIfStatement from '@/components/system/Topic2/Lesson4NestedIfStatement.vue'
import Lesson5DecisionStepsInAlgorithms from '@/components/system/Topic2/Lesson5DecisionStepsInAlgorithms.vue'
import Lesson6TheIfElseStatement from '@/components/system/Topic2/Lesson6TheIf–ElseStatement.vue'
import Lesson7NestedIfElseStatement from '@/components/system/Topic2/Lesson7NestedIf–ElseStatement.vue'
import Lesson8TheSwitchCaseStatement from '@/components/system/Topic2/Lesson8TheSwitchCaseStatement.vue'
import Topic2Quiz from '@/components/system/Topic2/Topic2Quiz.vue'

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
    {
      path: '/topic1/Topic1Quiz',
      name: 'Topic1QuizCFundamentals',
      component: Topic1QuizCFundamentals,
    },
    {
      path: '/topic2/lesson1',
      name: 'Lesson1ControlTructures',
      component: Lesson1ControlTructures,
    },
    {
      path: '/topic2/lesson2',
      name: 'Lesson2ConditionsAndLogicalExpressions',
      component: Lesson2ConditionsAndLogicalExpressions,
    },
    {
      path: '/topic2/lesson3',
      name: 'Lesson3TheIfStatement',
      component: Lesson3TheIfStatement,
    },
    {
      path: '/topic2/lesson4',
      name: 'Lesson4NestedIfStatement',
      component: Lesson4NestedIfStatement,
    },
    {
      path: '/topic2/lesson5',
      name: 'Lesson5DecisionStepsInAlgorithms',
      component: Lesson5DecisionStepsInAlgorithms,
    },
    {
      path: '/topic2/lesson6',
      name: 'Lesson6TheIfElseStatement',
      component: Lesson6TheIfElseStatement,
    },
    {
      path: '/topic2/lesson7',
      name: 'Lesson7NestedIfElseStatement',
      component: Lesson7NestedIfElseStatement,
    },
    {
      path: '/topic2/lesson8',
      name: 'Lesson8TheSwitchCaseStatement',
      component: Lesson8TheSwitchCaseStatement,
    },
    {
      path: '/topic2/Topic2Quiz',
      name: 'Topic2Quiz',
      component: Topic2Quiz,
    },
  ],
})

export default router
