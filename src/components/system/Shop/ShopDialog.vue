<template>
  <v-dialog :model-value="localModel" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Shop</v-card-title>

      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col v-for="item in shopItems" :key="item.id" cols="12" sm="6">
              <v-card outlined class="pa-2 d-flex flex-column align-center">
                <v-icon :color="item.color" size="36">{{ item.icon }}</v-icon>
                <div class="font-weight-medium mt-2">{{ item.name }}</div>
                <div class="text-caption mb-2">{{ item.description }}</div>
                <v-btn
                  :color="item.type === 'heart' ? 'red' : 'primary'"
                  small
                  :disabled="!canAfford(item.price) || item.disabled"
                  @click="buy(item)"
                >
                  Buy {{ item.price }} 💰
                </v-btn>
                <div v-if="item.disabled" class="text-caption mt-1 text-grey">Already full</div>
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

<script setup>
import { computed } from 'vue'
import { useShop } from '@/composables/system/useShop'
import { useHearts } from '@/composables/PowerUps/useHearts'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  shopItems: { type: Array, required: true },
})

const emit = defineEmits(['update:modelValue'])

const { coins, canAfford, buyHeartRefill } = useShop()
const { hearts, MAX_HEARTS } = useHearts()

// Use computed with getter/setter to sync v-model
const localModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function closeDialog() {
  localModel.value = false
}

function buy(item) {
  if (item.type === 'heart') {
    const type = item.id === 'heart-single' ? 'single' : 'full'
    if (buyHeartRefill(type)) {
      console.log(`Bought ${item.name}`)
    }
  }
}
</script>

<style scoped>
.text-grey {
  color: grey;
}
</style>
