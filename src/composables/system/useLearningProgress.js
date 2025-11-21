import { ref, watch } from 'vue'
import { topic1 } from '@/components/system/Dashboard/Data/topic1Data'
import { topic2 } from '@/components/system/Dashboard/Data/topic2Data'
import { topic3 } from '@/components/system/Dashboard/Data/topic3Data'
import { topic4 } from '@/components/system/Dashboard/Data/topic4Data'
import { topic5 } from '@/components/system/Dashboard/Data/topic5Data'

// -----------------------------
// 1. Load saved progress OR create default
// -----------------------------
const savedProgress = JSON.parse(localStorage.getItem('progress'))

// Create default topic structure (first lesson unlocked only)
const defaultTopics = [topic1, topic2, topic3, topic4, topic5].map((topic) => {
  const lessons = topic.lessons.map((lesson, index) => ({
    ...lesson,
    status: index === 0 ? 'in-progress' : 'locked',
  }))

  return {
    ...topic,
    lessons,
    quiz: {
      ...topic.quiz,
      status: 'locked', // quiz always locked initially
    },
  }
})

// Reactive topics state
const topics = ref(savedProgress || defaultTopics)

// -----------------------------
// 2. Functions
// -----------------------------
export function useLearningProgress() {
  // Mark a lesson completed
  const completeLesson = (topicId, lessonId) => {
    const topic = topics.value.find((t) => t.id === topicId)
    if (!topic) return

    const lesson = topic.lessons.find((l) => l.id === lessonId)
    if (!lesson) return

    // Complete lesson
    lesson.status = 'completed'

    // Unlock ONLY the next lesson
    unlockNextLesson(topic)
  }

  // Unlock next lesson ONLY (not all)
  const unlockNextLesson = (topic) => {
    const lessons = topic.lessons

    // Find the first locked lesson
    const nextLocked = lessons.find((l) => l.status === 'locked')

    if (nextLocked) {
      nextLocked.status = 'in-progress'
    } else {
      // No more lessons → unlock topic quiz
      topic.quiz.status = 'in-progress'
    }
  }

  // NEW: Mark quiz completed
  const completeQuiz = (topicId) => {
    const topic = topics.value.find((t) => t.id === topicId)
    if (!topic || !topic.quiz) return

    topic.quiz.status = 'completed'
  }

  // -----------------------------
  // 3. Auto-save to localStorage
  // -----------------------------
  watch(
    topics,
    () => {
      localStorage.setItem('progress', JSON.stringify(topics.value))
    },
    { deep: true },
  )

  return {
    topics,
    completeLesson,
    completeQuiz,
  }
}
