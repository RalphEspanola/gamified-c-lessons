.coin-reward { background: linear-gradient(135deg, #fff9e6 0%, #ffe680 100%); border: 2px solid
#ffc107; } .heart-reward { background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%); border:
2px solid #ff5252; } .xp-reward { background: linear-gradient(135deg, #f0f4ff 0%, #e8f0ff 100%);
border: 2px solid #667eea; }
<script setup>
import { ref, computed, watch } from 'vue'
import { useXP } from '@/composables/system/useXP'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

// Props
const props = defineProps({
  modelValue: Boolean,
  xpEarned: Number,
  perfectScore: Boolean,
})

const emit = defineEmits(['update:modelValue', 'continue'])

// XP composable
const { addXP } = useXP()

// Double XP composable
const { isDoubleXPActive, consumeDoubleXP } = useDoubleXP()

// Track if XP was already given to avoid duplicates
const xpGiven = ref(false)

// XP breakdown
const baseXP = computed(() => props.xpEarned || 100)
const bonusXP = computed(() => (props.perfectScore ? 50 : 0))

// Coins earned
const coinsEarned = computed(() => (props.perfectScore ? 20 : 10))

// Hearts earned (always 1)
const heartsEarned = 1

// XP to display in dialog
const displayXP = ref(0)

// Watch dialog open to give XP
watch(
  () => props.modelValue,
  (isOpen) => {
    if (!isOpen) {
      xpGiven.value = false
      displayXP.value = 0
      return
    }

    if (!xpGiven.value) {
      // Compute total XP
      let xpToAdd = baseXP.value + bonusXP.value

      // Double XP logic
      if (isDoubleXPActive.value) {
        xpToAdd *= 2
        consumeDoubleXP() // Consume the double XP boost
        console.log('🔥 DOUBLE XP applied — final XP:', xpToAdd)
      }

      // Update display and add XP
      displayXP.value = xpToAdd
      addXP(xpToAdd)
      xpGiven.value = true

      console.log('XP added:', xpToAdd)
    }
  },
)

// Continue button
const continueToNext = () => {
  emit('update:modelValue', false)
  emit('continue')
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="450">
    <v-card class="completion-card">
      <!-- Header -->
      <div class="completion-header">
        <v-icon size="80" color="amber" class="icon-bounce">mdi-star-circle</v-icon>
        <h1 class="completion-title">Lesson Complete!</h1>
      </div>

      <!-- Rewards -->
      <div class="rewards-container">
        <!-- Coins Reward -->
        <div class="reward-item coin-reward">
          <v-icon size="40" color="amber">mdi-coin</v-icon>
          <div class="reward-content">
            <span class="reward-label">Coins Earned</span>
            <span class="reward-value">+{{ coinsEarned }}</span>
          </div>
        </div>

        <!-- Hearts Reward -->
        <div class="reward-item heart-reward">
          <v-icon size="40" color="red">mdi-heart</v-icon>
          <div class="reward-content">
            <span class="reward-label">Hearts Earned</span>
            <span class="reward-value">+{{ heartsEarned }}</span>
          </div>
        </div>

        <!-- XP Reward -->
        <div class="reward-item xp-reward">
          <v-icon size="40" color="indigo">mdi-lightning-bolt</v-icon>
          <div class="reward-content">
            <span class="reward-label">Experience Points</span>
            <span class="reward-value">+{{ displayXP }} XP</span>
          </div>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="button-container">
        <v-btn
          color="primary"
          size="large"
          block
          append-icon="mdi-arrow-right"
          @click="continueToNext"
          class="continue-btn"
        >
          Continue
        </v-btn>
      </div>
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
