import { ref } from 'vue'

const xp = ref(0)
const totalXP = ref(0)
const level = ref(1)

const XP_PER_LEVEL = 100

// Load once
try {
  const data = JSON.parse(localStorage.getItem('xpSystem'))
  if (data) {
    xp.value = data.xp ?? 0
    totalXP.value = data.totalXP ?? 0
    level.value = data.level ?? 1
  }
} catch (e) {
  console.error('Load failed:', e)
}

const saveToStorage = () => {
  localStorage.setItem(
    'xpSystem',
    JSON.stringify({
      xp: xp.value,
      totalXP: totalXP.value,
      level: level.value,
    }),
  )
}

const addXP = (amount) => {
  totalXP.value += amount
  xp.value += amount

  while (xp.value >= XP_PER_LEVEL) {
    xp.value -= XP_PER_LEVEL
    level.value++
  }

  saveToStorage()
}

export function useXP() {
  return {
    xp,
    totalXP,
    level,
    XP_PER_LEVEL,
    addXP,
  }
}
