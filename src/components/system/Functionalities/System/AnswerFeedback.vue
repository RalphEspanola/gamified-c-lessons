<!-- components/Functionalities/AnswerFeedback.vue -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  correct: { type: Boolean, default: true },
  xpGained: { type: Number, default: 0 },
})

const emit = defineEmits(['done'])

const visible = ref(false)
const showXP = ref(false)

const correctMessages = ['Great work!', 'Nailed it!', 'Keep it up!', 'You got it!', 'Excellent!']
const incorrectMessages = [
  'Review and try again.',
  'Not quite — check the concept.',
  'Almost there!',
]

const message = ref('')

watch(
  () => props.show,
  (val) => {
    if (val) {
      message.value = props.correct
        ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
        : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]

      visible.value = true
      if (props.correct && props.xpGained > 0) {
        setTimeout(() => (showXP.value = true), 200)
      }

      setTimeout(() => {
        visible.value = false
        showXP.value = false
        emit('done')
      }, 1800)
    }
  },
)
</script>

<template>
  <Transition name="feedback">
    <div
      v-if="visible"
      class="feedback-overlay"
      :class="correct ? 'feedback-correct' : 'feedback-incorrect'"
    >
      <!-- Particles (correct only) -->
      <div v-if="correct" class="particles">
        <span
          v-for="n in 16"
          :key="n"
          class="particle"
          :style="`--angle: ${(n / 16) * 360}deg; --dist: ${80 + (n % 4) * 20}px; --delay: ${n * 0.03}s; background: ${['#3aa95f', '#f5c842', '#4a90d9', '#e06fa0', '#a278e0'][n % 5]}`"
        />
      </div>

      <!-- Icon -->
      <div class="feedback-icon">
        {{ correct ? '✅' : '❌' }}
      </div>

      <!-- Label -->
      <div class="feedback-label">
        {{ correct ? 'Correct!' : 'Not quite' }}
      </div>

      <!-- Message -->
      <div class="feedback-msg">{{ message }}</div>

      <!-- XP float -->
      <Transition name="xp-float">
        <div v-if="showXP" class="xp-pop">+{{ xpGained }} XP</div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.feedback-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  z-index: 20;
  pointer-events: all;
}

.feedback-correct {
  background: rgba(58, 169, 95, 0.12);
}
.feedback-incorrect {
  background: rgba(220, 53, 69, 0.1);
}

.feedback-icon {
  font-size: 64px;
  line-height: 1;
}

.feedback-label {
  font-size: 22px;
  font-weight: 600;
  margin-top: 12px;
}

.feedback-correct .feedback-label {
  color: #1a7a3c;
}
.feedback-incorrect .feedback-label {
  color: #a32d2d;
}

.feedback-msg {
  font-size: 14px;
  margin-top: 6px;
  color: #666;
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: 12px;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  left: 50%;
  top: 40%;
  animation: particleFly calc(0.6s + var(--delay)) ease-out var(--delay) both;
  --tx: calc(cos(var(--angle)) * var(--dist));
  --ty: calc(sin(var(--angle)) * var(--dist) - 40px);
}

@keyframes particleFly {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(0.3);
  }
}

/* XP float */
.xp-pop {
  position: absolute;
  top: 28%;
  font-size: 20px;
  font-weight: 600;
  color: #1a7a3c;
  pointer-events: none;
}

.xp-float-enter-active {
  animation: xpFloat 1.2s ease-out forwards;
}

@keyframes xpFloat {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

/* Overlay enter/leave */
.feedback-enter-active {
  transition: opacity 0.15s;
}
.feedback-leave-active {
  transition: opacity 0.2s;
}
.feedback-enter-from,
.feedback-leave-to {
  opacity: 0;
}
</style>
