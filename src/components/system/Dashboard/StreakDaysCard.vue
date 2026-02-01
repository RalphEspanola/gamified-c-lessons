<script setup>
import { ref, onMounted, watch } from 'vue'

defineOptions({ inheritAttrs: false })

// === STATE ===
const streakDays = ref(0)
const longestStreak = ref(0)
const lastActiveDate = ref(null)

// Optional: connect with power-ups
const activePowerUps = ref({
  streakSaver: false, // set to true when user uses streak saver
})

// === FUNCTIONS ===

// Get today’s date (no time)
const getToday = () => new Date().toISOString().split('T')[0]

// Called when user completes a lesson or logs in for the day
function updateStreak() {
  const today = getToday()

  if (!lastActiveDate.value) {
    streakDays.value = 1
  } else {
    const lastDate = new Date(lastActiveDate.value)
    const diffDays = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streakDays.value++
    } else if (diffDays > 1) {
      if (activePowerUps.value.streakSaver) {
        activePowerUps.value.streakSaver = false
        console.log('🔥 Streak Saver used — streak protected!')
      } else {
        console.log('⚠️ Streak lost — reset to 1')
        streakDays.value = 1
      }
    }
  }

  if (streakDays.value > longestStreak.value) {
    longestStreak.value = streakDays.value
  }

  lastActiveDate.value = today
  saveStreakData()
}

// === STORAGE ===
function saveStreakData() {
  localStorage.setItem(
    'streakData',
    JSON.stringify({
      streakDays: streakDays.value,
      longestStreak: longestStreak.value,
      lastActiveDate: lastActiveDate.value,
    }),
  )
}

function loadStreakData() {
  const data = localStorage.getItem('streakData')
  if (data) {
    const parsed = JSON.parse(data)
    streakDays.value = parsed.streakDays || 0
    longestStreak.value = parsed.longestStreak || 0
    lastActiveDate.value = parsed.lastActiveDate || null
  }
}

// === INIT ===
onMounted(() => {
  loadStreakData()
  updateStreak()
})

// Optional: auto-save on change
watch([streakDays, longestStreak], saveStreakData)
</script>

<template>
  <v-card class="w-100 h-100 pa-4" elevation="2" rounded="lg" v-bind="$attrs">
    <div class="d-flex align-center mb-3">
      <v-icon color="orange" size="32" class="mr-2">mdi-fire</v-icon>
      <div>
        <div class="text-caption text-grey">Current Streak</div>
        <div class="text-h5 font-weight-bold">{{ streakDays }} Days</div>
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
      :class="streakDays > 5 ? 'text-success' : 'text-warning'"
    >
      {{ streakDays > 5 ? 'Keep it up! 🎯' : 'You’re doing great! 💪' }}
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
