<script setup>
import { ref, watch } from 'vue'
import { useXP } from '@/composables/system/useXP'
import { useShop } from '@/composables/system/useShop'

const props = defineProps({
  modelValue: Boolean,
  xpEarned: { type: Number, default: 100 },
  coinsEarned: { type: Number, default: 10 },
  heartsEarned: { type: Number, default: 1 },
  perfectScore: { type: Boolean, default: false },
  // ✅ Passed from LessonSlides — for display only, no recalculation here
  doubleXPApplied: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'continue'])

const { addXP } = useXP()
const { addCoins } = useShop()

const rewardedXP = ref(0)
const rewardedCoins = ref(0)
const hasAwarded = ref(false)

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen && !hasAwarded.value) {
      await awardRewards()
      hasAwarded.value = true
    } else if (!isOpen) {
      hasAwarded.value = false
      rewardedXP.value = 0
      rewardedCoins.value = 0
    }
  },
  { immediate: true },
)

async function awardRewards() {
  // ✅ xpEarned is already final — LessonSlides handled doubling and perfect bonus
  // This dialog just awards and displays, no recalculation
  rewardedXP.value = props.xpEarned
  rewardedCoins.value = props.coinsEarned

  await addXP(props.xpEarned)
  await addCoins(props.coinsEarned)

  console.log('🎁 Rewards awarded — XP:', props.xpEarned, 'Coins:', props.coinsEarned)
}

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
          <h1 class="completion-title">
            {{ perfectScore ? '🎉 Perfect Score!' : 'Lesson Complete!' }}
          </h1>
        </div>

        <!-- REWARDS -->
        <div class="rewards-container">
          <!-- Coins -->
          <div class="reward-item coin-reward">
            <v-icon color="amber">mdi-coin</v-icon>
            <span>+{{ rewardedCoins }} Coins</span>
          </div>

          <!-- Hearts -->
          <div v-if="heartsEarned > 0" class="reward-item heart-reward">
            <v-icon color="red">mdi-heart</v-icon>
            <span>+{{ heartsEarned }} Heart</span>
          </div>

          <!-- XP — 2X badge driven by prop from LessonSlides, not recalculated here -->
          <div class="reward-item xp-reward">
            <v-icon color="indigo">mdi-lightning-bolt</v-icon>
            <span>+{{ rewardedXP }} XP</span>
            <v-chip v-if="doubleXPApplied" color="amber" size="x-small" class="ml-2">
              2X BOOST!
            </v-chip>
          </div>

          <!-- Perfect Score Bonus -->
          <div v-if="perfectScore" class="reward-item bonus-reward">
            <v-icon color="success">mdi-trophy</v-icon>
            <span>+50 Bonus XP (Perfect!)</span>
          </div>
        </div>

        <!-- BUTTON -->
        <div class="button-container">
          <v-btn block color="primary" size="large" @click="continueNext"> Continue </v-btn>
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
.bonus-reward {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border: 2px solid #4caf50;
}
.button-container {
  padding: 20px;
}
</style>
