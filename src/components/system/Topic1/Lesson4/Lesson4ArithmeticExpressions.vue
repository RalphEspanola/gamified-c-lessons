<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Think of C as your pocket calculator. It can add, subtract, multiply, divide, and even find remainders using arithmetic operators. These operations are the foundation for solving real problems in programming.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Arithmetic operators in C:

• **+** → addition
• **-** → subtraction
• ***** → multiplication
• **/** → division
• **%** → modulus (remainder of division)

Example:`,
    code: `int a = 10, b = 3;
printf("a + b = %d\\n", a + b); // 13
printf("a - b = %d\\n", a - b); // 7
printf("a * b = %d\\n", a * b); // 30
printf("a / b = %d\\n", a / b); // 3
printf("a %% b = %d\\n", a % b); // 1`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Which operator is used to get the remainder of a division?',
      options: ['+ addition', '- subtraction', '* multiplication', '% modulus'],
      answer: '% modulus',
    },
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    quiz: {
      question: 'What is the result of 15 / 4 in C (integer division)?',
      options: ['3', '3.75', '4', 'Error'],
      answer: '3',
    },
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>

int main() {
    int x = 7, y = 2;
    printf("x + y = %d\\n", x + y);
    printf("x - y = %d\\n", x - y);
    printf("x * y = %d\\n", x * y);
    printf("x / y = %d\\n", x / y);
    printf("x %% y = %d\\n", x % y);
    return 0;
}`,
    explanation: `**Explanation line by line:**

• x + y → adds two numbers.
• x - y → subtracts.
• x * y → multiplies.
• x / y → divides (but since both are int, it gives only the whole number).
• x % y → gives the remainder.`,
  },
  {
    id: 6,
    title: 'Quick Practice',
    multipleQuiz: [
      {
        question: 'Fill in the blank: printf("%d", 10 ___ 3); → prints 30',
        options: ['+', '-', '*', '/', '%'],
        answer: '*',
      },
      {
        question: 'What is the result of: printf("%d", 15 + 5);',
        options: ['20', '10', '5'],
        answer: '20',
      },
    ],
  },
  {
    id: 7,
    title: 'Deeper Practice / Coding Task',
    content: `Fill and complete the program that prints: x - y = 8`,
    codingTask: {
      template: `int x = 10, y = 2;

printf("x [__] y = [__]\\n", x [__] y);`,
      options: ['-', '%d', '+', '*', '%f'],
      answer: `int x = 10, y = 2;

printf("x - y = %d\\n", x - y);`,
    },
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `**Key Points to Remember:**

• Arithmetic operators: +, -, *, /, %.

• **%** gives the remainder in integer division.

• Division between integers ignores the decimal part.

• Always match data types (int vs float) when doing calculations.`,
  },
]

const selected = ref('')
const feedback = ref('')
const showAnswer = ref(false)
const practiceAnswers = ref({})

function checkAnswer(option, slide) {
  selected.value = option
  feedback.value =
    option === slide.quiz.answer ? '✅ Correct! Great job!' : '❌ Not quite. Try again!'
}

function checkPracticeAnswer(index, option, correctAnswer) {
  practiceAnswers.value[index] = {
    selected: option,
    isCorrect: option === correctAnswer,
  }
}

function nextSlide() {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
    selected.value = ''
    feedback.value = ''
    showAnswer.value = false
    practiceAnswers.value = {}
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
    selected.value = ''
    feedback.value = ''
    showAnswer.value = false
    practiceAnswers.value = {}
  }
}

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}
</script>

<template>
  <v-container class="pa-8" style="max-width: 900px">
    <!-- Lesson Header -->
    <div class="mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" to="/" class="mb-2"></v-btn>
      <h1 class="text-h4 font-weight-bold">Lesson 4: Arithmetic Expressions</h1>
      <p class="text-subtitle-1 text-grey">Master arithmetic operations in C</p>
    </div>

    <!-- Progress Bar -->
    <v-progress-linear
      class="mb-6"
      color="primary"
      rounded
      height="10"
      :model-value="((currentSlide + 1) / slides.length) * 100"
    >
      <template v-slot:default>
        <span class="text-caption font-weight-bold">
          {{ currentSlide + 1 }} / {{ slides.length }}
        </span>
      </template>
    </v-progress-linear>

    <!-- Slides Window -->
    <v-window v-model="currentSlide" class="elevation-4 rounded-lg">
      <v-window-item v-for="slide in slides" :key="slide.id">
        <v-card flat class="pa-8" min-height="400">
          <h2 class="text-h5 font-weight-bold mb-4 text-primary">{{ slide.title }}</h2>

          <!-- Content -->
          <div v-if="slide.content" class="text-body-1 mb-4" style="white-space: pre-line">
            {{ slide.content }}
          </div>

          <!-- Code Block -->
          <div v-if="slide.code" class="mb-4">
            <v-card color="grey-lighten-4" class="pa-4">
              <pre class="code-block"><code>{{ slide.code }}</code></pre>
            </v-card>
          </div>

          <!-- Explanation -->
          <div v-if="slide.explanation" class="text-body-1 mt-4" style="white-space: pre-line">
            {{ slide.explanation }}
          </div>

          <!-- Single Quiz -->
          <div v-if="slide.quiz">
            <h3 class="text-h6 mb-4">❓ {{ slide.quiz.question }}</h3>
            <v-btn
              v-for="option in slide.quiz.options"
              :key="option"
              class="ma-2"
              variant="outlined"
              size="large"
              :color="
                selected === option
                  ? option === slide.quiz.answer
                    ? 'success'
                    : 'error'
                  : 'primary'
              "
              @click="checkAnswer(option, slide)"
            >
              {{ option }}
            </v-btn>
            <v-alert
              v-if="feedback"
              :type="feedback.includes('✅') ? 'success' : 'error'"
              class="mt-4"
              variant="tonal"
            >
              {{ feedback }}
            </v-alert>
          </div>

          <!-- Multiple Quiz (Practice) -->
          <div v-if="slide.multipleQuiz">
            <div v-for="(quiz, index) in slide.multipleQuiz" :key="index" class="mb-6">
              <h3 class="text-h6 mb-3">❓ {{ quiz.question }}</h3>

              <v-btn
                v-for="option in quiz.options"
                :key="option"
                class="ma-1"
                variant="outlined"
                :color="
                  practiceAnswers[index]?.selected === option
                    ? practiceAnswers[index]?.isCorrect
                      ? 'success'
                      : 'error'
                    : 'primary'
                "
                @click="checkPracticeAnswer(index, option, quiz.answer)"
              >
                {{ option }}
              </v-btn>

              <v-alert
                v-if="practiceAnswers[index]"
                :type="practiceAnswers[index].isCorrect ? 'success' : 'info'"
                class="mt-3"
                variant="tonal"
              >
                <div v-if="practiceAnswers[index].isCorrect">✅ Correct!</div>
                <div v-else>
                  💡 Answer: <strong>{{ quiz.answer }}</strong>
                </div>
              </v-alert>

              <v-divider v-if="index < slide.multipleQuiz.length - 1" class="my-4"></v-divider>
            </div>
          </div>

          <!-- Coding Task -->
          <div v-if="slide.codingTask">
            <v-card color="grey-lighten-4" class="pa-4 mb-4">
              <pre class="code-block"><code>{{ slide.codingTask.template }}</code></pre>
            </v-card>

            <div class="mb-4">
              <h4 class="text-subtitle-1 mb-2">Available choices:</h4>
              <v-chip
                v-for="option in slide.codingTask.options"
                :key="option"
                class="ma-1"
                color="primary"
                size="large"
              >
                {{ option }}
              </v-chip>
            </div>

            <v-btn color="primary" variant="outlined" @click="toggleAnswer">
              {{ showAnswer ? 'Hide Answer' : 'Show Answer' }}
            </v-btn>

            <v-expand-transition>
              <v-card v-if="showAnswer" color="success-lighten-4" class="pa-4 mt-4">
                <h4 class="text-subtitle-1 mb-2 text-success-darken-2">Correct Answer:</h4>
                <pre class="code-block"><code>{{ slide.codingTask.answer }}</code></pre>
              </v-card>
            </v-expand-transition>
          </div>
        </v-card>
      </v-window-item>
    </v-window>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-space-between align-center mt-6">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-chevron-left"
        @click="prevSlide"
        :disabled="currentSlide === 0"
        size="large"
      >
        Previous
      </v-btn>

      <v-chip color="primary" size="large">
        Slide {{ currentSlide + 1 }} of {{ slides.length }}
      </v-chip>

      <v-btn
        v-if="currentSlide < slides.length - 1"
        color="primary"
        append-icon="mdi-chevron-right"
        @click="nextSlide"
        size="large"
      >
        Next
      </v-btn>

      <v-btn v-else color="success" append-icon="mdi-check" to="/" size="large">
        Complete Lesson
      </v-btn>
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
</style>
