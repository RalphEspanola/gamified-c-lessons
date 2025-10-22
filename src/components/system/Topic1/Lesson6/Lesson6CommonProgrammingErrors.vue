<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Mistakes happen — even professional programmers make errors! The key is to understand the types of errors so you can quickly find and fix them.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `Three main types of programming errors in C:

• **Syntax Error** – violates grammar rules of C.
  Example: forgetting a semicolon ;.

• **Logical Error** – program runs, but the output is wrong.
  Example: using + instead of -.

• **Runtime Error** – program compiles but crashes during execution.
  Example: dividing by zero.`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    quiz: {
      question: 'Forgetting a semicolon at the end of a statement causes what type of error?',
      options: ['Syntax Error', 'Logical Error', 'Runtime Error'],
      answer: 'Syntax Error',
    },
  },
  {
    id: 4,
    title: 'Guided Example - Syntax Error',
    content: `**Faulty Code (with Syntax Error):**`,
    code: `#include <stdio.h>

int main() {
    int x = 5      // ❌ missing semicolon
    printf("%d", x);
    return 0;
}`,
    explanation: `**✅ Fixed Code:**`,
    fixedCode: `int x = 5;        // ✅ semicolon added
printf("%d", x);`,
  },
  {
    id: 5,
    title: 'Guided Example - Logical Error',
    content: `**Faulty Code:**`,
    code: `#include <stdio.h>

int main() {
    int a = 10, b = 5;
    int sum = a - b;   // ❌ should be addition
    printf("The sum is %d", sum);
    return 0;
}`,
    explanation: `🧠 **What Happens:**
The program runs fine, but the output is incorrect because of the wrong operator.

**✅ Fixed Code:**`,
    fixedCode: `int sum = a + b;   // ✅ corrected to addition
printf("The sum is %d", sum);`,
  },
  {
    id: 6,
    title: 'Guided Example - Runtime Error',
    content: `**Faulty Code:**`,
    code: `#include <stdio.h>

int main() {
    int x = 10;
    int y = 0;
    int result = x / y;   // ❌ division by zero
    printf("Result: %d", result);
    return 0;
}`,
    explanation: `💥 **What Happens:**
The program compiles successfully but crashes while running due to division by zero.

**✅ Fixed Code:**`,
    fixedCode: `if (y != 0) {
    int result = x / y;
    printf("Result: %d", result);
} else {
    printf("Error: Cannot divide by zero.");
}`,
  },
  {
    id: 7,
    title: 'Check for Understanding (2)',
    quiz: {
      question:
        'If a program compiles and runs but gives the wrong answer, what type of error is it?',
      options: ['Runtime Error', 'Syntax Error', 'Logical Error'],
      answer: 'Logical Error',
    },
  },
  {
    id: 8,
    title: 'Check for Understanding (3)',
    quiz: {
      question: 'What happens if you divide an integer by zero in C?',
      options: ['Prints 0', 'Prints Infinity', 'Causes a runtime error', 'Skips the line'],
      answer: 'Causes a runtime error',
    },
  },
  {
    id: 9,
    title: 'Quick Practice',
    quiz: {
      question: 'Spot the error in this code:\n\nint a = 10, b = 0;\nprintf("%d", a / b);',
      options: ['Prints 0', 'Prints Infinity', 'Runtime Error'],
      answer: 'Runtime Error',
    },
  },
  {
    id: 10,
    title: 'Deeper Practice / Coding Task',
    content: `Here's a faulty code:`,
    code: `#include <stdio.h>

int main() {
    int num1 = 10, num2 = 5
    printf("Sum is: %d", num1 - num2);
    return 0;
}`,
    explanation: `💡 Find and fix the errors so the program correctly prints: **Sum is: 15**`,
    codingTask: {
      template: `Missing Code or Error Spotted:
[___] [___]`,
      options: ['+', '*', '-', ';'],
      answer: `Missing Code or Error Spotted:
[ ; ] [ + ]

int num1 = 10, num2 = 5 ;
printf("Sum is: %d", num1 + num2);`,
    },
  },
  {
    id: 11,
    title: 'Lesson Takeaways',
    content: `**Key Points to Remember:**

• **Syntax errors** → break the rules (compiler will not run the program).

• **Logical errors** → wrong logic, wrong results.

• **Runtime errors** → crash during program execution.

• **Debugging** = finding and fixing these errors.`,
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
      <h1 class="text-h4 font-weight-bold">Lesson 6: Common Programming Errors</h1>
      <p class="text-subtitle-1 text-grey">Learn to identify and fix programming errors</p>
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

          <!-- Fixed Code -->
          <div v-if="slide.fixedCode" class="mt-3">
            <v-card color="success-lighten-4" class="pa-4">
              <pre class="code-block"><code>{{ slide.fixedCode }}</code></pre>
            </v-card>
          </div>

          <!-- Quiz -->
          <div v-if="slide.quiz">
            <h3 class="text-h6 mb-4" style="white-space: pre-line">❓ {{ slide.quiz.question }}</h3>
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
