import { ref, computed, watch } from 'vue'

/* ================= STORAGE HELPERS ================= */
function loadNumber(key, fallback) {
  const value = localStorage.getItem(key)
  return value !== null ? Number(value) : fallback
}

/* ================= STATE ================= */
const xp = ref(loadNumber('xp', 0)) // current XP toward level
const level = ref(loadNumber('level', 1)) // current level

/* ================= FORMULA ================= */
const xpToNextLevel = computed(() => level.value * 100)

/* ================= PROGRESS ================= */
const xpProgress = computed(() => {
  return Math.min(Math.round((xp.value / xpToNextLevel.value) * 100), 100)
})

/* ================= ADD XP ================= */
function addXP(amount) {
  if (!amount || amount <= 0) return

  xp.value += amount

  while (xp.value >= xpToNextLevel.value) {
    xp.value -= xpToNextLevel.value
    level.value++
  }
}

/* ================= SAVE ================= */
watch(
  () => [xp.value, level.value],
  () => {
    localStorage.setItem('xp', xp.value.toString())
    localStorage.setItem('level', level.value.toString())
  },
  { deep: true },
)

/* ================= EXPORT ================= */
export function useXP() {
  return {
    xp,
    level,
    xpToNextLevel,
    xpProgress,
    addXP,
  }
}
