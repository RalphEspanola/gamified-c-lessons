import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { topic1 } from '@/components/system/Dashboard/Data/topic1Data'
import { topic2 } from '@/components/system/Dashboard/Data/topic2Data'
import { topic3 } from '@/components/system/Dashboard/Data/topic3Data'
import { topic4 } from '@/components/system/Dashboard/Data/topic4Data'
import { topic5 } from '@/components/system/Dashboard/Data/topic5Data'

const allTopics = [topic1, topic2, topic3, topic4, topic5]
const topics = ref([])
const completedLessons = ref([])
const completedQuizzes = ref([])
const unlockedTopics = ref([1])
const isInitialized = ref(false)

export function useLearningProgress() {
  const initializeProgress = async () => {
    if (isInitialized.value) {
      console.log('Progress already initialized')
      return
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        console.warn('No user found, using default progress')
        isInitialized.value = true
        return
      }

      console.log('🔍 Loading progress for user:', user.id)

      const { data: progressData, error } = await supabase
        .from('user_learning_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error fetching progress:', error)
        throw error
      }

      console.log('📊 Progress data:', progressData)

      if (!progressData || progressData.length === 0) {
        console.log('🆕 No progress found, creating default...')
        await createDefaultProgress(user.id)
        isInitialized.value = true
        return await initializeProgress()
      }

      completedLessons.value = []
      completedQuizzes.value = []

      progressData.forEach((p) => {
        if (p.status === 'completed') {
          if (p.lesson_id !== null) {
            completedLessons.value.push(`${p.topic_id}-${p.lesson_id}`)
          } else if (p.quiz_completed) {
            completedQuizzes.value.push(p.topic_id)
          }
        }
      })

      console.log('📚 Completed lessons:', completedLessons.value)
      console.log('📝 Completed quizzes:', completedQuizzes.value)

      calculateUnlockedTopics()

      topics.value = allTopics.map((topic) => {
        const topicProgress = progressData.filter((p) => p.topic_id === topic.id)
        const isTopicUnlocked = unlockedTopics.value.includes(topic.id)

        const lessons = topic.lessons.map((lesson) => {
          const progress = topicProgress.find((p) => p.lesson_id === lesson.id && !p.quiz_completed)

          let status = progress?.status || 'locked'
          if (!isTopicUnlocked) status = 'locked'

          return { ...lesson, status }
        })

        const quizProgress = topicProgress.find((p) => p.lesson_id === null)
        const quiz = {
          ...topic.quiz,
          status: isTopicUnlocked ? quizProgress?.status || 'locked' : 'locked',
        }

        return { ...topic, lessons, quiz }
      })

      isInitialized.value = true
      console.log('✅ Topics loaded:', topics.value)
      console.log('📊 Progress summary:', {
        lessons: completedLessons.value.length,
        quizzes: completedQuizzes.value.length,
        unlocked: unlockedTopics.value.length,
      })
    } catch (error) {
      console.error('❌ Error initializing progress:', error)
      isInitialized.value = true
    }
  }

  const calculateUnlockedTopics = () => {
    const unlocked = [1]

    for (let topicId = 1; topicId <= allTopics.length; topicId++) {
      if (completedQuizzes.value.includes(topicId)) {
        const nextTopicId = topicId + 1
        if (nextTopicId <= allTopics.length) {
          unlocked.push(nextTopicId)
        }
      } else {
        break
      }
    }

    unlockedTopics.value = unlocked
    console.log('🔓 Unlocked topics:', unlocked)
  }

  const createDefaultProgress = async (userId) => {
    try {
      const defaultRecords = []

      allTopics.forEach((topic, topicIndex) => {
        topic.lessons.forEach((lesson, lessonIndex) => {
          defaultRecords.push({
            user_id: userId,
            topic_id: topic.id,
            lesson_id: lesson.id,
            status: topicIndex === 0 && lessonIndex === 0 ? 'in-progress' : 'locked',
            quiz_completed: false,
          })
        })

        defaultRecords.push({
          user_id: userId,
          topic_id: topic.id,
          lesson_id: null,
          status: 'locked',
          quiz_completed: false,
        })
      })

      const { error } = await supabase.from('user_learning_progress').insert(defaultRecords)

      if (error) {
        console.error('❌ Error creating default progress:', error)
        throw error
      }

      console.log('✅ Default progress created')
    } catch (error) {
      console.error('❌ Error in createDefaultProgress:', error)
    }
  }

  const isLessonCompleted = (topicId, lessonId) => {
    const lessonKey = `${topicId}-${lessonId}`
    const isCompleted = completedLessons.value.includes(lessonKey)
    console.log(`🔍 Checking if lesson ${lessonKey} is completed:`, isCompleted)
    return isCompleted
  }

  const isQuizCompleted = (topicId) => {
    const isCompleted = completedQuizzes.value.includes(topicId)
    console.log(`🔍 Checking if quiz ${topicId} is completed:`, isCompleted)
    return isCompleted
  }

  const completeLesson = async (topicId, lessonId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const lessonKey = `${topicId}-${lessonId}`

      if (isLessonCompleted(topicId, lessonId)) {
        console.log('⏭️ Lesson already completed, skipping:', lessonKey)
        return
      }

      console.log('💾 Marking lesson as completed:', lessonKey)

      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .eq('lesson_id', lessonId)

      if (error) throw error

      completedLessons.value.push(lessonKey)

      const topic = topics.value.find((t) => t.id === topicId)
      if (!topic) return

      const lesson = topic.lessons.find((l) => l.id === lessonId)
      if (lesson) lesson.status = 'completed'

      await unlockNextLesson(user.id, topic)
      await updateUserStats(user.id, { lessons_completed: 1 })

      console.log('✅ Lesson completed:', lessonKey)
    } catch (error) {
      console.error('Error completing lesson:', error)
    }
  }

  const unlockNextLesson = async (userId, topic) => {
    const nextLocked = topic.lessons.find((l) => l.status === 'locked')

    if (nextLocked) {
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: 'in-progress', updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('topic_id', topic.id)
        .eq('lesson_id', nextLocked.id)

      if (!error) nextLocked.status = 'in-progress'
    } else {
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: 'in-progress', updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('topic_id', topic.id)
        .is('lesson_id', null)

      if (!error) topic.quiz.status = 'in-progress'
    }
  }

  const completeQuiz = async (topicId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      if (isQuizCompleted(topicId)) {
        console.log('⏭️ Quiz already completed, skipping:', topicId)
        return
      }

      console.log('💾 Marking quiz as completed:', topicId)

      const { error } = await supabase
        .from('user_learning_progress')
        .update({
          status: 'completed',
          quiz_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .is('lesson_id', null)

      if (error) throw error

      completedQuizzes.value.push(topicId)

      const topic = topics.value.find((t) => t.id === topicId)
      if (topic) topic.quiz.status = 'completed'

      await updateUserStats(user.id, { quizzes_completed: 1 })

      const nextTopicId = topicId + 1
      if (!unlockedTopics.value.includes(nextTopicId) && nextTopicId <= allTopics.length) {
        unlockedTopics.value.push(nextTopicId)
        await unlockNextTopic(user.id, topicId)
      }

      console.log(`✅ Quiz ${topicId} completed! Topic ${nextTopicId} unlocked!`)
    } catch (error) {
      console.error('Error completing quiz:', error)
    }
  }

  const unlockNextTopic = async (userId, currentTopicId) => {
    const nextTopicId = currentTopicId + 1
    const nextTopic = topics.value.find((t) => t.id === nextTopicId)

    if (!nextTopic) return

    const firstLesson = nextTopic.lessons[0]
    if (!firstLesson) return

    const { error } = await supabase
      .from('user_learning_progress')
      .update({ status: 'in-progress', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('topic_id', nextTopicId)
      .eq('lesson_id', firstLesson.id)

    if (!error) firstLesson.status = 'in-progress'
  }

  const updateUserStats = async (userId, updates) => {
    const { error } = await supabase.rpc('increment_user_stats', {
      p_user_id: userId,
      p_lessons_completed: updates.lessons_completed || 0,
      p_quizzes_completed: updates.quizzes_completed || 0,
      p_xp: updates.xp || 0,
      p_coins: updates.coins || 0,
    })

    if (error) {
      console.error('❌ Error updating user stats:', error)
      throw error
    }
  }

  const isTopicUnlocked = (topicId) => unlockedTopics.value.includes(topicId)

  const getTopicProgress = (topicId, totalLessons) => {
    if (!totalLessons || totalLessons === 0) return 0
    const completed = completedLessons.value.filter((key) => key.startsWith(`${topicId}-`)).length
    return Math.round((completed / totalLessons) * 100)
  }

  const canTakeQuiz = (topicId, totalLessons) => {
    if (!totalLessons || totalLessons === 0) return true
    const completedCount = completedLessons.value.filter((key) =>
      key.startsWith(`${topicId}-`),
    ).length
    return completedCount >= totalLessons
  }

  // ✅ Called on logout to clear state before next user loads
  const reset = () => {
    topics.value = []
    completedLessons.value = []
    completedQuizzes.value = []
    unlockedTopics.value = [1]
    isInitialized.value = false
    console.log('🔄 Learning progress state reset')
  }

  return {
    topics,
    completedLessons,
    completedQuizzes,
    unlockedTopics,
    isInitialized,
    initializeProgress,
    completeLesson,
    completeQuiz,
    isTopicUnlocked,
    isLessonCompleted,
    isQuizCompleted,
    getTopicProgress,
    canTakeQuiz,
    reset,
  }
}
