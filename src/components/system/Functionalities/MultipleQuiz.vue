<script setup>
import { ref, triggerRef } from 'vue'

const props = defineProps({
  quizzes: {
    type: Array,
    required: true,
  },
})

const practiceAnswers = ref({})
const practiceBlankAnswers = ref({})
const practiceAvailableOptions = ref({})

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

  // Return previous answer to options if exists
  if (practiceBlankAnswers.value[quizIndex][blankId]) {
    practiceAvailableOptions.value[quizIndex].push(practiceBlankAnswers.value[quizIndex][blankId])
  }

  // Set new answer
  practiceBlankAnswers.value[quizIndex][blankId] = option

  // Remove selected option from available options
  const index = practiceAvailableOptions.value[quizIndex].indexOf(option)
  if (index > -1) {
    practiceAvailableOptions.value[quizIndex].splice(index, 1)
  }

  // Trigger reactivity
  triggerRef(practiceBlankAnswers)
  triggerRef(practiceAvailableOptions)

  // Clear check result
  if (practiceAnswers.value[quizIndex]) {
    delete practiceAnswers.value[quizIndex]
  }
}

function removePracticeBlank(quizIndex, blankId) {
  if (practiceBlankAnswers.value[quizIndex]?.[blankId]) {
    // Return option to available options
    practiceAvailableOptions.value[quizIndex].push(practiceBlankAnswers.value[quizIndex][blankId])

    // Remove the blank answer
    delete practiceBlankAnswers.value[quizIndex][blankId]

    // Trigger reactivity
    triggerRef(practiceBlankAnswers)
    triggerRef(practiceAvailableOptions)

    // Clear check result
    if (practiceAnswers.value[quizIndex]) {
      delete practiceAnswers.value[quizIndex]
    }
  }
}

function checkPracticeInteractive(quizIndex, quiz) {
  const blanks = quiz.blanks
  let correct = true

  for (const blank of blanks) {
    if (practiceBlankAnswers.value[quizIndex]?.[blank.id] !== blank.answer) {
      correct = false
      break
    }
  }

  practiceAnswers.value[quizIndex] = {
    selected: 'checked',
    isCorrect: correct,
  }
}

function isPracticeComplete(quizIndex, quiz) {
  if (!quiz.blanks) return false
  return quiz.blanks.every((blank) => practiceBlankAnswers.value[quizIndex]?.[blank.id])
}

function getPracticeFilledTemplate(quizIndex, quiz) {
  if (!quiz.template) return ''

  let template = quiz.template
  if (quiz.blanks) {
    quiz.blanks.forEach((blank) => {
      const value = practiceBlankAnswers.value[quizIndex]?.[blank.id]
      const displayValue = value ? value : `[${blank.id}]`
      template = template.replace(`[${blank.id}]`, displayValue)
    })
  }

  return template
}

function getCorrectTemplate(quiz) {
  if (!quiz.template) return ''

  let template = quiz.template
  if (quiz.blanks) {
    quiz.blanks.forEach((blank) => {
      template = template.replace(`[${blank.id}]`, blank.answer)
    })
  }

  return template
}
</script>

<template>
  <div>
    <div v-for="(quiz, index) in quizzes" :key="index" class="mb-6">
      <h3 class="text-h6 mb-3">❓ {{ quiz.question }}</h3>

      <!-- Interactive fill-in-the-blank -->
      <div v-if="quiz.interactive">
        <!-- Template Preview -->
        <v-card color="grey-lighten-4" class="pa-3 mb-3">
          <code>{{ getPracticeFilledTemplate(index, quiz) }}</code>
        </v-card>

        <!-- Blank Slots -->
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

        <!-- Check Button -->
        <v-btn
          color="success"
          size="small"
          @click="checkPracticeInteractive(index, quiz)"
          :disabled="!isPracticeComplete(index, quiz)"
          class="mt-2"
        >
          Check Answer
        </v-btn>
      </div>

      <!-- Feedback Alert -->
      <v-alert
        v-if="practiceAnswers[index]"
        :type="practiceAnswers[index].isCorrect ? 'success' : 'info'"
        class="mt-3"
        variant="tonal"
      >
        <div v-if="practiceAnswers[index].isCorrect">✅ Correct!</div>
        <div v-else>
          <div class="mb-2">💡 Not quite right. The correct answer is:</div>
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
