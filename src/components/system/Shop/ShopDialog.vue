<script setup>
import { computed, onMounted } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useHearts } from '@/composables/PowerUps/useHearts'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  shopItems: { type: Array, required: true },
})

const emit = defineEmits(['update:modelValue'])

const { coins, canAfford, buyHeartRefill, buyPowerUp, initializeShop } = useShop()
const { hearts, MAX_HEARTS, initializeHearts } = useHearts()

// Initialize on mount
onMounted(async () => {
  await initializeShop()
  await initializeHearts()
})

// Use computed with getter/setter to sync v-model
const localModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function closeDialog() {
  localModel.value = false
}

async function buy(item) {
  console.log(`🛒 Buy button clicked for: ${item.name}`)

  if (item.type === 'heart') {
    const type = item.id === 'heart-single' ? 'single' : 'full'
    const success = await buyHeartRefill(type)
    if (success) {
      console.log(`✅ Bought ${item.name}`)
    } else {
      console.log(`❌ Failed to buy ${item.name}`)
    }
  } else if (item.type === 'powerup') {
    const powerUpTypeMap = {
      'streak-saver': 'streakSaver',
      'double-xp': 'doubleXP',
      'answer-protect': 'answerProtect',
    }

    const powerUpType = powerUpTypeMap[item.id]
    console.log(`🎯 Mapped to powerUpType: ${powerUpType}`)

    const success = await buyPowerUp(powerUpType, item.price)

    if (success) {
      console.log(`✅ Successfully bought ${item.name}`)
      // ✅ DON'T call initializeShop here - buyPowerUp already updated local state
    } else {
      console.log(`❌ Failed to buy ${item.name}`)
    }
  }
}
</script>

<template>
  <v-dialog :model-value="localModel" max-width="500">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center justify-space-between">
        <span>Shop</span>
        <v-chip color="amber" size="small">
          <v-icon start size="small">mdi-coin</v-icon>
          {{ coins }}
        </v-chip>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col v-for="item in shopItems" :key="item.id" cols="12" sm="6">
              <v-card outlined class="pa-2 d-flex flex-column align-center">
                <v-icon :color="item.color" size="36">{{ item.icon }}</v-icon>
                <div class="font-weight-medium mt-2">{{ item.name }}</div>
                <div class="text-caption mb-2 text-center">{{ item.description }}</div>

                <!-- Show owned quantity for powerups -->
                <v-chip v-if="item.owned" color="primary" size="x-small" class="mb-2">
                  Owned: {{ item.owned }}
                </v-chip>

                <v-btn
                  :color="item.type === 'heart' ? 'red' : 'primary'"
                  size="small"
                  :disabled="!canAfford(item.price) || item.disabled"
                  @click="buy(item)"
                >
                  Buy {{ item.price }} 💰
                </v-btn>
                <div v-if="item.disabled" class="text-caption mt-1 text-grey">
                  {{ item.type === 'heart' ? 'Hearts Full' : 'Not Available' }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.text-grey {
  color: grey;
}
</style>
