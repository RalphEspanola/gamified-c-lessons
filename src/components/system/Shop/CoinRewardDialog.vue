<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  coinsEarned: Number,
  perfectScore: Boolean,
})

const emit = defineEmits(['update:modelValue', 'continue'])

const showConfetti = ref(false)

onMounted(() => {
  if (props.modelValue) {
    showConfetti.value = true
  }
})

const continueToNext = () => {
  emit('update:modelValue', false)
  emit('continue')
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="500">
    <v-card>
      <v-card-title class="text-center pa-6 bg-amber-lighten-4">
        <div class="d-flex flex-column align-center">
          <v-icon size="100" color="amber" class="coin-bounce">mdi-coin</v-icon>
          <div class="text-h5 mt-4 font-weight-bold">Lesson Complete!</div>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <!-- Coins Earned -->
        <div class="text-center mb-4">
          <v-chip color="amber" size="x-large" class="px-6 py-6">
            <v-icon start size="30">mdi-coin</v-icon>
            <span class="text-h4 font-weight-bold">+{{ coinsEarned }}</span>
          </v-chip>
        </div>

        <!-- Breakdown -->
        <v-list class="bg-transparent mb-4">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="success">mdi-check-circle</v-icon>
            </template>
            <v-list-item-title>Lesson Completion</v-list-item-title>
            <template v-slot:append>
              <div class="d-flex align-center gap-1">
                <v-icon size="small" color="amber">mdi-coin</v-icon>
                <span class="font-weight-bold">+10</span>
              </div>
            </template>
          </v-list-item>

          <v-list-item v-if="perfectScore">
            <template v-slot:prepend>
              <v-icon color="success">mdi-star</v-icon>
            </template>
            <v-list-item-title>Perfect Score Bonus!</v-list-item-title>
            <template v-slot:append>
              <div class="d-flex align-center gap-1">
                <v-icon size="small" color="amber">mdi-coin</v-icon>
                <span class="font-weight-bold">+10</span>
              </div>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="red">mdi-heart-plus</v-icon>
            </template>
            <v-list-item-title>Heart Restored</v-list-item-title>
            <template v-slot:append>
              <v-icon color="red">mdi-heart</v-icon>
            </template>
          </v-list-item>
        </v-list>

        <!-- Perfect Score Badge -->
        <v-alert v-if="perfectScore" type="success" variant="tonal" class="mb-4">
          <div class="d-flex align-center gap-2">
            <v-icon>mdi-trophy</v-icon>
            <div>
              <div class="font-weight-bold">Perfect Score!</div>
              <div class="text-caption">You answered all questions correctly!</div>
            </div>
          </div>
        </v-alert>

        <!-- Shop Hint -->
        <v-card color="blue-lighten-5" class="pa-4" elevation="0">
          <div class="d-flex align-center gap-3">
            <v-icon color="primary" size="40">mdi-store</v-icon>
            <div class="text-caption">
              <strong>Visit the Shop</strong> to spend your coins on power-ups and heart refills!
            </div>
          </div>
        </v-card>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-btn
          color="primary"
          variant="elevated"
          size="large"
          block
          prepend-icon="mdi-arrow-right"
          @click="continueToNext"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
@keyframes coinBounce {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.coin-bounce {
  animation: coinBounce 1s ease-in-out infinite;
}
</style>
