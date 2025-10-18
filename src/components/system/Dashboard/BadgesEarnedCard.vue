<script setup>
import { ref } from 'vue'

const badgesEarned = ref(8)
const totalBadges = ref(20)
</script>

<template>
  <v-col cols="12" sm="6" md="3">
    <v-card elevation="2" class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon color="purple" size="32" class="mr-2">mdi-medal</v-icon>
        <div>
          <div class="text-caption text-grey">Badges Earned</div>
          <div class="text-h5 font-weight-bold">{{ badgesEarned }} / {{ totalBadges }}</div>
        </div>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="d-flex justify-center gap-2 mb-3">
        <v-icon color="gold" size="40">mdi-trophy</v-icon>
        <v-icon color="silver" size="40">mdi-trophy</v-icon>
        <v-icon color="bronze" size="40">mdi-trophy</v-icon>
      </div>

      <v-progress-linear
        :model-value="(badgesEarned / totalBadges) * 100"
        color="purple"
        height="8"
        rounded
        class="mb-2"
      ></v-progress-linear>

      <div class="text-caption text-grey text-center">
        {{ totalBadges - badgesEarned }} more to unlock
      </div>
    </v-card>
  </v-col>
</template>

<style scoped>
.v-card {
  height: 100%;
}
</style>
