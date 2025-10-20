<script setup>
import { ref } from 'vue'

const powerUps = ref([
  { id: 1, title: 'Time Freeze', icon: 'mdi-clock-outline', count: 3, color: 'blue' },
  { id: 2, title: 'Hint Boost', icon: 'mdi-lightbulb-outline', count: 5, color: 'amber' },
  { id: 3, title: 'XP Multiplier', icon: 'mdi-star-outline', count: 2, color: 'purple' },
  { id: 4, title: 'Skip Pass', icon: 'mdi-fast-forward-outline', count: 1, color: 'green' },
])
</script>

<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-4">Power-ups</h2>
    <v-card elevation="2" class="pa-4">
      <v-list>
        <template v-for="(powerUp, index) in powerUps" :key="powerUp.id">
          <v-list-item class="powerup-item px-2">
            <template v-slot:prepend>
              <v-avatar :color="powerUp.color" size="40" class="mr-3">
                <v-icon color="white">{{ powerUp.icon }}</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title>{{ powerUp.title }}</v-list-item-title>

            <template v-slot:append>
              <v-chip :color="powerUp.color" size="small"> x{{ powerUp.count }} </v-chip>
            </template>
          </v-list-item>

          <v-divider v-if="index < powerUps.length - 1" class="my-2"></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<style scoped>
.powerup-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.powerup-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
