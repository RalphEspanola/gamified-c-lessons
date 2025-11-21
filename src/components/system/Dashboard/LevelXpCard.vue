<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// XP State
const userLevel = ref(1)
const currentXP = ref(0)
const xpToNextLevel = ref(1000)
const xpProgress = computed(() => (currentXP.value / xpToNextLevel.value) * 100)

// Power-ups
const activePowerUps = ref({ doubleXP: false })

// Gain XP function
function gainXP(amount) {
  let finalXP = amount

  if (activePowerUps.value.doubleXP) {
    finalXP *= 2
    activePowerUps.value.doubleXP = false
    console.log('⚡ Double XP applied!')
  }

  currentXP.value += finalXP
  console.log(`Gained ${finalXP} XP!`)

  checkLevelUp()
  saveProgress()
}

// Level-up logic
function checkLevelUp() {
  while (currentXP.value >= xpToNextLevel.value) {
    currentXP.value -= xpToNextLevel.value
    userLevel.value++
    xpToNextLevel.value = Math.floor(xpToNextLevel.value * 1.25)
    console.log(`🎉 Level Up! Now Level ${userLevel.value}`)
  }
}

// Local Storage
function saveProgress() {
  localStorage.setItem(
    'xpData',
    JSON.stringify({
      userLevel: userLevel.value,
      currentXP: currentXP.value,
      xpToNextLevel: xpToNextLevel.value,
    }),
  )
}

function loadProgress() {
  const data = localStorage.getItem('xpData')
  if (data) {
    const parsed = JSON.parse(data)
    userLevel.value = parsed.userLevel || 1
    currentXP.value = parsed.currentXP || 0
    xpToNextLevel.value = parsed.xpToNextLevel || 1000
  }
}

// Auto-save on changes
watch([userLevel, currentXP, xpToNextLevel], saveProgress)

// Init
onMounted(() => {
  loadProgress()

  // ✅ Example: simulate XP gain for testing
  gainXP(150)
})
</script>

<template>
  <!-- Level & XP Card -->
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <!-- Level -->
      <div class="d-flex align-center mb-3">
        <v-icon color="amber" size="32" class="mr-2">mdi-star-circle</v-icon>
        <div>
          <div class="text-caption text-grey">Level</div>
          <div class="text-h5 font-weight-bold">{{ userLevel }}</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <!-- XP Progress -->
      <div class="mb-2">
        <div class="d-flex justify-space-between text-caption mb-1">
          <span>XP Progress</span>
          <span class="font-weight-bold">{{ currentXP }} / {{ xpToNextLevel }}</span>
        </div>
        <v-progress-linear
          :model-value="xpProgress"
          color="amber"
          height="8"
          rounded
          striped
        ></v-progress-linear>
      </div>

      <div class="text-caption text-grey text-center mt-2">
        {{ xpToNextLevel - currentXP }} XP to next level
      </div>
    </v-card>
  </v-col>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
