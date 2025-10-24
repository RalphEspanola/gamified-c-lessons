<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="text-body-1 mb-4" style="white-space: pre-line">
    {{ content }}
  </div>
</template>
