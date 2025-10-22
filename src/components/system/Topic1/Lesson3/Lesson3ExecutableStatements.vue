<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    id: 1,
    title: 'Introduction',
    content: `Imagine having a conversation: one person speaks, and the other listens. In C, printf() is speaking (output), and scanf() is listening (input). Executable statements make your program interactive.`,
  },
  {
    id: 2,
    title: 'Concept Explanation',
    content: `• **printf()** → displays output on the screen.
• **scanf()** → reads input from the user.
• Every statement must end with a semicolon **;**.

Example:`,
    code: `int number;
printf("Enter a number: ");
scanf("%d", &number);`,
  },
  {
    id: 3,
    title: 'Check for Understanding (1)',
    multipleQuiz: [
      {
        question: 'Which function is used to display output?',
        options: ['printf()', 'display()', 'output()'],
        answer: 'printf()',
      },
      {
        question: 'Drag and drop a code that prints hello:',
        template: '[____] [_____] [_____]',
        options: ['printf', '("hello")', ';'],
        answer: 'printf("hello");',
      },
    ],
  },
  {
    id: 4,
    title: 'Check for Understanding (2)',
    multipleQuiz: [
      {
        question: 'Which symbol is required in scanf() to store input into a variable?',
        options: ['* (asterisk)', '& (ampersand)', '# (hash)', '% (percent)'],
        answer: '& (ampersand)',
      },
      {
        question: 'Complete the code:',
        template: `int number;
printf("Enter a number: ");
____("%d", __number);`,
        options: ['printf', 'scanf', '%c', '&', '#'],
        answer: 'scanf("%d", &number);',
      },
    ],
  },
  {
    id: 5,
    title: 'Guided Example',
    content: `Example Code:`,
    code: `#include <stdio.h>
int main() {
    int number;
    printf("Enter a number: ");  // ask user
    scanf("%d", &number);        // read user input
    printf("You entered: %d", number);
    return 0;
}`,
    explanation: `**Explanation line by line:**

• int number; → declares a variable.
• printf("Enter a number: "); → prompts the user.
• scanf("%d", &number); → reads input into number.
• printf("You entered: %d", number); → displays the input.`,
  },
  {
    id: 6,
    title: 'Quick Practice',
    quiz: {
      question: 'Fill in the blank: scanf("___", &x); → to read an integer value.',
      options: ['%d', '%f', '%c', '%s'],
      answer: '%d',
    },
  },
  {
    id: 7,
    title: 'Deeper Practice / Coding Task',
    content: `Complete the program that asks the user to enter a number and then displays it back:`,
    codingTask: {
      template: `#include <stdio.h>
int main() {
    int [____];
    [____]("Enter a number: ");
    [___]("[___]", [__]number);
    printf("You entered: %d", number);
    return 0;
}`,
      options: ['&', 'number', 'scanf', '%d', 'printf', '%c', '%f', 'main'],
      answer: `#include <stdio.h>
int main() {
    int number;
    printf("Enter a number: ");
    scanf("%d", &number);
    printf("You entered: %d", number);
    return 0;
}`,
    },
  },
  {
    id: 8,
    title: 'Lesson Takeaways',
    content: `**Key Points to Remember:**

• Use **printf()** for output.

• Use **scanf()** for input.

• Always use **&** before variables in scanf().

• Statements must end with a semicolon **;**.

• Format specifiers: %d for int, %f for float, %c for char.`,
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
    isCorrect: option === correctAnswer || correctAnswer.includes(option),
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
      <h1 class="text-h4 font-weight-bold">Lesson 3: Executable Statements (Input & Output)</h1>
      <p class="text-subtitle-1 text-grey">Master input and output operations</p>
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

              <div v-if="quiz.template" class="mb-3">
                <v-card color="grey-lighten-4" class="pa-3">
                  <pre class="code-block"><code>{{ quiz.template }}</code></pre>
                </v-card>
              </div>

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
