<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'
import AnswerFeedback from './System/AnswerFeedback.vue'

const props = defineProps({
  task: { type: Object, required: true },
})
const emit = defineEmits(['wrong-answer', 'correct-answer', 'use-show-answer'])

const blankAnswers = ref({})
const availableOptions = ref([...props.task.options])
const checkResult = ref(null)
const protectionTriggered = ref(false)
const showAnswer = ref(false)

// Feedback overlay
const showFeedback = ref(false)
const answeredCorrect = ref(false)

const { useProtection, initializeProtection } = useAnswerProtection()

onMounted(async () => {
  await initializeProtection()
})

function selectOption(blankId, option) {
  if (!blankId) return

  if (blankAnswers.value[blankId]) {
    availableOptions.value.push(blankAnswers.value[blankId])
  }

  blankAnswers.value[blankId] = option
  const index = availableOptions.value.indexOf(option)
  if (index > -1) {
    availableOptions.value.splice(index, 1)
  }

  checkResult.value = null
  protectionTriggered.value = false
}

function removeBlankAnswer(blankId) {
  if (blankAnswers.value[blankId]) {
    availableOptions.value.push(blankAnswers.value[blankId])
    delete blankAnswers.value[blankId]
    checkResult.value = null
    protectionTriggered.value = false
  }
}

async function checkCodingTask() {
  const blanks = props.task.blanks

  let allCorrect = true
  for (const blank of blanks) {
    if (blankAnswers.value[blank.id] !== blank.answer) {
      allCorrect = false
      break
    }
  }

  if (allCorrect) {
    checkResult.value = true
    protectionTriggered.value = false
    answeredCorrect.value = true
    showFeedback.value = true
    emit('correct-answer')
    return
  }

  const wasProtected = await useProtection()

  if (wasProtected) {
    checkResult.value = false
    protectionTriggered.value = true
    answeredCorrect.value = false
    showFeedback.value = true
    return
  }

  checkResult.value = false
  protectionTriggered.value = false
  answeredCorrect.value = false
  showFeedback.value = true
  emit('wrong-answer')
}

function resetCodingTask() {
  blankAnswers.value = {}
  availableOptions.value = [...props.task.options]
  checkResult.value = null
  protectionTriggered.value = false
  showFeedback.value = false
}

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function onFeedbackDone() {
  showFeedback.value = false
}

const isTaskComplete = computed(() => {
  return props.task.blanks.every((blank) => blankAnswers.value[blank.id])
})

const getFilledTemplate = computed(() => {
  let template = props.task.template
  props.task.blanks.forEach((blank) => {
    const value = blankAnswers.value[blank.id]
    const displayValue = value ? value : `[${blank.id}]`
    template = template.replace(`[${blank.id}]`, displayValue)
  })
  return template
})
</script>

<template>
  <div style="position: relative">
    <!-- Feedback overlay -->
    <AnswerFeedback
      :show="showFeedback"
      :correct="answeredCorrect"
      :xp-gained="10"
      @done="onFeedbackDone"
    />

    <!-- Code Preview -->
    <v-card color="grey-lighten-4" class="pa-4 mb-4">
      <pre class="code-block"><code>{{ getFilledTemplate }}</code></pre>
    </v-card>

    <!-- Blank Slots -->
    <div class="mb-4">
      <h4 class="text-subtitle-1 mb-3">Fill in the blanks:</h4>
      <div class="d-flex flex-wrap gap-2">
        <div v-for="blank in task.blanks" :key="blank.id" class="blank-container">
          <div class="text-caption mb-1">Blank {{ blank.id }}:</div>
          <v-chip
            v-if="blankAnswers[blank.id]"
            :color="
              checkResult !== null
                ? blankAnswers[blank.id] === blank.answer
                  ? 'success'
                  : protectionTriggered
                    ? 'info'
                    : 'error'
                : 'primary'
            "
            closable
            @click:close="removeBlankAnswer(blank.id)"
            size="large"
          >
            {{ blankAnswers[blank.id] }}
          </v-chip>
          <v-chip v-else color="grey-lighten-2" variant="outlined" size="large">
            Blank {{ blank.id }}
          </v-chip>
        </div>
      </div>
    </div>

    <!-- Available Options -->
    <div class="mb-4">
      <h4 class="text-subtitle-1 mb-2">Available options:</h4>
      <div class="d-flex flex-wrap gap-2">
        <v-chip
          v-for="(option, index) in availableOptions"
          :key="`option-${index}`"
          color="primary"
          size="large"
          class="cursor-pointer"
          @click="selectOption(task.blanks.find((b) => !blankAnswers[b.id])?.id, option)"
        >
          {{ option }}
        </v-chip>
      </div>
      <p v-if="availableOptions.length === 0" class="text-caption text-grey mt-2">
        All options used. Click on chips to remove and reselect.
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="d-flex gap-2 mb-3 flex-wrap">
      <v-btn
        color="success"
        prepend-icon="mdi-check"
        @click="checkCodingTask"
        :disabled="!isTaskComplete"
      >
        Check Answer
      </v-btn>

      <v-btn color="warning" prepend-icon="mdi-refresh" variant="outlined" @click="resetCodingTask">
        Reset
      </v-btn>

      <v-btn color="primary" prepend-icon="mdi-eye" variant="outlined" @click="toggleAnswer">
        {{ showAnswer ? 'Hide' : 'Show' }} Answer
      </v-btn>
    </div>

    <!-- Result Alert -->
    <v-alert
      v-if="checkResult !== null || protectionTriggered"
      :type="checkResult ? 'success' : protectionTriggered ? 'info' : 'error'"
      variant="tonal"
      class="mb-3"
    >
      <div v-if="checkResult">✅ Excellent! Your code is correct!</div>
      <div v-else-if="protectionTriggered">🛡️ Answer Protection saved you! No heart lost.</div>
      <div v-else>❌ Some blanks are incorrect. Try again!</div>
    </v-alert>

    <!-- Show Answer -->
    <v-expand-transition>
      <v-card v-if="showAnswer" color="success-lighten-4" class="pa-4">
        <h4 class="text-subtitle-1 mb-2 text-success-darken-2">Correct Answer:</h4>
        <pre class="code-block"><code>{{ task.correctCode }}</code></pre>
      </v-card>
    </v-expand-transition>
  </div>
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

.blank-container {
  min-width: 100px;
}

.cursor-pointer {
  cursor: pointer;
}

.gap-2 {
  gap: 8px;
}
</style>
