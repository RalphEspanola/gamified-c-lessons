<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine writing a recipe: you list ingredients, then give step-by-step instructions.
A C program works the same way — it needs a structure before the computer can "follow instructions."`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `A simple C program has four main parts:

**Preprocessor directive** → tells the compiler which libraries to use.
  Example: #include <stdio.h> for input/output.

**main() function** → the program starts here.

**Statements** → actual instructions inside { }.

**return 0;** → tells the computer the program ended successfully.`,
  },
  {
    id: 3,
    title: 'Check for Understanding',
    quiz: {
      question: 'What tells the compiler which library to use in a program?',
      options: ['main() function', 'Statements', 'Preprocessor directive'],
      answer: 'Preprocessor directive',
    },
  },
  {
    id: 4,
    title: 'Guided Example',
    content: `Example:`,
    code: `#include <stdio.h>
int main() {
  printf("Hello!");
  return 0;
}`,
    explanation: `**Explanation line by line:**

• #include <stdio.h> → allows us to use printf().
• int main() → defines the starting point.
• { ... } → holds the program's instructions.
• printf("Hello!"); → displays text.
• return 0; → program finishes without errors.`,
  },
  {
    id: 5,
    title: 'Quick Practice',
    quiz: {
      question: 'Which function is always required in a C program?',
      options: ['main()', 'printf()', 'return()', 'start()'],
      answer: 'main()',
    },
  },
  {
    id: 6,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program by dragging the correct elements:`,
    codingTask: {
      template: `[__]include <stdio.h>
[___] main() {
  [____]("Welcome to ITE 12")[__]
  [____] 0[__]
[_]`,
      options: ['#', 'int', 'printf', 'return', '}', ';'],
      answer: `#include <stdio.h>
int main() {
  printf("Welcome to ITE 12");
  return 0;
}`,
    },
  },
  {
    id: 7,
    title: 'Lesson Takeaways',
    content: `**Key Points to Remember:**

• Every C program starts with **main()**.

• #include <stdio.h> lets us use input/output functions.

• return 0; ends the program successfully.

• All statements must end with a semicolon (;).`,
  },
]

const selected = ref('')
const feedback = ref('')
const showAnswer = ref(false)

function checkAnswer(option, slide) {
  selected.value = option
  feedback.value =
    option === slide.quiz.answer ? '✅ Correct! Great job!' : '❌ Not quite. Try again!'
}

function nextSlide() {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
    selected.value = ''
    feedback.value = ''
    showAnswer.value = false
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
    selected.value = ''
    feedback.value = ''
    showAnswer.value = false
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
      <h1 class="text-h4 font-weight-bold">Lesson 1: Elements of a C Program</h1>
      <p class="text-subtitle-1 text-grey">Learn the basic structure of C programs</p>
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

          <!-- Quiz -->
          <div v-if="slide.quiz">
            <h3 class="text-h6 mb-4">{{ slide.quiz.question }}</h3>
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

          <!-- Coding Task -->
          <div v-if="slide.codingTask">
            <v-card color="grey-lighten-4" class="pa-4 mb-4">
              <pre class="code-block"><code>{{ slide.codingTask.template }}</code></pre>
            </v-card>

            <div class="mb-4">
              <h4 class="text-subtitle-1 mb-2">Available options:</h4>
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
