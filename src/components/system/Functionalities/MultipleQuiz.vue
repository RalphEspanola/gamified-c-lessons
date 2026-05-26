<script setup>
import { ref, triggerRef, onMounted } from 'vue'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'
import { useShop } from '@/composables/system/useShop'
import AnswerFeedback from './System/AnswerFeedback.vue'

const props = defineProps({
  quizzes: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['wrong-answer', 'correct-answer', 'use-show-answer'])

const practiceAnswers = ref({})
const practiceBlankAnswers = ref({})
const practiceAvailableOptions = ref({})

// Feedback overlay — one per quiz index
const showFeedback = ref({})
const answeredCorrect = ref({})

const { useProtection, initializeProtection } = useAnswerProtection()
const { spendCoins, canAfford, initializeShop } = useShop()

const SHOW_ANSWER_COST = 3

onMounted(async () => {
  await Promise.all([initializeShop(), initializeProtection()])
})

function triggerFeedback(quizIndex, correct) {
  answeredCorrect.value[quizIndex] = correct
  showFeedback.value[quizIndex] = true
  triggerRef(showFeedback)
  triggerRef(answeredCorrect)
}

function onFeedbackDone(quizIndex) {
  showFeedback.value[quizIndex] = false
  triggerRef(showFeedback)
}

function initPracticeInteractive(quizIndex, quiz) {
  if (!practiceBlankAnswers.value[quizIndex]) {
    practiceBlankAnswers.value[quizIndex] = {}
  }
  if (!practiceAvailableOptions.value[quizIndex]) {
    practiceAvailableOptions.value[quizIndex] = [...quiz.options]
  }
}

function selectPracticeOption(quizIndex, blankId, option) {
  if (!blankId) return

  if (!practiceBlankAnswers.value[quizIndex]) {
    practiceBlankAnswers.value[quizIndex] = {}
  }

  if (practiceBlankAnswers.value[quizIndex][blankId]) {
    practiceAvailableOptions.value[quizIndex].push(practiceBlankAnswers.value[quizIndex][blankId])
  }

  practiceBlankAnswers.value[quizIndex][blankId] = option

  const index = practiceAvailableOptions.value[quizIndex].indexOf(option)
  if (index > -1) {
    practiceAvailableOptions.value[quizIndex].splice(index, 1)
  }

  triggerRef(practiceBlankAnswers)
  triggerRef(practiceAvailableOptions)

  if (practiceAnswers.value[quizIndex]) {
    delete practiceAnswers.value[quizIndex]
  }
}

function removePracticeBlank(quizIndex, blankId) {
  if (practiceBlankAnswers.value[quizIndex]?.[blankId]) {
    practiceAvailableOptions.value[quizIndex].push(practiceBlankAnswers.value[quizIndex][blankId])
    delete practiceBlankAnswers.value[quizIndex][blankId]

    triggerRef(practiceBlankAnswers)
    triggerRef(practiceAvailableOptions)

    if (practiceAnswers.value[quizIndex]) {
      delete practiceAnswers.value[quizIndex]
    }
  }
}

async function checkPracticeInteractive(quizIndex, quiz) {
  const blanks = quiz.blanks

  let allCorrect = true
  for (const blank of blanks) {
    const userAnswer = practiceBlankAnswers.value[quizIndex]?.[blank.id]
    if (userAnswer !== blank.answer) {
      allCorrect = false
      break
    }
  }

  if (allCorrect) {
    practiceAnswers.value[quizIndex] = {
      selected: 'checked',
      isCorrect: true,
      protectionTriggered: false,
    }
    triggerFeedback(quizIndex, true)
    emit('correct-answer')
    return
  }

  const protectedOnce = await useProtection()

  if (protectedOnce) {
    practiceAnswers.value[quizIndex] = {
      selected: 'checked',
      isCorrect: false,
      protectionTriggered: true,
    }
    triggerFeedback(quizIndex, false)
    return
  }

  practiceAnswers.value[quizIndex] = {
    selected: 'checked',
    isCorrect: false,
    protectionTriggered: false,
  }
  triggerFeedback(quizIndex, false)
  emit('wrong-answer')
}

function isPracticeComplete(quizIndex, quiz) {
  if (!quiz.blanks) return false
  return quiz.blanks.every((blank) => practiceBlankAnswers.value[quizIndex]?.[blank.id])
}

function getPracticeFilledTemplate(quizIndex, quiz) {
  if (!quiz.template) return ''
  let template = quiz.template
  quiz.blanks.forEach((blank) => {
    const val = practiceBlankAnswers.value[quizIndex]?.[blank.id]
    template = template.replace(`[${blank.id}]`, val || `[${blank.id}]`)
  })
  return template
}

function getCorrectTemplate(quiz) {
  if (!quiz.template) return ''
  let template = quiz.template
  quiz.blanks.forEach((blank) => {
    template = template.replace(`[${blank.id}]`, blank.answer)
  })
  return template
}

async function revealOneAnswer(quizIndex, quiz) {
  if (!canAfford(SHOW_ANSWER_COST)) {
    console.warn('Not enough coins')
    return
  }

  const blanks = quiz.blanks
  const targetBlank = blanks.find((blank) => {
    const current = practiceBlankAnswers.value[quizIndex]?.[blank.id]
    return current !== blank.answer
  })

  if (!targetBlank) return

  const success = await spendCoins(SHOW_ANSWER_COST)
  if (!success) {
    console.warn('Failed to spend coins')
    return
  }

  if (!practiceBlankAnswers.value[quizIndex]) {
    practiceBlankAnswers.value[quizIndex] = {}
  }

  practiceBlankAnswers.value[quizIndex][targetBlank.id] = targetBlank.answer

  const idx = practiceAvailableOptions.value[quizIndex]?.indexOf(targetBlank.answer)
  if (idx > -1) {
    practiceAvailableOptions.value[quizIndex].splice(idx, 1)
  }

  triggerRef(practiceBlankAnswers)
  triggerRef(practiceAvailableOptions)

  emit('use-show-answer', {
    quizIndex,
    blankId: targetBlank.id,
    cost: SHOW_ANSWER_COST,
  })
}
</script>

<template>
  <div>
    <div v-for="(quiz, index) in quizzes" :key="index" class="mb-6">
      <h3 class="text-h6 mb-3">❓ {{ quiz.question }}</h3>

      <!-- Interactive mode -->
      <div v-if="quiz.interactive" style="position: relative">
        <!-- Feedback overlay -->
        <AnswerFeedback
          :show="showFeedback[index] || false"
          :correct="answeredCorrect[index] || false"
          :xp-gained="10"
          @done="onFeedbackDone(index)"
        />

        <!-- Template preview -->
        <v-card color="grey-lighten-4" class="pa-3 mb-3">
          <code>{{ getPracticeFilledTemplate(index, quiz) }}</code>
        </v-card>

        <!-- Blanks -->
        <div class="mb-3">
          <div class="text-caption mb-2">Fill in the blanks:</div>
          <div class="d-flex flex-wrap gap-1">
            <v-chip
              v-for="blank in quiz.blanks"
              :key="`blank-${index}-${blank.id}-${practiceBlankAnswers[index]?.[blank.id] || 'empty'}`"
              :color="
                practiceAnswers[index]
                  ? practiceBlankAnswers[index]?.[blank.id] === blank.answer
                    ? 'success'
                    : practiceAnswers[index].protectionTriggered
                      ? 'info'
                      : 'error'
                  : practiceBlankAnswers[index]?.[blank.id]
                    ? 'primary'
                    : 'grey-lighten-2'
              "
              :variant="!practiceBlankAnswers[index]?.[blank.id] ? 'outlined' : 'flat'"
              :closable="!!practiceBlankAnswers[index]?.[blank.id]"
              @click:close="removePracticeBlank(index, blank.id)"
              size="small"
            >
              {{ practiceBlankAnswers[index]?.[blank.id] || `Blank ${blank.id}` }}
            </v-chip>
          </div>
        </div>

        <!-- Options -->
        <div class="mb-2">
          <div class="text-caption mb-1">Options:</div>
          <v-chip
            v-for="(option, optIdx) in (() => {
              initPracticeInteractive(index, quiz)
              return practiceAvailableOptions[index] || []
            })()"
            :key="`opt-${optIdx}`"
            color="primary"
            variant="outlined"
            size="small"
            class="ma-1 cursor-pointer"
            @click="
              selectPracticeOption(
                index,
                quiz.blanks.find((b) => !practiceBlankAnswers[index]?.[b.id])?.id,
                option,
              )
            "
          >
            {{ option }}
          </v-chip>
        </div>

        <!-- Show Answer Button -->
        <v-btn
          color="deep-purple-accent-3"
          variant="tonal"
          size="small"
          class="mt-2"
          @click="revealOneAnswer(index, quiz)"
        >
          Show Answer ({{ SHOW_ANSWER_COST }} coins)
        </v-btn>

        <!-- Check Answer -->
        <v-btn
          color="success"
          size="small"
          class="mt-2 ml-2"
          @click="checkPracticeInteractive(index, quiz)"
          :disabled="!isPracticeComplete(index, quiz)"
        >
          Check Answer
        </v-btn>
      </div>

      <!-- Feedback alert -->
      <v-alert
        v-if="practiceAnswers[index]"
        :type="
          practiceAnswers[index].isCorrect
            ? 'success'
            : practiceAnswers[index].protectionTriggered
              ? 'info'
              : 'error'
        "
        class="mt-3"
        variant="tonal"
      >
        <div v-if="practiceAnswers[index].isCorrect">✅ Correct!</div>
        <div v-else-if="practiceAnswers[index].protectionTriggered">
          🛡️ Answer Protection saved you! No heart lost.
        </div>
        <div v-else>
          <div class="mb-2">💡 Not quite right. The correct answer:</div>
          <v-card color="white" class="pa-2">
            <code>{{ getCorrectTemplate(quiz) }}</code>
          </v-card>
        </div>
      </v-alert>

      <v-divider v-if="index < quizzes.length - 1" class="my-4"></v-divider>
    </div>
  </div>
</template>

<style scoped>
.gap-1 {
  gap: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
