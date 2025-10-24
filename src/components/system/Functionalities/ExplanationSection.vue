<script setup>
defineProps({
  explanation: {
    type: String,
    required: true,
  },
  fixedCode: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div>
    <div class="text-body-1 mt-4" style="white-space: pre-line">
      {{ explanation }}
    </div>

    <!-- Fixed Code Block -->
    <div v-if="fixedCode" class="mt-3">
      <v-card color="success-lighten-4" class="pa-4">
        <pre class="code-block"><code>{{ fixedCode }}</code></pre>
      </v-card>
    </div>
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
