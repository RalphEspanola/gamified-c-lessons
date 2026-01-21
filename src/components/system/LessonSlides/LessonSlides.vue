<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHearts } from '@/composables/PowerUps/useHearts'
import { useShop } from '@/composables/system/useShop'
import { useLearningProgress } from '@/composables/system/useLearningProgress'

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

// Props
const props = defineProps({
  lessonTitle: { type: String, required: true },
  lessonDescription: { type: String, required: true },
  slides: { type: Array, required: true },
  backRoute: { type: String, default: '/' },
  completeRoute: { type: String, default: '/' },
  topicId: { type: Number, required: true },
  lessonId: { type: Number },
  mode: { type: String, default: 'lesson' }, // 'lesson' | 'quiz'
})

// Emits
const emit = defineEmits(['quiz-complete'])

// Reactive state
const currentSlide = ref(0)
const showNoHeartsDialog = ref(false)
const showRewardDialog = ref(false)
const hadMistake = ref(false)

const rewardPayload = ref({
  xp: 0,
  coins: 0,
  hearts: 0,
  perfect: false,
})

// Composables
const { coins, addCoins } = useShop()
const { canContinue, loseHeart, gainHeart } = useHearts()
const { completeLesson: completeLessonProgress, completeQuiz } = useLearningProgress()

const slide = computed(() => props.slides[currentSlide.value])

// --- Quiz Handlers ---
function handleWrongAnswer() {
  hadMistake.value = true
  const lost = loseHeart()
  if (!canContinue.value && lost) showNoHeartsDialog.value = true
}
function handleCorrectAnswer() {
  // reset mistakes for current slide if needed
}

// --- Navigation ---
function nextSlide() {
  if (currentSlide.value < props.slides.length - 1) currentSlide.value++
}
function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--
}
function goBack() {
  router.push(props.backRoute)
}

// --- Complete Lesson / Quiz ---
function handleCompleteLesson() {
  let result

  if (props.mode === 'quiz') {
    result = completeQuiz(props.topicId, { perfectScore: !hadMistake.value })
  } else {
    result = completeLessonProgress(props.topicId, props.lessonId, {
      perfectScore: !hadMistake.value,
    })
  }

  if (result.awarded) {
    rewardPayload.value = {
      xp: result.xp,
      coins: result.coins,
      hearts: result.hearts,
      perfect: !hadMistake.value,
    }
    showRewardDialog.value = true
  } else {
    router.push(props.completeRoute)
  }
}

function continueAfterReward() {
  showRewardDialog.value = false
  router.push(props.completeRoute)
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

    <!-- Progress -->
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

    <!-- Slides -->
    <v-window v-model="currentSlide" class="elevation-4 rounded-lg">
      <v-window-item v-for="(slideItem, index) in slides" :key="index" :value="index">
        <v-card flat class="pa-8" min-height="400">
          <h2 class="text-h5 font-weight-bold mb-4 text-primary">{{ slideItem.title }}</h2>

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

    <!-- Navigation -->
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

      <v-btn
        v-else
        color="success"
        append-icon="mdi-check"
        @click="handleCompleteLesson"
        size="large"
      >
        Complete {{ props.mode === 'quiz' ? 'Quiz' : 'Lesson' }}
      </v-btn>
    </div>

    <!-- Dialogs -->
    <NoHeartsDialog v-model="showNoHeartsDialog" />
    <CoinRewardDialog
      v-model="showRewardDialog"
      :xp-earned="rewardPayload.xp"
      :coins-earned="rewardPayload.coins"
      :hearts-earned="rewardPayload.hearts"
      :perfect-score="rewardPayload.perfect"
      @continue="continueAfterReward"
    />
  </v-container>
</template>
