<script setup>
import { ref, computed } from 'vue'

const currentQuestion = ref(0)
const userAnswers = ref({})
const showResults = ref(false)

const questions = [
  {
    id: 1,
    topic: 'Elements of a C Program',
    type: 'multiple-choice',
    question: 'Which function is always required in a C program?',
    options: ['start()', 'main()', 'printf()', 'run()'],
    answer: 'main()',
  },
  {
    id: 2,
    topic: 'Variables and Data Types',
    type: 'fill-blank',
    question: 'Fill in the blank to declare a float variable named score:',
    template: '______ score = 95.5;',
    options: ['float', 'int', 'char', 'double'],
    answer: 'float',
  },
  {
    id: 3,
    topic: 'Input and Output',
    type: 'multiple-choice',
    question: 'Which function is used to get input from the user?',
    options: ['print()', 'scanf()', 'cout', 'input()'],
    answer: 'scanf()',
  },
  {
    id: 4,
    topic: 'Input and Output',
    type: 'true-false',
    question: 'In scanf(), the & symbol is required before variables.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    id: 5,
    topic: 'Arithmetic Expressions',
    type: 'multiple-choice',
    question: 'What is the result of this code?',
    code: `int x = 12, y = 5;
printf("%d", x / y);`,
    options: ['2', '2.4', '3', '5'],
    answer: '2',
  },
  {
    id: 6,
    topic: 'Arithmetic Expressions',
    type: 'fill-blank',
    question: 'Fill in the blank to print the product of two variables a and b:',
    template: 'printf("%d", a ___ b);',
    options: ['+', '-', '*', '/', '%'],
    answer: '*',
  },
  {
    id: 7,
    topic: 'String Formatter',
    type: 'multiple-choice',
    question: 'Which format specifier is used for a string?',
    options: ['%d', '%s', '%c', '%f'],
    answer: '%s',
  },
  {
    id: 8,
    topic: 'String Formatter',
    type: 'true-false',
    question: 'The format specifier %.2f prints a float with 2 decimal places.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    id: 9,
    topic: 'Common Errors',
    type: 'multiple-choice',
    question: 'If a program runs but produces the wrong answer, what type of error is it?',
    options: ['Syntax Error', 'Logical Error', 'Runtime Error', 'Compiler Error'],
    answer: 'Logical Error',
  },
  {
    id: 10,
    topic: 'Debugging',
    type: 'multiple-choice',
    question: 'Find and fix the error in this code:',
    code: `#include <stdio.h>
int main() {
    int age = 20
    printf("Age: %d", age);
    return 0;
}

What causes the error?`,
    options: ['Missing semicolon', 'Wrong variable', 'Wrong format specifier'],
    answer: 'Missing semicolon',
  },
]

const totalQuestions = questions.length

const score = computed(() => {
  let correct = 0
  questions.forEach((q) => {
    if (userAnswers.value[q.id] === q.answer) {
      correct++
    }
  })
  return correct
})

const percentage = computed(() => {
  return Math.round((score.value / totalQuestions) * 100)
})

function nextQuestion() {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

function submitQuiz() {
  showResults.value = true
}

function retakeQuiz() {
  currentQuestion.value = 0
  userAnswers.value = {}
  showResults.value = false
}

function isAnswered(questionId) {
  return userAnswers.value[questionId] !== undefined
}

function getResultColor(questionId) {
  if (!showResults.value) return 'primary'
  return userAnswers.value[questionId] === questions.find((q) => q.id === questionId)?.answer
    ? 'success'
    : 'error'
}
</script>

<template>
  <v-container class="pa-8" style="max-width: 1000px">
    <!-- Quiz Header -->
    <div class="mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" to="/" class="mb-2"></v-btn>
      <h1 class="text-h4 font-weight-bold">Topic 1 Quiz: C Fundamentals</h1>
      <p class="text-subtitle-1 text-grey">Test your knowledge of C programming basics</p>
    </div>

    <!-- Results View -->
    <div v-if="showResults">
      <v-card class="pa-8 text-center" elevation="4">
        <v-icon :color="percentage >= 70 ? 'success' : 'warning'" size="80" class="mb-4">
          {{ percentage >= 70 ? 'mdi-trophy' : 'mdi-emoticon-sad' }}
        </v-icon>

        <h2 class="text-h3 font-weight-bold mb-2">{{ percentage }}%</h2>
        <p class="text-h6 mb-4">You scored {{ score }} out of {{ totalQuestions }}</p>

        <v-alert :type="percentage >= 70 ? 'success' : 'warning'" variant="tonal" class="mb-6">
          <div v-if="percentage >= 70">🎉 Great job! You passed the quiz!</div>
          <div v-else>📚 Keep practicing! Review the lessons and try again.</div>
        </v-alert>

        <!-- Review Answers -->
        <v-divider class="my-6"></v-divider>
        <h3 class="text-h5 mb-4">Review Your Answers</h3>

        <v-expansion-panels>
          <v-expansion-panel v-for="(question, index) in questions" :key="question.id">
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon :color="getResultColor(question.id)" class="mr-3">
                  {{
                    userAnswers[question.id] === question.answer
                      ? 'mdi-check-circle'
                      : 'mdi-close-circle'
                  }}
                </v-icon>
                <span>Question {{ index + 1 }}: {{ question.topic }}</span>
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <p class="text-subtitle-1 mb-3">{{ question.question }}</p>

              <div v-if="question.code" class="mb-3">
                <v-card color="grey-lighten-4" class="pa-3">
                  <pre class="code-block"><code>{{ question.code }}</code></pre>
                </v-card>
              </div>

              <div v-if="question.template" class="mb-3">
                <v-card color="grey-lighten-4" class="pa-3">
                  <code>{{ question.template }}</code>
                </v-card>
              </div>

              <div class="mb-2">
                <strong>Your answer:</strong>
                <v-chip
                  :color="userAnswers[question.id] === question.answer ? 'success' : 'error'"
                  size="small"
                  class="ml-2"
                >
                  {{ userAnswers[question.id] || 'Not answered' }}
                </v-chip>
              </div>

              <div v-if="userAnswers[question.id] !== question.answer">
                <strong>Correct answer:</strong>
                <v-chip color="success" size="small" class="ml-2">
                  {{ question.answer }}
                </v-chip>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="mt-6 d-flex gap-3 justify-center flex-wrap">
          <v-btn color="primary" size="large" prepend-icon="mdi-refresh" @click="retakeQuiz">
            Retake Quiz
          </v-btn>

          <v-btn color="success" size="large" prepend-icon="mdi-home" to="/">
            Back to Dashboard
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- Quiz Questions View -->
    <div v-else>
      <!-- Progress Bar -->
      <v-progress-linear
        class="mb-6"
        color="primary"
        rounded
        height="10"
        :model-value="((currentQuestion + 1) / totalQuestions) * 100"
      >
        <template v-slot:default>
          <span class="text-caption font-weight-bold">
            Question {{ currentQuestion + 1 }} / {{ totalQuestions }}
          </span>
        </template>
      </v-progress-linear>

      <!-- Question Card -->
      <v-card class="pa-8" elevation="4" min-height="450">
        <v-chip color="primary" class="mb-4">
          {{ questions[currentQuestion].topic }}
        </v-chip>

        <h2 class="text-h5 font-weight-bold mb-4">
          Question {{ currentQuestion + 1 }}: {{ questions[currentQuestion].question }}
        </h2>

        <!-- Code block for questions with code -->
        <div v-if="questions[currentQuestion].code" class="mb-4">
          <v-card color="grey-lighten-4" class="pa-4">
            <pre class="code-block"><code>{{ questions[currentQuestion].code }}</code></pre>
          </v-card>
        </div>

        <!-- Template for fill-in-blank -->
        <div v-if="questions[currentQuestion].template" class="mb-4">
          <v-card color="grey-lighten-4" class="pa-3">
            <code>{{ questions[currentQuestion].template }}</code>
          </v-card>
        </div>

        <!-- Answer Options -->
        <v-radio-group v-model="userAnswers[questions[currentQuestion].id]">
          <v-radio
            v-for="option in questions[currentQuestion].options"
            :key="option"
            :value="option"
            :label="option"
            color="primary"
            class="mb-2"
          ></v-radio>
        </v-radio-group>
      </v-card>

      <!-- Navigation -->
      <div class="d-flex justify-space-between align-center mt-6 flex-wrap gap-3">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-chevron-left"
          @click="prevQuestion"
          :disabled="currentQuestion === 0"
          size="large"
        >
          Previous
        </v-btn>

        <v-chip
          :color="isAnswered(questions[currentQuestion].id) ? 'success' : 'warning'"
          size="large"
        >
          {{ isAnswered(questions[currentQuestion].id) ? 'Answered' : 'Not Answered' }}
        </v-chip>

        <v-btn
          v-if="currentQuestion < totalQuestions - 1"
          color="primary"
          append-icon="mdi-chevron-right"
          @click="nextQuestion"
          size="large"
        >
          Next
        </v-btn>

        <v-btn
          v-else
          color="success"
          append-icon="mdi-check"
          @click="submitQuiz"
          size="large"
          :disabled="Object.keys(userAnswers).length < totalQuestions"
        >
          Submit Quiz
        </v-btn>
      </div>

      <!-- Question Navigation Dots -->
      <div class="d-flex justify-center gap-2 mt-6 flex-wrap">
        <v-btn
          v-for="(q, index) in questions"
          :key="q.id"
          :color="isAnswered(q.id) ? 'success' : 'grey-lighten-1'"
          :variant="currentQuestion === index ? 'elevated' : 'outlined'"
          size="small"
          icon
          @click="currentQuestion = index"
        >
          {{ index + 1 }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.code-block {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  overflow-x: auto;
}

pre {
  margin: 0;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
