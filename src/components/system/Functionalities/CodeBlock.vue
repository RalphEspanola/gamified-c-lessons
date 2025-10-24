<script setup>
defineProps({
  code: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-4">
    <v-card color="grey-lighten-4" class="pa-4">
      <pre class="code-block"><code>{{ code }}</code></pre>
    </v-card>
  </div>
</template>

<style scoped>
.code-block {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  overflow-x: auto;
}

pre {
  margin: 0;
}
</style>
