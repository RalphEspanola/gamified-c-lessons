<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const topics = ref([
  {
    id: 1,
    title: 'Topic 1: C Fundamentals',
    icon: 'mdi-code-braces',
    lessonsCount: 3,
    duration: '45 mins',
    lessons: [
      {
        id: 1,
        title: 'Lesson 1: Elements of a C Program',
        subtitle: 'Learn the basic structure of C programs',
        status: 'completed',
        route: '/topic1/lesson1',
      },
      {
        id: 2,
        title: 'Lesson 2: Variables and Data Types',
        subtitle: 'Understanding variables and data types in C',
        status: 'in-progress',
        route: '/topic1/lesson2',
      },
      {
        id: 3,
        title: 'Lesson 3: Executable Statements (Input & Output)',
        subtitle: 'Master input and output operations',
        status: 'locked',
        route: '/topic1/lesson3',
      },
      {
        id: 4,
        title: 'Lesson 4: Arithmetic Expressions',
        subtitle: 'using arithmetic operators',
        status: 'in-progress',
        route: '/topic1/lesson4',
      },
      {
        id: 5,
        title: 'Lesson 5: Executable Statements (Input & Output)',
        subtitle: 'Master input and output operations',
        status: 'in-progress',
        route: '/topic1/lesson5',
      },
      {
        id: 6,
        title: 'Lesson 6: Executable Statements (Input & Output)',
        subtitle: 'Master input and output operations',
        status: 'in-progress',
        route: '/topic1/lesson6',
      },
    ],
  },
])

const continueLesson = (lesson) => {
  if (lesson.status !== 'locked') {
    router.push(lesson.route)
  }
}

const getButtonConfig = (status) => {
  const configs = {
    completed: { color: 'success', text: 'Review', icon: 'mdi-check-circle' },
    'in-progress': { color: 'primary', text: 'Continue', icon: 'mdi-play-circle' },
    locked: { color: 'grey', text: 'Locked', icon: 'mdi-lock', disabled: true },
  }
  return configs[status]
}
</script>

<template>
  <div class="learning-path-wrapper">
    <h2 class="text-h5 font-weight-bold mb-4">Your Learning Path</h2>

    <v-card elevation="2" class="full-height-card">
      <v-expansion-panels>
        <v-expansion-panel v-for="topic in topics" :key="topic.id">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-3">{{ topic.icon }}</v-icon>
              <div>
                <div class="text-h6 font-weight-bold">{{ topic.title }}</div>
                <div class="text-caption text-grey">
                  {{ topic.lessonsCount }} lessons • {{ topic.duration }}
                </div>
              </div>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-list>
              <template v-for="(lesson, index) in topic.lessons" :key="lesson.id">
                <v-list-item
                  prepend-icon="mdi-book-open-page-variant"
                  :title="lesson.title"
                  :subtitle="lesson.subtitle"
                  class="lesson-item"
                >
                  <template v-slot:append>
                    <v-btn
                      :color="getButtonConfig(lesson.status).color"
                      :disabled="getButtonConfig(lesson.status).disabled"
                      :prepend-icon="getButtonConfig(lesson.status).icon"
                      size="small"
                      @click="continueLesson(lesson)"
                    >
                      {{ getButtonConfig(lesson.status).text }}
                    </v-btn>
                  </template>
                </v-list-item>

                <v-divider v-if="index < topic.lessons.length - 1"></v-divider>
              </template>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<style scoped>
.learning-path-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.full-height-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.lesson-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.lesson-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
