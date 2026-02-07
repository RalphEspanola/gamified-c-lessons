<script setup>
import { computed, ref, onMounted } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useAnswerProtection } from '@/composables/PowerUps/useAnswerProtection'
import { useStreakSaver } from '@/composables/PowerUps/useStreakSaver'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

const { powerUps, initializeShop } = useShop()
const { activateAnswerProtection, isProtectionActive, initializeProtection } = useAnswerProtection()
const { activateStreakSaver, isStreakProtected, formattedTimeRemaining, initializeStreakSaver } =
  useStreakSaver()
const { activateDoubleXP, isDoubleXPActive, initializeDoubleXP } = useDoubleXP()

// 🔹 Initialize all on mount
onMounted(async () => {
  await Promise.all([
    initializeShop(),
    initializeProtection(),
    initializeStreakSaver(),
    initializeDoubleXP(),
  ])
})

// Success/error messages
const message = ref('')
const messageType = ref('success')

// ✅ FIXED: Show power-ups even when count is 0 IF they're active
const powerUpsList = computed(() => {
  const items = []

  // Show Streak Saver if you have it OR if it's active
  if (powerUps.value.streakSaver > 0 || isStreakProtected.value) {
    items.push({
      id: 'streakSaver',
      shopKey: 'streakSaver',
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

  // Show Double XP if you have it OR if it's active
  if (powerUps.value.doubleXP > 0 || isDoubleXPActive.value) {
    items.push({
      id: 'doubleXP',
      shopKey: 'doubleXP',
      title: 'Double XP Boost',
      description: isDoubleXPActive.value
        ? 'Active - Will double XP in your next lesson'
        : 'Earn 2x XP for your next lesson',
      icon: 'mdi-lightning-bolt',
      color: 'yellow',
      count: powerUps.value.doubleXP,
      isActive: isDoubleXPActive.value,
    })
  }

  // Show Answer Protection if you have it OR if it's active
  if (powerUps.value.answerProtect > 0 || isProtectionActive.value) {
    items.push({
      id: 'answerProtect',
      shopKey: 'answerProtect',
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

const handleUsePowerUp = async (powerUp) => {
  let success = false

  // Check if user has the power-up in inventory
  if (powerUps.value[powerUp.shopKey] <= 0) {
    message.value = "You don't have this power-up"
    messageType.value = 'error'
    setTimeout(() => (message.value = ''), 3000)
    return
  }

  // Activate the specific power-up functionality
  switch (powerUp.id) {
    case 'streakSaver':
      if (isStreakProtected.value) {
        message.value = 'Streak protection is already active!'
        messageType.value = 'warning'
      } else {
        success = await activateStreakSaver()
        message.value = success
          ? `${powerUp.title} activated! Your streak is protected for the next 24 hours.`
          : 'Failed to activate Streak Saver'
        messageType.value = success ? 'success' : 'error'
      }
      break

    case 'answerProtect':
      if (isProtectionActive.value) {
        message.value = 'Answer Protection is already active!'
        messageType.value = 'warning'
      } else {
        success = await activateAnswerProtection()
        message.value = success
          ? `${powerUp.title} activated! Your next wrong answer won't cost a heart.`
          : 'Failed to activate Answer Protection'
        messageType.value = success ? 'success' : 'error'
      }
      break

    case 'doubleXP':
      if (isDoubleXPActive.value) {
        message.value = 'Double XP is already active!'
        messageType.value = 'warning'
      } else {
        success = await activateDoubleXP()
        message.value = success
          ? `${powerUp.title} activated! You'll earn 2x XP in your next lesson.`
          : 'Failed to activate Double XP'
        messageType.value = success ? 'success' : 'error'
      }
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
