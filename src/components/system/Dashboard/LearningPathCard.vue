<script setup>
import { ref } from 'vue'

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
      },
      {
        id: 2,
        title: 'Lesson 2: Variables and Data Types',
        subtitle: 'Understanding variables and data types in C',
        status: 'in-progress',
      },
      {
        id: 3,
        title: 'Lesson 3: Executable Statements (Input & Output)',
        subtitle: 'Master input and output operations',
        status: 'locked',
      },
    ],
  },
])

const getStatusChip = (status) => {
  const chips = {
    completed: { color: 'success', text: 'Completed' },
    'in-progress': { color: 'primary', text: 'In Progress' },
    locked: { color: 'grey', text: 'Locked', outlined: true },
  }
  return chips[status]
}
</script>

<template>
  <!-- Learning Path Section (Left Side) -->
  <v-col cols="12" md="8">
    <h2 class="text-h5 font-weight-bold mb-4">Your Learning Path</h2>

    <v-card elevation="2">
      <v-expansion-panels>
        <v-expansion-panel v-for="topic in topics" :key="topic.id">
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <v-icon :color="'primary'" class="mr-3">{{ topic.icon }}</v-icon>
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
                  :prepend-icon="'mdi-book-open-page-variant'"
                  :title="lesson.title"
                  :subtitle="lesson.subtitle"
                  class="lesson-item"
                >
                  <template v-slot:append>
                    <v-chip
                      :color="getStatusChip(lesson.status).color"
                      :variant="getStatusChip(lesson.status).outlined ? 'outlined' : 'flat'"
                      size="small"
                    >
                      {{ getStatusChip(lesson.status).text }}
                    </v-chip>
                  </template>
                </v-list-item>

                <v-divider v-if="index < topic.lessons.length - 1"></v-divider>
              </template>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-col>
</template>

<style scoped>
.lesson-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.lesson-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
