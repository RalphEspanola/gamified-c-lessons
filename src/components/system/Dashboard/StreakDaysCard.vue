<script setup>
import { onMounted } from 'vue'
import { useDailyStreak } from '@/composables/system/useDailyStreak'
import { useStreakSaver } from '@/composables/PowerUps/useStreakSaver'

defineOptions({ inheritAttrs: false })

const { streak, longestStreak, initializeStreak, handleDailyLogin } = useDailyStreak()
const { isStreakProtected } = useStreakSaver()

// 🔹 Initialize on mount
onMounted(async () => {
  await initializeStreak()
  await handleDailyLogin(isStreakProtected.value)
})
</script>

<template>
  <v-card class="w-100 h-100 pa-4" elevation="2" rounded="lg" v-bind="$attrs">
    <div class="d-flex align-center mb-3">
      <v-icon color="orange" size="32" class="mr-2">mdi-fire</v-icon>
      <div>
        <div class="text-caption text-grey">Current Streak</div>
        <div class="text-h5 font-weight-bold">{{ streak }} Days</div>
      </div>
    </div>

    <v-divider class="my-3"></v-divider>

    <div class="text-center mb-2">
      <v-icon color="orange" size="64">mdi-fire</v-icon>
    </div>

    <div class="text-caption text-grey text-center">
      Longest streak: <span class="font-weight-bold">{{ longestStreak }} days</span>
    </div>

    <div
      class="text-caption text-center mt-2"
      :class="streak > 5 ? 'text-success' : 'text-warning'"
    >
      {{ streak > 5 ? 'Keep it up! 🎯' : "You're doing great! 💪" }}
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
