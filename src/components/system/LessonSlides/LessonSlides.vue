<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHearts } from '@/composables/useHearts'

// Functional components
import CodeBlock from '../Functionalities/CodeBlock.vue'
import CodingTask from '../Functionalities/CodingTask.vue'
import ContentSection from '../Functionalities/ContentSection.vue'
import ExplanationSection from '../Functionalities/ExplanationSection.vue'
import MultipleQuiz from '../Functionalities/MultipleQuiz.vue'
import SingleQuiz from '../Functionalities/SingleQuiz.vue'
import HeartDisplay from '../Functionalities/Heart System/HeartDisplay.vue'
import NoHeartsDialog from '../Functionalities/Heart System/NoHeartsDialog.vue'
import CoinRewardDialog from '../Shop/CoinRewardDialog.vue'

const router = useRouter()

// Props definition
const props = defineProps({
  lessonTitle: {
    type: String,
    required: true,
  },
  lessonDescription: {
    type: String,
    required: true,
  },
  slides: {
    type: Array,
    required: true,
  },
  backRoute: {
    type: String,
    default: '/',
  },
  completeRoute: {
    type: String,
    default: '/',
  },
})

// Reactive state
const currentSlide = ref(0)

// Hearts system
const { canContinue, loseHeart, gainHeart } = useHearts()
const showNoHeartsDialog = ref(false)
const wrongAnswerCount = ref(0)

// Computed current slide data
const slide = computed(() => props.slides[currentSlide.value])

// Handle wrong answers
function handleWrongAnswer() {
  wrongAnswerCount.value++

  // Lose heart
  const lost = loseHeart()

  if (!canContinue.value && lost) {
    showNoHeartsDialog.value = true
  }
}

// Handle correct answers
function handleCorrectAnswer() {
  // Reset wrong answer count on correct
  wrongAnswerCount.value = 0
}

// Slide navigation
function nextSlide() {
  if (currentSlide.value < props.slides.length - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function goBack() {
  router.push(props.backRoute)
}

function completeLesson() {
  // Reward with a heart for completing the lesson
  gainHeart()
  router.push(props.completeRoute)
}
</script>

<template>
  <v-container class="pa-8" style="max-width: 900px">
    <!-- Heart Display -->
    <HeartDisplay class="mb-6" />

    <!-- Lesson Header -->
    <div class="mb-6">
      <v-btn icon variant="text" class="mb-2" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4 font-weight-bold">{{ lessonTitle }}</h1>
      <p class="text-subtitle-1 text-grey">{{ lessonDescription }}</p>
    </div>

    <!-- Progress Bar -->
    <v-progress-linear
      class="mb-6"
      color="primary"
      rounded
      height="10"
      :model-value="((currentSlide + 1) / slides.length) * 100"
    >
      <template #default>
        <span class="text-caption font-weight-bold">
          {{ currentSlide + 1 }} / {{ slides.length }}
        </span>
      </template>
    </v-progress-linear>

    <!-- Slides Window -->
    <v-window v-model="currentSlide" class="elevation-4 rounded-lg">
      <v-window-item v-for="(slideItem, index) in slides" :key="index" :value="index">
        <v-card flat class="pa-8" min-height="400">
          <h2 class="text-h5 font-weight-bold mb-4 text-primary">
            {{ slideItem.title }}
          </h2>

          <!-- Dynamic Sections -->
          <ContentSection v-if="slideItem.content" :content="slideItem.content" />

          <CodeBlock v-if="slideItem.code" :code="slideItem.code" />

          <ExplanationSection
            v-if="slideItem.explanation"
            :explanation="slideItem.explanation"
            :fixed-code="slideItem.fixedCode"
            :code2="slideItem.code2"
          />

          <SingleQuiz
            v-if="slideItem.quiz"
            :quiz="slideItem.quiz"
            @wrong-answer="handleWrongAnswer"
            @correct-answer="handleCorrectAnswer"
          />

          <MultipleQuiz
            v-if="slideItem.multipleQuiz"
            :quizzes="slideItem.multipleQuiz"
            @wrong-answer="handleWrongAnswer"
            @correct-answer="handleCorrectAnswer"
          />

          <CodingTask
            v-if="slideItem.codingTask"
            :task="slideItem.codingTask"
            @wrong-answer="handleWrongAnswer"
            @correct-answer="handleCorrectAnswer"
          />
        </v-card>
      </v-window-item>
    </v-window>

    <!-- Navigation Buttons -->
    <div class="d-flex justify-space-between align-center mt-6 flex-wrap gap-3">
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

      <v-btn v-else color="success" append-icon="mdi-check" @click="completeLesson" size="large">
        Complete Lesson
      </v-btn>
    </div>

    <!-- No Hearts Dialog -->
    <NoHeartsDialog v-model="showNoHeartsDialog" />
  </v-container>
</template>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>
