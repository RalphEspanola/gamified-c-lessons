<script setup>
import { ref, computed, watch } from 'vue'
import { useXP } from '@/composables/system/useXP'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

const props = defineProps({
  modelValue: Boolean,
  xpEarned: { type: Number, required: true },
  coinsEarned: { type: Number, required: true },
  heartsEarned: { type: Number, required: true },
  perfectScore: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'continue'])

const { addXP } = useXP()
const { isDoubleXPActive, consumeDoubleXP } = useDoubleXP()

const xpGiven = ref(false)
const displayXP = ref(0)

const bonusXP = computed(() => (props.perfectScore ? 50 : 0))

watch(
  () => props.modelValue,
  (open) => {
    if (!open) {
      xpGiven.value = false
      displayXP.value = 0
      return
    }

    if (xpGiven.value) return

    let totalXP = props.xpEarned + bonusXP.value

    if (isDoubleXPActive.value) {
      totalXP *= 2
      consumeDoubleXP()
    }

    displayXP.value = totalXP
    addXP(totalXP)
    xpGiven.value = true
  },
)

function continueNext() {
  emit('update:modelValue', false)
  emit('continue')
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="450">
    <v-card class="completion-card">
      <div class="completion-header">
        <v-icon size="80" color="amber">mdi-star-circle</v-icon>
        <h1>Lesson Complete!</h1>
      </div>

      <div class="rewards-container">
        <div class="reward-item">
          <v-icon color="amber">mdi-coin</v-icon>
          <span>+{{ coinsEarned }} Coins</span>
        </div>

        <div class="reward-item">
          <v-icon color="red">mdi-heart</v-icon>
          <span>+{{ heartsEarned }} Heart</span>
        </div>

        <div class="reward-item">
          <v-icon color="indigo">mdi-lightning-bolt</v-icon>
          <span>+{{ displayXP }} XP</span>
        </div>
      </div>

      <v-btn block color="primary" @click="continueNext"> Continue </v-btn>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.completion-card {
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.completion-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.icon-bounce {
  animation: bounce 2s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-16px) scale(1.1);
  }
}

.completion-title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
}

.rewards-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 20px;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.reward-item:hover {
  transform: translateX(4px);
}

.coin-reward {
  background: linear-gradient(135deg, #fff9e6 0%, #ffe680 100%);
  border: 2px solid #ffc107;
}

.xp-reward {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%);
  border: 2px solid #667eea;
}

.reward-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.reward-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.reward-value {
  font-size: 20px;
  font-weight: 700;
  color: inherit;
}

.button-container {
  padding: 20px;
}

.continue-btn {
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  transform: scale(1.02);
}
</style>
