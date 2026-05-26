<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  references: {
    type: Array,
    required: true,
    default: () => [],
  },
  initialCount: {
    type: Number,
    default: 2,
  },
})

const showAll = ref(false)

const visibleReferences = computed(() =>
  showAll.value ? props.references : props.references.slice(0, props.initialCount),
)

const hasMore = computed(() => props.references.length > props.initialCount)

const iconMap = {
  book: 'mdi-book-open-page-variant',
  documentation: 'mdi-web',
  journal: 'mdi-file-document-outline',
}

function getIcon(type) {
  return iconMap[type] || 'mdi-file-outline'
}
</script>

<template>
  <div class="references-section">
    <!-- ✅ Removed duplicate heading — slide title in LessonSlides already shows "References" -->
    <p class="text-caption text-grey mb-4">The following sources follow APA 7th edition format.</p>

    <v-list lines="two" class="pa-0">
      <v-list-item
        v-for="(ref, index) in visibleReferences"
        :key="ref.id"
        class="reference-item px-0 mb-2"
      >
        <template #prepend>
          <v-avatar size="32" color="primary" variant="tonal" class="mr-3">
            <v-icon size="18">{{ getIcon(ref.type) }}</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-body-2 reference-text">
          [{{ index + 1 }}] {{ ref.citation }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <div v-if="hasMore" class="mt-3">
      <v-btn
        variant="text"
        color="primary"
        size="small"
        :prepend-icon="showAll ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showAll = !showAll"
      >
        {{ showAll ? 'Show Less' : `Show ${references.length - initialCount} More` }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.references-section {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 12px;
  padding: 20px 24px;
}

.reference-item {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08);
}

.reference-item:last-child {
  border-bottom: none;
}

.reference-text {
  white-space: normal;
  line-height: 1.6;
  font-style: italic;
}
</style>
