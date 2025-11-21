<script setup>
import { computed, ref } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'
import { useStreakSaver } from '@/composables/PowerUps/useStreakSaver'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

const { powerUps, usePowerUp } = useShop()
const { activateAnswerProtection, isProtectionActive } = useAnswerProtection()
const { activateStreakSaver, isStreakProtected, formattedTimeRemaining } = useStreakSaver()
const { activateDoubleXP } = useDoubleXP()

// Success/error messages
const message = ref('')
const messageType = ref('success')

// Convert powerUps object to array for display
const powerUpsList = computed(() => {
  const items = []

  if (powerUps.value.streakSaver > 0) {
    items.push({
      id: 'streakSaver',
      shopKey: 'streakSaver', // 🔑 fix key
      title: 'Streak Saver',
      description: isStreakProtected.value
        ? `Active - Expires in ${formattedTimeRemaining.value}`
        : 'Protect your streak if you miss a lesson',
      icon: 'mdi-shield-check',
      color: 'green',
      count: powerUps.value.streakSaver,
      isActive: isStreakProtected.value,
    })
  }

  if (powerUps.value.doubleXP > 0) {
    items.push({
      id: 'doubleXP',
      shopKey: 'doubleXP', // 🔑 fix key
      title: 'Double XP Boost',
      description: 'Earn 2x XP for your next lesson',
      icon: 'mdi-lightning-bolt',
      color: 'yellow',
      count: powerUps.value.doubleXP,
    })
  }

  if (powerUps.value.hintReveal > 0) {
    items.push({
      id: 'hintReveal',
      shopKey: 'hintReveal', // 🔑 fix key
      title: 'Hint Reveal',
      description: 'Get a hint for any question',
      icon: 'mdi-lightbulb-on',
      color: 'purple',
      count: powerUps.value.hintReveal,
    })
  }

  if (powerUps.value.answerProtect > 0) {
    items.push({
      id: 'answerProtect',
      shopKey: 'answerProtect', // 🔑 fix key
      title: 'Answer Protection',
      description: isProtectionActive.value
        ? 'Active - Will protect your next wrong answer'
        : 'Prevents heart loss from one wrong answer',
      icon: 'mdi-shield-heart',
      color: 'red',
      count: powerUps.value.answerProtect,
      isActive: isProtectionActive.value,
    })
  }

  return items
})

// Handle activation with proper functionality
const handleUsePowerUp = (powerUp) => {
  let success = false

  // First, deduct from shop inventory using the correct shopKey
  const deducted = usePowerUp(powerUp.shopKey)

  if (!deducted) {
    message.value = 'Failed to use power-up'
    messageType.value = 'error'
    setTimeout(() => (message.value = ''), 3000)
    return
  }

  // Then activate the specific power-up functionality
  switch (powerUp.id) {
    case 'streakSaver':
      if (isStreakProtected.value) {
        message.value = 'Streak protection is already active!'
        messageType.value = 'warning'
      } else {
        activateStreakSaver()
        success = true
        message.value = `${powerUp.title} activated! Your streak is protected for the next 24 hours.`
        messageType.value = 'success'
      }
      break

    case 'answerProtect':
      if (isProtectionActive.value) {
        message.value = 'Answer Protection is already active!'
        messageType.value = 'warning'
      } else {
        success = activateAnswerProtection()
        message.value = success
          ? `${powerUp.title} activated! Your next wrong answer won't cost a heart.`
          : 'Failed to activate Answer Protection'
        messageType.value = success ? 'success' : 'error'
      }
      break

    case 'doubleXP':
      activateDoubleXP() // ⭐ Actually activate boost
      success = true
      message.value = `${powerUp.title} activated! You'll earn 2x XP in your next lesson.`
      messageType.value = 'success'
      break

    case 'hintReveal':
      // This will be handled in the quiz/lesson component
      success = true
      message.value = `${powerUp.title} ready! Use it during a lesson to reveal a hint.`
      messageType.value = 'success'
      break

    default:
      message.value = 'Unknown power-up type'
      messageType.value = 'error'
  }

  // Clear message after 5 seconds
  setTimeout(() => (message.value = ''), 5000)

  console.log(`${powerUp.title} ${success ? 'activated' : 'failed'}!`)
}
</script>

<template>
  <v-container class="pa-4" style="max-width: 800px">
    <div class="mb-4">
      <h2 class="text-h5 font-weight-bold mb-2">
        <v-icon color="primary">mdi-package-variant</v-icon>
        Your Power-ups
      </h2>
      <p class="text-subtitle-2 text-grey">Activate power-ups to gain special abilities</p>
    </div>

    <v-alert
      v-if="message"
      :type="messageType"
      variant="tonal"
      class="mb-4"
      closable
      @click:close="message = ''"
    >
      {{ message }}
    </v-alert>

    <v-card elevation="2" class="pa-4">
      <v-list>
        <template v-for="(powerUp, index) in powerUpsList" :key="powerUp.id">
          <v-list-item class="powerup-item px-2">
            <template #prepend>
              <v-avatar :color="powerUp.color" size="40" class="mr-3">
                <v-icon color="white">{{ powerUp.icon }}</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="font-weight-bold">
              {{ powerUp.title }}
              <v-chip v-if="powerUp.isActive" color="success" size="x-small" class="ml-2">
                ACTIVE
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>{{ powerUp.description }}</v-list-item-subtitle>

            <template #append>
              <div class="d-flex align-center gap-2">
                <v-chip :color="powerUp.color" size="small" text-color="white">
                  x{{ powerUp.count }}
                </v-chip>
                <v-btn
                  color="primary"
                  size="small"
                  @click="handleUsePowerUp(powerUp)"
                  variant="elevated"
                  :disabled="powerUp.isActive"
                >
                  <v-icon start size="small">
                    {{ powerUp.isActive ? 'mdi-check-circle' : 'mdi-play' }}
                  </v-icon>
                  {{ powerUp.isActive ? 'Active' : 'Use' }}
                </v-btn>
              </div>
            </template>
          </v-list-item>

          <v-divider v-if="index < powerUpsList.length - 1" class="my-2"></v-divider>
        </template>

        <v-list-item v-if="powerUpsList.length === 0" class="text-center py-8">
          <div class="w-100">
            <v-icon size="64" color="grey-lighten-1" class="mb-3"
              >mdi-package-variant-closed</v-icon
            >
            <v-list-item-title class="text-grey text-h6 mb-2">
              No power-ups available
            </v-list-item-title>
            <v-list-item-subtitle class="mb-4">
              Visit the shop to purchase some!
            </v-list-item-subtitle>
            <v-btn color="primary" to="/shop" variant="elevated">
              <v-icon start>mdi-store</v-icon>
              Go to Shop
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.powerup-item {
  transition: background-color 0.2s;
  border-radius: 8px;
}
.powerup-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.gap-2 {
  gap: 8px;
}
</style>
