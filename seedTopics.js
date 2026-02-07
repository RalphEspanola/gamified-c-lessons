// seedTopics.js
import { supabase } from './supabase'
import { topic1, topic2, topic3, topic4, topic5 } from './data/topic1Data'

const topicsData = [topic1, topic2, topic3, topic4, topic5]

async function seedTopics() {
  for (const topic of topicsData) {
    // 1️⃣ Insert topic
    const { data: topicRow, error: topicError } = await supabase
      .from('topics')
      .insert({
        name: topic.title,
        description: topic.description || '',
        icon: topic.icon || '',
        duration: topic.duration || '',
        lessons_count: topic.lessons.length,
      })
      .select()
      .single()

    if (topicError) {
      console.error('Topic insert error:', topicError)
      continue
    }

    const topicId = topicRow.id

    // 2️⃣ Insert lessons
    for (const lesson of topic.lessons) {
      const { error: lessonError } = await supabase.from('lessons').insert({
        topic_id: topicId,
        title: lesson.title,
        description: lesson.subtitle || '',
        mode: 'lesson', // all lessons
        slides: null, // optional, can add lesson slides JSON if needed
      })

      if (lessonError) console.error('Lesson insert error:', lessonError)
    }

    // 3️⃣ Insert quiz as a lesson with mode 'quiz'
    if (topic.quiz) {
      const { error: quizError } = await supabase.from('lessons').insert({
        topic_id: topicId,
        title: topic.quiz.title,
        description: topic.quiz.subtitle || '',
        mode: 'quiz',
        slides: null,
      })

      if (quizError) console.error('Quiz insert error:', quizError)
    }
  }

  console.log('Seeding completed!')
}

seedTopics()
