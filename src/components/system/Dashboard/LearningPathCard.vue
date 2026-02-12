<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLearningProgress } from '@/composables/system/useLearningProgress'
import { useHearts } from '@/composables/PowerUps/useHearts'
import NoHeartsDialog from '../Functionalities/Heart System/NoHeartsDialog.vue'

const router = useRouter()

const { canContinue } = useHearts()
const { topics, initializeProgress } = useLearningProgress()

// ✅ Add dialog state
const showNoHeartsDialog = ref(false)

// 🔹 Initialize progress on mount
onMounted(async () => {
  await initializeProgress()
})

const continueLesson = (lesson) => {
  if (lesson.status === 'locked') return

  // ✅ Show dialog instead of alert
  if (!canContinue.value) {
    showNoHeartsDialog.value = true
    return
  }

  router.push(lesson.route)
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

    <!-- Loading State -->
    <v-card v-if="topics.length === 0" elevation="2" class="pa-8 text-center">
      <v-progress-circular indeterminate color="primary" size="48" class="mb-4" />
      <p class="text-body-2 text-grey">Loading your learning path...</p>
    </v-card>

    <!-- Topics List -->
    <v-card v-else elevation="2" class="full-height-card">
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
              <!-- Lessons -->
              <template v-for="lesson in topic.lessons" :key="lesson.id">
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

                <v-divider></v-divider>
              </template>

              <!-- Quiz -->
              <v-list-item
                v-if="topic.quiz"
                prepend-icon="mdi-clipboard-check"
                :title="topic.quiz.title"
                :subtitle="topic.quiz.subtitle"
                class="lesson-item quiz-item"
              >
                <template v-slot:append>
                  <v-btn
                    :color="getButtonConfig(topic.quiz.status).color"
                    :disabled="getButtonConfig(topic.quiz.status).disabled"
                    :prepend-icon="getButtonConfig(topic.quiz.status).icon"
                    size="small"
                    @click="continueLesson(topic.quiz)"
                  >
                    {{ getButtonConfig(topic.quiz.status).text }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- ✅ No Hearts Dialog -->
    <NoHeartsDialog v-model="showNoHeartsDialog" />
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

.quiz-item {
  background-color: rgba(156, 39, 176, 0.05);
}
</style>
