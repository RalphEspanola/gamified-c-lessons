<script setup>
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

// Composables
const { addXP } = useXP()
const { isDoubleXPActive, consumeDoubleXP } = useDoubleXP()

// Reward XP immediately when dialog opens
function rewardXP() {
  let totalXP = 150 // fixed XP
  if (props.perfectScore) totalXP += 50

  if (isDoubleXPActive.value) {
    totalXP *= 2
    consumeDoubleXP()
  }

  addXP(totalXP)
  return totalXP
}

const rewardedXP = rewardXP()
function continueNext() {
  emit('update:modelValue', false)
  emit('continue')
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="450">
    <transition name="completion-pop">
      <v-card class="completion-card">
        <!-- HEADER -->
        <div class="completion-header">
          <v-icon size="80" color="amber" class="icon-bounce">mdi-star-circle</v-icon>
          <h1 class="completion-title">Lesson Complete!</h1>
        </div>

        <!-- REWARDS -->
        <div class="rewards-container">
          <!-- Coins -->
          <div class="reward-item coin-reward">
            <v-icon color="amber">mdi-coin</v-icon>
            <span>+{{ props.coinsEarned }} Coins</span>
          </div>

          <!-- Hearts -->
          <div class="reward-item heart-reward">
            <v-icon color="red">mdi-heart</v-icon>
            <span>+{{ props.heartsEarned }} Heart</span>
          </div>

          <!-- XP -->
          <div class="reward-item xp-reward">
            <v-icon color="indigo">mdi-lightning-bolt</v-icon>
            <span>+{{ rewardedXP }} XP</span>
          </div>
        </div>

        <!-- BUTTON -->
        <div class="button-container">
          <v-btn block color="primary" @click="continueNext"> Continue </v-btn>
        </div>
      </v-card>
    </transition>
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
  padding: 32px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.completion-title {
  font-size: 28px;
  font-weight: 700;
}
.icon-bounce {
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px) scale(1.1);
  }
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
  font-weight: 600;
}
.coin-reward {
  background: linear-gradient(135deg, #fff9e6, #ffe680);
  border: 2px solid #ffc107;
}
.heart-reward {
  background: linear-gradient(135deg, #ffe6e6, #ffb3b3);
  border: 2px solid #ff5252;
}
.xp-reward {
  background: linear-gradient(135deg, #f0f4ff, #e8f0ff);
  border: 2px solid #667eea;
}
.button-container {
  padding: 20px;
}
</style>
