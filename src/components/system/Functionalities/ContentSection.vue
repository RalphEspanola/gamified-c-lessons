<script setup>
defineProps({
  content: {
    type: [String, Array],
    required: true,
  },
})
</script>

<template>
  <div>
    <!-- Handle array content with mixed text and code -->
    <template v-if="Array.isArray(content)">
      <template v-for="(item, index) in content" :key="index">
        <!-- Text content -->
        <div v-if="item.type === 'text'" class="text-body-1 mt-4" style="white-space: pre-line">
          {{ item.value }}
        </div>

        <!-- Code block -->
        <div v-else-if="item.type === 'code'" class="mt-3 mb-3">
          <v-card color="grey-lighten-4" class="pa-4">
            <pre class="code-block"><code>{{ item.value }}</code></pre>
          </v-card>
        </div>
      </template>
    </template>

    <!-- Regular string content -->
    <div v-else class="text-body-1 mb-4" style="white-space: pre-line">
      {{ content }}
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
