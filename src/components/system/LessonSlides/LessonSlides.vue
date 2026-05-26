<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHearts } from '@/composables/PowerUps/useHearts'
import { useShop } from '@/composables/system/useShop'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

import CodeBlock from '../Functionalities/CodeBlock.vue'
import CodingTask from '../Functionalities/CodingTask.vue'
import ContentSection from '../Functionalities/ContentSection.vue'
import ExplanationSection from '../Functionalities/ExplanationSection.vue'
import MultipleQuiz from '../Functionalities/MultipleQuiz.vue'
import SingleQuiz from '../Functionalities/SingleQuiz.vue'
import ReferenceSection from '@/components/functionalities/ReferenceSection.vue'
import HeartDisplay from '../Functionalities/Heart System/HeartDisplay.vue'
import NoHeartsDialog from '../Functionalities/Heart System/NoHeartsDialog.vue'
import CoinRewardDialog from '../Shop/CoinRewardDialog.vue'

const router = useRouter()

const props = defineProps({
  lessonTitle: { type: String, required: true },
  lessonDescription: { type: String, required: true },
  slides: { type: Array, required: true },
  backRoute: { type: String, default: '/' },
  completeRoute: { type: String, default: '/' },
  topicId: { type: Number, required: true },
  lessonId: { type: Number },
  mode: { type: String, default: 'lesson' },
})

const emit = defineEmits(['lesson-complete', 'quiz-complete'])

const currentSlide = ref(0)
const showNoHeartsDialog = ref(false)
const showRewardDialog = ref(false)
const hadMistake = ref(false)
const hasAwardedRewardsThisSession = ref(false)
const doubleXPApplied = ref(false)

const rewardPayload = ref({
  xp: 0,
  coins: 0,
  hearts: 0,
  perfect: false,
})

const { coins, initializeShop } = useShop()
const { canContinue, loseHeart, gainHeart, initializeHearts } = useHearts()

const {
  completeLesson: completeLessonProgress,
  completeQuiz,
  isLessonCompleted,
  isQuizCompleted,
  initializeProgress,
} = useLearningProgress()

const { isDoubleXPActive, consumeDoubleXP, initializeDoubleXP } = useDoubleXP()

const alreadyCompleted = computed(() => {
  if (props.mode === 'quiz') {
    return isQuizCompleted(props.topicId)
  } else {
    return isLessonCompleted(props.topicId, props.lessonId)
  }
})

// ✅ True when the current slide is the references slide
const isReferencesSlide = computed(() => {
  return !!props.slides[currentSlide.value]?.references
})

onMounted(async () => {
  await Promise.all([
    initializeShop(),
    initializeHearts(),
    initializeProgress(),
    initializeDoubleXP(),
  ])

  console.log('📚 Lesson already completed on mount:', alreadyCompleted.value)

  if (!alreadyCompleted.value && !canContinue.value) {
    console.log('❌ No hearts available - showing dialog')
    showNoHeartsDialog.value = true
  }
})

function handleWrongAnswer() {
  hadMistake.value = true
  const lost = loseHeart()
  if (!canContinue.value && lost) showNoHeartsDialog.value = true
}

function handleCorrectAnswer() {
  // reserved for future use
}

function nextSlide() {
  if (!alreadyCompleted.value && !canContinue.value) {
    showNoHeartsDialog.value = true
    return
  }
  if (currentSlide.value < props.slides.length - 1) currentSlide.value++
}

function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--
}

function goBack() {
  router.push(props.backRoute)
}

function handleNoHeartsClose() {
  showNoHeartsDialog.value = false
  if (!canContinue.value && !alreadyCompleted.value) {
    router.push(props.backRoute)
  }
}

async function handleCompleteLesson() {
  console.log('🎯 Complete button clicked')
  console.log('📊 Already completed:', alreadyCompleted.value)
  console.log('🎁 Already awarded this session:', hasAwardedRewardsThisSession.value)

  if (alreadyCompleted.value || hasAwardedRewardsThisSession.value) {
    console.log('⏭️ Already completed - navigating without showing dialog')
    router.push(props.completeRoute)
    return
  }

  console.log('✨ First completion - processing rewards')

  const perfectScore = !hadMistake.value

  let xpReward = props.mode === 'quiz' ? 150 : 100
  let coinsReward = props.mode === 'quiz' ? 20 : 10

  if (perfectScore) {
    xpReward += 50
  }

  console.log('🎁 Base XP reward:', xpReward)
  console.log('🎁 Perfect score:', perfectScore)
  console.log('⚡ Double XP active:', isDoubleXPActive.value)

  if (isDoubleXPActive.value) {
    xpReward *= 2
    await consumeDoubleXP()
    doubleXPApplied.value = true
    console.log('⚡ Double XP consumed. Final XP:', xpReward)
  } else {
    doubleXPApplied.value = false
  }

  rewardPayload.value = {
    xp: xpReward,
    coins: coinsReward,
    hearts: 1,
    perfect: perfectScore,
  }

  console.log('🎁 Giving heart reward')
  await gainHeart()

  hasAwardedRewardsThisSession.value = true
  showRewardDialog.value = true

  console.log('💾 Saving completion to database')
  if (props.mode === 'quiz') {
    await completeQuiz(props.topicId)
    emit('quiz-complete')
  } else {
    await completeLessonProgress(props.topicId, props.lessonId)
    emit('lesson-complete')
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
      <div class="d-flex gap-2">
        <v-chip v-if="isDoubleXPActive" color="yellow" text-color="black" size="large">
          <v-icon start>mdi-lightning-bolt</v-icon>
          2X XP ACTIVE
        </v-chip>
        <v-chip color="yellow darken-2" text-color="black" size="large"> {{ coins }} 💰 </v-chip>
      </div>
    </div>

    <!-- Lesson Header -->
    <div class="mb-6">
      <v-btn icon variant="text" class="mb-2" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="text-h4 font-weight-bold">{{ lessonTitle }}</h1>
      <p class="text-subtitle-1 text-grey">{{ lessonDescription }}</p>

      <v-chip v-if="alreadyCompleted" color="success" size="small" class="mt-2">
        <v-icon start size="small">mdi-check-circle</v-icon>
        Completed (Review Mode)
      </v-chip>
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

          <!-- ✅ References slide — renders when slide has a references array -->
          <ReferenceSection
            v-if="slideItem.references && slideItem.references.length > 0"
            :references="slideItem.references"
            :initial-count="2"
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
        {{
          alreadyCompleted
            ? 'Finish Review'
            : `Complete ${props.mode === 'quiz' ? 'Quiz' : 'Lesson'}`
        }}
      </v-btn>
    </div>

    <!-- Dialogs -->
    <NoHeartsDialog v-model="showNoHeartsDialog" @update:model-value="handleNoHeartsClose" />
    <CoinRewardDialog
      v-model="showRewardDialog"
      :xp-earned="rewardPayload.xp"
      :coins-earned="rewardPayload.coins"
      :hearts-earned="rewardPayload.hearts"
      :perfect-score="rewardPayload.perfect"
      :double-xp-applied="doubleXPApplied"
      @continue="continueAfterReward"
    />
  </v-container>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
