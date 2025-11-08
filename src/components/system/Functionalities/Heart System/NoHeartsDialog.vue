<script setup>
import { useHearts } from '@/composables/useHearts'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const { formattedTimeRemaining, hearts } = useHearts()

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog :model-value="modelValue" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5 text-center pa-6">
        <v-icon size="80" color="grey">mdi-heart-broken</v-icon>
        <div class="mt-4">Out of Hearts!</div>
      </v-card-title>

      <v-card-text class="text-center">
        <p class="text-body-1 mb-4">You've run out of hearts. You can:</p>

        <v-list class="mx-auto" max-width="300">
          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-timer</v-icon>
              Wait {{ formattedTimeRemaining }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-book-open-variant</v-icon>
              Review previous lessons
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="justify-center pb-6">
        <v-btn color="primary" variant="elevated" @click="close"> Back to Lessons </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
