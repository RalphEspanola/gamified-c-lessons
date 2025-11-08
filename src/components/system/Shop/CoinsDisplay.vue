<script setup>
import { useShop } from '@/composables/useShop'

const { coins } = useShop()
</script>

<template>
  <v-chip color="amber" variant="elevated" class="px-4">
    <v-icon start>mdi-coin</v-icon>
    <span class="font-weight-bold">{{ coins }}</span>
  </v-chip>
</template>
