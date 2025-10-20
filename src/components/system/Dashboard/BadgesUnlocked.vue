<script setup>
import { ref } from 'vue'
const badges = ref([
  { id: 1, title: 'First Steps', icon: 'mdi-star', color: 'amber', earned: true },
  { id: 2, title: 'Quick Learner', icon: 'mdi-lightning-bolt', color: 'orange', earned: true },
  { id: 3, title: 'Code Master', icon: 'mdi-trophy', color: 'gold', earned: false },
  { id: 4, title: 'Perfect Score', icon: 'mdi-medal', color: 'blue', earned: true },
  { id: 5, title: 'Week Warrior', icon: 'mdi-fire', color: 'red', earned: false },
  { id: 6, title: 'Problem Solver', icon: 'mdi-brain', color: 'purple', earned: true },
])
</script>

<template>
  <!-- Badges and Power-ups Section (Right Side) -->

  <!-- Badges Card -->
  <div class="mb-4">
    <h2 class="text-h5 font-weight-bold mb-4">Badges</h2>
    <v-card elevation="2" class="pa-4">
      <v-row>
        <v-col v-for="badge in badges" :key="badge.id" cols="4" class="text-center">
          <v-tooltip :text="badge.title" location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props">
                <v-avatar
                  :color="badge.earned ? badge.color : 'grey-lighten-2'"
                  size="56"
                  class="mb-2"
                >
                  <v-icon :color="badge.earned ? 'white' : 'grey'" size="32">
                    {{ badge.icon }}
                  </v-icon>
                </v-avatar>
                <div class="text-caption" :class="badge.earned ? '' : 'text-grey'">
                  {{ badge.title }}
                </div>
              </div>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<style scoped></style>
