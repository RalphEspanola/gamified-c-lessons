// composables/system/useLearningProgress.js
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { topic1 } from '@/components/system/Dashboard/Data/topic1Data'
import { topic2 } from '@/components/system/Dashboard/Data/topic2Data'
import { topic3 } from '@/components/system/Dashboard/Data/topic3Data'
import { topic4 } from '@/components/system/Dashboard/Data/topic4Data'
import { topic5 } from '@/components/system/Dashboard/Data/topic5Data'

const allTopics = [topic1, topic2, topic3, topic4, topic5]
const topics = ref([])

// Track state
const completedLessons = ref([])
const completedQuizzes = ref([])
const unlockedTopics = ref([1]) // Topic 1 is unlocked by default
const isInitialized = ref(false)

export function useLearningProgress() {
  // 🔹 Initialize user progress from Supabase
  const initializeProgress = async () => {
    // Prevent duplicate initialization
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

      // Fetch user progress
      const { data: progressData, error } = await supabase
        .from('user_learning_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('❌ Error fetching progress:', error)
        throw error
      }

      console.log('📊 Progress data:', progressData)

      // If no progress exists, create default
      if (!progressData || progressData.length === 0) {
        console.log('🆕 No progress found, creating default...')
        await createDefaultProgress(user.id)
        isInitialized.value = true
        return await initializeProgress() // Reload after creation
      }

      // ✅ FIXED: Clear arrays before rebuilding
      completedLessons.value = []
      completedQuizzes.value = []

      // Calculate completed lessons and quizzes for sequential unlocking
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

      // Calculate unlocked topics based on completed quizzes (sequential)
      calculateUnlockedTopics()

      // Merge hardcoded topics with DB progress
      topics.value = allTopics.map((topic) => {
        const topicProgress = progressData.filter((p) => p.topic_id === topic.id)
        const isTopicUnlocked = unlockedTopics.value.includes(topic.id)

        const lessons = topic.lessons.map((lesson) => {
          const progress = topicProgress.find((p) => p.lesson_id === lesson.id && !p.quiz_completed)

          // Override status based on unlocked state
          let status = progress?.status || 'locked'
          if (!isTopicUnlocked) {
            status = 'locked'
          }

          return {
            ...lesson,
            status,
          }
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

  // 🔹 Calculate which topics should be unlocked (sequential)
  const calculateUnlockedTopics = () => {
    // Topic 1 is always unlocked
    const unlocked = [1]

    // Check each subsequent topic sequentially
    for (let topicId = 1; topicId <= allTopics.length; topicId++) {
      // If previous topic's quiz is completed, unlock next topic
      if (completedQuizzes.value.includes(topicId)) {
        const nextTopicId = topicId + 1
        if (nextTopicId <= allTopics.length) {
          unlocked.push(nextTopicId)
        }
      } else {
        // Stop at first non-completed topic (sequential unlock)
        break
      }
    }

    unlockedTopics.value = unlocked
    console.log('🔓 Unlocked topics:', unlocked)
  }

  // 🔹 Create default progress
  const createDefaultProgress = async (userId) => {
    try {
      const defaultRecords = []

      allTopics.forEach((topic, topicIndex) => {
        // Add lesson records
        topic.lessons.forEach((lesson, lessonIndex) => {
          defaultRecords.push({
            user_id: userId,
            topic_id: topic.id,
            lesson_id: lesson.id,
            status: topicIndex === 0 && lessonIndex === 0 ? 'in-progress' : 'locked',
            quiz_completed: false,
          })
        })

        // Add quiz record
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

  // ✅ FIXED: Check database directly, not just local state
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

  // 🔹 Complete a lesson
  const completeLesson = async (topicId, lessonId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const lessonKey = `${topicId}-${lessonId}`

      // ✅ FIXED: Check if already completed BEFORE doing anything
      if (isLessonCompleted(topicId, lessonId)) {
        console.log('⏭️ Lesson already completed, skipping:', lessonKey)
        return
      }

      console.log('💾 Marking lesson as completed:', lessonKey)

      // Update lesson status in database
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: 'completed', updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('topic_id', topicId)
        .eq('lesson_id', lessonId)

      if (error) throw error

      // ✅ Update tracking immediately
      completedLessons.value.push(lessonKey)

      // Update local state
      const topic = topics.value.find((t) => t.id === topicId)
      if (!topic) return

      const lesson = topic.lessons.find((l) => l.id === lessonId)
      if (lesson) lesson.status = 'completed'

      // Unlock next lesson
      await unlockNextLesson(user.id, topic)

      // Update user stats
      await updateUserStats(user.id, { lessons_completed: 1 })

      console.log('✅ Lesson completed:', lessonKey)
    } catch (error) {
      console.error('Error completing lesson:', error)
    }
  }

  // 🔹 Unlock next lesson
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
      // All lessons completed, unlock quiz
      const { error } = await supabase
        .from('user_learning_progress')
        .update({ status: 'in-progress', updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('topic_id', topic.id)
        .is('lesson_id', null)

      if (!error) topic.quiz.status = 'in-progress'
    }
  }

  // 🔹 Complete quiz
  const completeQuiz = async (topicId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      // ✅ FIXED: Check if already completed BEFORE doing anything
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

      // ✅ Update tracking immediately
      completedQuizzes.value.push(topicId)

      const topic = topics.value.find((t) => t.id === topicId)
      if (topic) topic.quiz.status = 'completed'

      await updateUserStats(user.id, { quizzes_completed: 1 })

      // Unlock next topic (sequential)
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

  // 🔹 Unlock next topic
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

  // 🔹 Update user stats
  const updateUserStats = async (userId, updates) => {
    const { data: currentStats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    const newStats = {
      lessons_completed: (currentStats?.lessons_completed || 0) + (updates.lessons_completed || 0),
      quizzes_completed: (currentStats?.quizzes_completed || 0) + (updates.quizzes_completed || 0),
      xp: (currentStats?.xp || 0) + (updates.xp || 0),
      coins: (currentStats?.coins || 0) + (updates.coins || 0),
      updated_at: new Date().toISOString(),
    }

    await supabase.from('user_stats').upsert({ user_id: userId, ...newStats })
  }

  // 🔹 Helper methods
  const isTopicUnlocked = (topicId) => {
    return unlockedTopics.value.includes(topicId)
  }

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

  return {
    // State
    topics,
    completedLessons,
    completedQuizzes,
    unlockedTopics,
    isInitialized,

    // Methods
    initializeProgress,
    completeLesson,
    completeQuiz,
    isTopicUnlocked,
    isLessonCompleted,
    isQuizCompleted,
    getTopicProgress,
    canTakeQuiz,
  }
}
