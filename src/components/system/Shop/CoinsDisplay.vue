<script setup>
import { onMounted } from 'vue'
import { useShop } from '@/composables/system/useShop'

const { coins, initializeShop } = useShop()

onMounted(async () => {
  await initializeShop()
})
</script>

<template>
  <v-chip color="amber" variant="elevated" class="px-4">
    <v-icon start>mdi-cash</v-icon>
    <span class="font-weight-bold">{{ coins }}</span>
  </v-chip>
</template>
