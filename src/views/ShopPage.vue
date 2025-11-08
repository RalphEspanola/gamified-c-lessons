<script setup>
import { ref, computed } from 'vue'
import { useShop } from '@/composables/useShop'
import { useHearts } from '@/composables/useHearts'

const { coins, shopItems, buyHeartRefill, buyPowerUp, canAfford } = useShop()
const { hearts, MAX_HEARTS } = useHearts()

const selectedCategory = ref('All')
const showPurchaseDialog = ref(false)
const selectedItem = ref(null)
const purchaseSuccess = ref(false)
const purchaseError = ref('')

const categories = computed(() => {
  const cats = ['All']
  shopItems.value.forEach((item) => {
    if (!cats.includes(item.category)) {
      cats.push(item.category)
    }
  })
  return cats
})

const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') {
    return shopItems.value
  }
  return shopItems.value.filter((item) => item.category === selectedCategory.value)
})

const openPurchaseDialog = (item) => {
  if (item.disabled) return
  selectedItem.value = item
  showPurchaseDialog.value = true
  purchaseSuccess.value = false
  purchaseError.value = ''
}

const confirmPurchase = () => {
  const item = selectedItem.value
  let success = false

  if (item.type === 'heart') {
    const refillType = item.id === 'heart-single' ? 'single' : 'full'
    success = buyHeartRefill(refillType)
  } else if (item.type === 'powerup') {
    const powerUpMap = {
      'time-freeze': 'timeFreeze',
      'skip-question': 'skipQuestion',
      'double-xp': 'doubleXP',
      'hint-reveal': 'hintReveal',
    }
    success = buyPowerUp(powerUpMap[item.id], item.price)
  }

  if (success) {
    purchaseSuccess.value = true
    setTimeout(() => {
      showPurchaseDialog.value = false
    }, 1500)
  } else {
    purchaseError.value = 'Not enough coins!'
  }
}
</script>

<template>
  <v-container class="pa-8" style="max-width: 1200px">
    <!-- Header -->
    <div class="mb-6">
      <div class="d-flex align-center justify-space-between flex-wrap gap-4 mb-4">
        <div>
          <v-btn icon="mdi-arrow-left" variant="text" to="/" class="mb-2"></v-btn>
          <h1 class="text-h4 font-weight-bold">
            <v-icon color="amber">mdi-store</v-icon>
            Shop
          </h1>
          <p class="text-subtitle-1 text-grey">
            Purchase items to help you on your learning journey
          </p>
        </div>

        <!-- Coin Balance -->
        <v-card class="coin-balance" elevation="4">
          <v-card-text class="pa-4">
            <div class="d-flex align-center gap-3">
              <v-icon size="40" color="amber">mdi-coin</v-icon>
              <div>
                <div class="text-caption text-grey">Your Balance</div>
                <div class="text-h5 font-weight-bold text-amber">{{ coins }} Coins</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Current Hearts -->
      <v-alert type="info" variant="tonal" class="mb-4">
        <div class="d-flex align-center gap-2">
          <v-icon>mdi-heart</v-icon>
          <span
            >Current Hearts: <strong>{{ hearts }}/{{ MAX_HEARTS }}</strong></span
          >
        </div>
      </v-alert>
    </div>

    <!-- Category Tabs -->
    <v-card class="mb-6" elevation="2">
      <v-tabs v-model="selectedCategory" bg-color="primary" dark grow>
        <v-tab v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- Shop Items Grid -->
    <v-row>
      <v-col v-for="item in filteredItems" :key="item.id" cols="12" sm="6" md="4">
        <v-card
          class="shop-item"
          :class="{ 'item-disabled': item.disabled }"
          elevation="3"
          hover
          @click="openPurchaseDialog(item)"
        >
          <!-- Badge -->
          <v-chip v-if="item.badge" color="success" size="small" class="badge-chip">
            {{ item.badge }}
          </v-chip>

          <!-- Owned Badge -->
          <v-chip v-if="item.owned > 0" color="blue" size="small" class="owned-chip">
            Owned: {{ item.owned }}
          </v-chip>

          <v-card-text class="pa-6">
            <!-- Icon -->
            <div class="text-center mb-4">
              <v-avatar :color="item.color" size="80" class="mb-3">
                <v-icon size="50" color="white">{{ item.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold">{{ item.name }}</h3>
            </div>

            <!-- Description -->
            <p class="text-body-2 text-grey text-center mb-4">
              {{ item.description }}
            </p>

            <!-- Price -->
            <div class="d-flex align-center justify-center gap-2">
              <v-icon color="amber">mdi-coin</v-icon>
              <span class="text-h6 font-weight-bold">{{ item.price }}</span>
            </div>

            <!-- Buy Button -->
            <v-btn
              block
              :color="item.color"
              size="large"
              class="mt-4"
              :disabled="item.disabled || !canAfford(item.price)"
            >
              <v-icon start>mdi-cart</v-icon>
              {{
                item.disabled
                  ? 'Max Hearts'
                  : canAfford(item.price)
                    ? 'Buy Now'
                    : 'Not Enough Coins'
              }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card v-if="filteredItems.length === 0" class="pa-8 text-center" elevation="0">
      <v-icon size="80" color="grey">mdi-package-variant</v-icon>
      <h3 class="text-h6 mt-4 text-grey">No items in this category</h3>
    </v-card>

    <!-- Purchase Confirmation Dialog -->
    <v-dialog v-model="showPurchaseDialog" max-width="400">
      <v-card v-if="selectedItem">
        <v-card-title class="text-center pa-6 bg-grey-lighten-4">
          <v-avatar :color="selectedItem.color" size="80" class="mb-3">
            <v-icon size="50" color="white">{{ selectedItem.icon }}</v-icon>
          </v-avatar>
          <div class="text-h6">{{ selectedItem.name }}</div>
        </v-card-title>

        <v-card-text class="pa-6">
          <div v-if="!purchaseSuccess">
            <p class="text-body-1 text-center mb-4">
              {{ selectedItem.description }}
            </p>

            <v-divider class="my-4" />

            <!-- Cost Summary -->
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-grey">Price:</span>
              <div class="d-flex align-center gap-2">
                <v-icon color="amber">mdi-coin</v-icon>
                <span class="text-h6 font-weight-bold">{{ selectedItem.price }}</span>
              </div>
            </div>

            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-grey">Your Balance:</span>
              <div class="d-flex align-center gap-2">
                <v-icon color="amber">mdi-coin</v-icon>
                <span class="text-h6">{{ coins }}</span>
              </div>
            </div>

            <div class="d-flex justify-space-between align-center">
              <span class="text-grey">After Purchase:</span>
              <div class="d-flex align-center gap-2">
                <v-icon color="amber">mdi-coin</v-icon>
                <span class="text-h6 font-weight-bold">{{ coins - selectedItem.price }}</span>
              </div>
            </div>

            <!-- Error Message -->
            <v-alert v-if="purchaseError" type="error" class="mt-4" density="compact">
              {{ purchaseError }}
            </v-alert>
          </div>

          <!-- Success Message -->
          <div v-else class="text-center">
            <v-icon size="80" color="success" class="mb-4">mdi-check-circle</v-icon>
            <h3 class="text-h6 text-success">Purchase Successful!</h3>
            <p class="text-body-2 text-grey mt-2">Item added to your inventory</p>
          </div>
        </v-card-text>

        <v-card-actions v-if="!purchaseSuccess" class="pa-6 pt-0">
          <v-btn variant="outlined" block @click="showPurchaseDialog = false"> Cancel </v-btn>
          <v-btn
            :color="selectedItem.color"
            variant="elevated"
            block
            @click="confirmPurchase"
            :disabled="!canAfford(selectedItem.price)"
          >
            Confirm Purchase
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- How to Earn Coins Info -->
    <v-card class="mt-6" color="blue-lighten-5" elevation="2">
      <v-card-text class="pa-6">
        <h3 class="text-h6 font-weight-bold mb-3">
          <v-icon color="primary">mdi-information</v-icon>
          How to Earn Coins
        </h3>
        <v-list class="bg-transparent">
          <v-list-item prepend-icon="mdi-book-check">
            <v-list-item-title>Complete Lessons: <strong>10 coins</strong></v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-trophy">
            <v-list-item-title>Finish Quizzes: <strong>20 coins</strong></v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-star">
            <v-list-item-title>Perfect Score: <strong>+10 bonus coins</strong></v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-medal">
            <v-list-item-title>Daily Login: <strong>5 coins</strong></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.coin-balance {
  background: linear-gradient(135deg, #fff9c4 0%, #ffe082 100%);
  border: 2px solid #ffd54f;
}

.shop-item {
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.shop-item:hover:not(.item-disabled) {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.item-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.badge-chip {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.owned-chip {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
</style>
