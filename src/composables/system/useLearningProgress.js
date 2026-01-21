// src/composables/system/useLearningProgress.js
import { ref, watch } from 'vue'
import { topic1 } from '@/components/system/Dashboard/Data/topic1Data'
import { topic2 } from '@/components/system/Dashboard/Data/topic2Data'
import { topic3 } from '@/components/system/Dashboard/Data/topic3Data'
import { topic4 } from '@/components/system/Dashboard/Data/topic4Data'
import { topic5 } from '@/components/system/Dashboard/Data/topic5Data'
import { useXP } from './useXP'
import { useShop } from './useShop'
import { useHearts } from '@/composables/PowerUps/useHearts'
import { useDoubleXP } from '@/composables/PowerUps/useDoubleXP'

const STORAGE_KEY = 'learningProgress'
const REWARDED_KEY = 'rewardedLessons'

// ---------- DEFAULT STATE ----------
const defaultTopics = [topic1, topic2, topic3, topic4, topic5].map((topic, index) => ({
  ...topic,
  topicIndex: index,
  lessons: topic.lessons.map((lesson, i) => ({
    ...lesson,
    status: i === 0 ? 'in-progress' : 'locked',
  })),
  quiz: topic.quiz ? { ...topic.quiz, status: 'locked' } : null,
}))

const topics = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultTopics)
const rewardedLessons = ref(JSON.parse(localStorage.getItem(REWARDED_KEY)) || [])

// ---------- COMPOSABLES ----------
const { addXP } = useXP()
const { addCoins } = useShop()
const { gainHeart } = useHearts()
const { isDoubleXPActive, consumeDoubleXP } = useDoubleXP()

const makeKey = (topicId, lessonId = null) =>
  lessonId !== null ? `topic-${topicId}-lesson-${lessonId}` : `topic-${topicId}-quiz`

// ---------- HELPERS ----------
const unlockNextLesson = (topic) => {
  const next = topic.lessons.find((l) => l.status === 'locked')
  if (next) next.status = 'in-progress'
}

const unlockNextTopic = (topicIndex) => {
  const nextTopic = topics.value[topicIndex + 1]
  if (!nextTopic) return
  if (nextTopic.lessons[0].status === 'locked') {
    nextTopic.lessons[0].status = 'in-progress'
  }
}

// ---------- MAIN ----------
export function useLearningProgress() {
  const completeLesson = (topicId, lessonId, opts = { perfectScore: false }) => {
    const topic = topics.value.find((t) => t.id === topicId)
    const lesson = topic?.lessons.find((l) => l.id === lessonId)
    if (!topic || !lesson) return { awarded: false }

    const key = makeKey(topicId, lessonId)

    // ✅ Detect first completion BEFORE modifying anything
    const firstCompletion = lesson.status !== 'completed'

    // ---------- REWARD ----------
    let awarded = false
    let xp = 0,
      coins = 0,
      hearts = 0

    if (!rewardedLessons.value.includes(key)) {
      awarded = true
      xp = 100 + (opts.perfectScore ? 50 : 0)
      coins = opts.perfectScore ? 20 : 10
      hearts = 1

      if (isDoubleXPActive.value) {
        xp *= 2
        consumeDoubleXP()
      }

      addXP(xp)
      addCoins(coins)
      gainHeart()

      rewardedLessons.value.push(key)
      localStorage.setItem(REWARDED_KEY, JSON.stringify(rewardedLessons.value))
    }

    // ---------- PROGRESSION ----------
    lesson.status = 'completed'

    // ✅ Unlock ONLY ON FIRST COMPLETION
    if (firstCompletion) {
      unlockNextLesson(topic)

      const allLessonsCompleted = topic.lessons.every((l) => l.status === 'completed')
      if (allLessonsCompleted && topic.quiz) {
        topic.quiz.status = 'in-progress'
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics.value))
    return { awarded, xp, coins, hearts }
  }

  const completeQuiz = (topicId, opts = { perfectScore: false }) => {
    const topic = topics.value.find((t) => t.id === topicId)
    if (!topic?.quiz) return { awarded: false }

    const key = makeKey(topicId)
    const firstCompletion = topic.quiz.status !== 'completed'

    let awarded = false
    let xp = 0,
      coins = 0,
      hearts = 0

    if (!rewardedLessons.value.includes(key)) {
      awarded = true
      xp = 150 + (opts.perfectScore ? 50 : 0)
      coins = opts.perfectScore ? 30 : 15
      hearts = 1

      if (isDoubleXPActive.value) {
        xp *= 2
        consumeDoubleXP()
      }

      addXP(xp)
      addCoins(coins)
      gainHeart()

      rewardedLessons.value.push(key)
      localStorage.setItem(REWARDED_KEY, JSON.stringify(rewardedLessons.value))
    }

    topic.quiz.status = 'completed'

    // ✅ Unlock NEXT TOPIC ONLY ON FIRST QUIZ COMPLETION
    if (firstCompletion) {
      unlockNextTopic(topic.topicIndex)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(topics.value))
    return { awarded, xp, coins, hearts }
  }

  watch(
    topics,
    () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topics.value))
    },
    { deep: true },
  )

  return {
    topics,
    completeLesson,
    completeQuiz,
  }
}
