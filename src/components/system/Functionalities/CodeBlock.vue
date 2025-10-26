<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: {
    type: [String, Array],
    required: true,
  },
})

// Check if code is an array
const isMultiple = computed(() => Array.isArray(props.code))
</script>

<template>
  <div class="mb-4">
    <!-- Single code block -->
    <v-card v-if="!isMultiple" color="grey-lighten-4" class="pa-4">
      <pre class="code-block"><code>{{ code }}</code></pre>
    </v-card>

    <!-- Multiple code blocks -->
    <div v-else>
      <v-card
        v-for="(codeBlock, index) in code"
        :key="index"
        color="grey-lighten-4"
        class="pa-4 mb-3"
      >
        <pre class="code-block"><code>{{ codeBlock }}</code></pre>
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
