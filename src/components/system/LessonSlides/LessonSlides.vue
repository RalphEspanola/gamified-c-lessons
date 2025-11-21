<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHearts } from '@/composables/PowerUps/useHearts'
import { useShop } from '@/composables/system/useShop'

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
import ShopDialog from '../Shop/ShopDialog.vue'

const router = useRouter()

// ⭐ Add this
const emit = defineEmits(['lesson-complete'])

// Props
const props = defineProps({
  lessonTitle: { type: String, required: true },
  lessonDescription: { type: String, required: true },
  slides: { type: Array, required: true },
  backRoute: { type: String, default: '/' },
  completeRoute: { type: String, default: '/' },
})

// Reactive
const currentSlide = ref(0)
const showNoHeartsDialog = ref(false)
const showShopDialog = ref(false)
const wrongAnswerCount = ref(0)
const showCoinRewardDialog = ref(false)

// Hearts
const { canContinue, loseHeart, gainHeart } = useHearts()

// Shop
const { coins, addCoins, shopItems } = useShop()

// Current slide
const slide = computed(() => props.slides[currentSlide.value])

function handleWrongAnswer() {
  wrongAnswerCount.value++
  const lost = loseHeart()
  if (!canContinue.value && lost) {
    showNoHeartsDialog.value = true
  }
}

function handleCorrectAnswer() {
  wrongAnswerCount.value = 0
}

function nextSlide() {
  if (currentSlide.value < props.slides.length - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--
}

function goBack() {
  router.push(props.backRoute)
}

function completeLesson() {
  // Rewards
  gainHeart()
  addCoins(10)

  // ⭐ Emit event for parent (Learning Path)
  emit('lesson-complete')

  // Show reward dialog
  showCoinRewardDialog.value = true
}

function continueAfterReward() {
  router.push(props.completeRoute)
}

function openShop() {
  showShopDialog.value = true
}
</script>

<template>
  <v-container class="pa-8" style="max-width: 900px">
    <!-- Heart + Coins Display -->
    <div class="d-flex justify-space-between align-center mb-6 flex-wrap gap-3">
      <HeartDisplay />
      <v-chip color="yellow darken-2" text-color="black" size="large"> {{ coins }} 💰 </v-chip>
    </div>

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

    <!-- Dialogs -->
    <NoHeartsDialog v-model="showNoHeartsDialog" />
    <CoinRewardDialog
      v-model="showCoinRewardDialog"
      :xp-earned="100"
      :perfect-score="false"
      :coins-earned="10"
      @continue="continueAfterReward"
    />
  </v-container>
</template>
