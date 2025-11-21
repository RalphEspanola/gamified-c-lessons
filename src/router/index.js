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
import Lesson1TheWhileStatement from '@/components/system/Topic3/Lesson1TheWhileStatement.vue'
import Lesson2PhasesofLoopExecution from '@/components/system/Topic3/Lesson2PhasesOfLoopExecution.vue'
import Lesson3LoopsUsingTheWhileStatement from '@/components/system/Topic3/Lesson3LoopsUsingTheWhileStatement.vue'
import Lesson4TheSwitchStatement from '@/components/system/Topic3/Lesson4TheSwitchStatement.vue'
import Lesson5TheDoWhileStatement from '@/components/system/Topic3/Lesson5TheDo–WhileStatement.vue'
import Lesson6TheForStatement from '@/components/system/Topic3/Lesson6TheForStatement.vue'
import Lesson7NestedLogicAndLoop from '@/components/system/Topic3/Lesson7NestedLogicAndLoop.vue'
import Topic3Quiz from '@/components/system/Topic3/Topic3Quiz.vue'
import T4L1VoidDesign from '@/components/system/Topic4/T4L1VoidDesign.vue'
import T4L2UserFunctions from '@/components/system/Topic4/T4L2UserFunctions.vue'
import T4L3SyntaxSemantics from '@/components/system/Topic4/T4L3SyntaxSemantics.vue'
import T4L4Parameters from '@/components/system/Topic4/T4L4Parameters.vue'
import T4L5Designing from '@/components/system/Topic4/T4L5Designing.vue'
import T4Quiz from '@/components/system/Topic4/T4Quiz.vue'
import T5L1OneDimensionalArray from '@/components/system/Topic5/T5L1OneDimensionalArray.vue'
import T5L2WorkingWithStrings from '@/components/system/Topic5/T5L2WorkingWithStrings.vue'
import T5L3MultidimensionalArrays from '@/components/system/Topic5/T5L3MultidimensionalArrays.vue'
import T5L4BasicStringManipulations from '@/components/system/Topic5/T5L4BasicStringManipulations.vue'
import T5Quiz from '@/components/system/Topic5/T5Quiz.vue'
import ShopPage from '@/views/ShopPage.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

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
    {
      path: '/topic3/lesson1',
      name: 'Lesson1TheWhileStatement',
      component: Lesson1TheWhileStatement,
    },
    {
      path: '/topic3/lesson2',
      name: 'Lesson2PhasesofLoopExecution',
      component: Lesson2PhasesofLoopExecution,
    },
    {
      path: '/topic3/lesson3',
      name: 'Lesson3LoopsUsingTheWhileStatement',
      component: Lesson3LoopsUsingTheWhileStatement,
    },
    {
      path: '/topic3/lesson4',
      name: 'Lesson4TheSwitchStatement',
      component: Lesson4TheSwitchStatement,
    },
    {
      path: '/topic3/lesson5',
      name: 'Lesson5TheDoWhileStatement',
      component: Lesson5TheDoWhileStatement,
    },
    {
      path: '/topic3/lesson6',
      name: 'Lesson6TheForStatement',
      component: Lesson6TheForStatement,
    },
    {
      path: '/topic3/lesson7',
      name: 'Lesson7NestedLogicAndLoop',
      component: Lesson7NestedLogicAndLoop,
    },
    {
      path: '/topic3/Topic3Quiz',
      name: 'Topic3Quiz',
      component: Topic3Quiz,
    },
    {
      path: '/topic4/lesson1',
      name: 'T4L1VoidDesign',
      component: T4L1VoidDesign,
    },
    {
      path: '/topic4/lesson2',
      name: 'T4L2UserFunctions',
      component: T4L2UserFunctions,
    },
    {
      path: '/topic4/lesson3',
      name: 'T4L3SyntaxSemantics',
      component: T4L3SyntaxSemantics,
    },
    {
      path: '/topic4/lesson4',
      name: 'T4L4Parameters',
      component: T4L4Parameters,
    },
    {
      path: '/topic4/lesson5',
      name: 'T4L5Designing',
      component: T4L5Designing,
    },
    {
      path: '/topic4/Topic4Quiz',
      name: 'T4Quiz',
      component: T4Quiz,
    },
    {
      path: '/topic5/lesson1',
      name: 'T5L1OneDimensionalArray',
      component: T5L1OneDimensionalArray,
    },
    {
      path: '/topic5/lesson2',
      name: 'T5L2WorkingWithStrings',
      component: T5L2WorkingWithStrings,
    },
    {
      path: '/topic5/lesson3',
      name: 'T5L3MultidimensionalArrays',
      component: T5L3MultidimensionalArrays,
    },
    {
      path: '/topic5/lesson4',
      name: 'T5L4BasicStringManipulations',
      component: T5L4BasicStringManipulations,
    },
    {
      path: '/topic5/Topic5Quiz',
      name: 'T5Quiz',
      component: T5Quiz,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
