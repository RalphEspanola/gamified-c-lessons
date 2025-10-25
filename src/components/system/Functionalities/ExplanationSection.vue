<script setup>
import { computed } from 'vue'

const props = defineProps({
  explanation: {
    type: String,
    required: true,
  },
  fixedCode: {
    type: String,
    default: null,
  },
})

// detect if explanation contains a table
const hasTable = computed(() => props.explanation.includes('<table>'))
</script>

<template>
  <div>
    <!-- Conditional rendering -->
    <div v-if="hasTable" class="text-body-1 mt-4 explanation-content" v-html="explanation"></div>

    <div v-else class="text-body-1 mt-4" style="white-space: pre-line">
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

/* Use :deep() to style dynamically inserted HTML */
.explanation-content :deep(table) {
  width: auto !important;
  max-width: 100%;
  border-collapse: collapse !important;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid #333 !important;
  display: table !important;
}

.explanation-content :deep(thead) {
  display: table-header-group !important;
}

.explanation-content :deep(tbody) {
  display: table-row-group !important;
}

.explanation-content :deep(tr) {
  display: table-row !important;
}

.explanation-content :deep(th),
.explanation-content :deep(td) {
  display: table-cell !important;
  border: 1px solid #999 !important;
  padding: 10px 16px !important;
  text-align: left !important;
  vertical-align: top !important;
}

.explanation-content :deep(th) {
  background-color: #e5e7eb !important;
  font-weight: 600 !important;
  border-bottom: 2px solid #666 !important;
}

.explanation-content :deep(tbody tr:hover) {
  background-color: #f9fafb;
}
</style>
