<script setup>
import { ref, computed, onMounted } from 'vue'
import TopNavbar from '@/components/layout/TopNavbar.vue'
import { useLeaderboard } from '@/composables/system/useLeaderboard'
import { useAuth } from '@/composables/auth/useAuth'

const { currentUser } = useAuth()
const { leaderboard, currentUserRank, isLoading, fetchLeaderboard } = useLeaderboard()

const searchQuery = ref('')

onMounted(async () => {
  await fetchLeaderboard()
})

// Filter leaderboard based on search
const filteredLeaderboard = computed(() => {
  if (!searchQuery.value) return leaderboard.value

  return leaderboard.value.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
    return fullName.includes(searchQuery.value.toLowerCase())
  })
})

// Get medal for top 3
const getMedal = (rank) => {
  switch (rank) {
    case 1:
      return { icon: 'mdi-trophy', color: 'amber' }
    case 2:
      return { icon: 'mdi-trophy', color: 'grey' }
    case 3:
      return { icon: 'mdi-trophy', color: 'orange' }
    default:
      return null
  }
}

// Get rank badge color
const getRankColor = (rank) => {
  if (rank <= 3) return 'primary'
  if (rank <= 10) return 'success'
  if (rank <= 50) return 'info'
  return 'grey'
}

// Get level badge
const getLevelBadge = (level) => {
  if (level >= 50) return { text: 'Master', color: 'purple' }
  if (level >= 30) return { text: 'Expert', color: 'indigo' }
  if (level >= 20) return { text: 'Advanced', color: 'blue' }
  if (level >= 10) return { text: 'Intermediate', color: 'green' }
  return { text: 'Beginner', color: 'orange' }
}

// Check if user is current user
const isCurrentUser = (userId) => {
  return currentUser.value?.id === userId
}
</script>

<template>
  <TopNavbar />
  <v-container class="py-8 mt-15">
    <!-- Header -->
    <div class="text-center mb-8">
      <v-icon size="80" color="amber" class="mb-4">mdi-trophy</v-icon>
      <h1 class="text-h3 font-weight-bold mb-2">🏆 Leaderboard</h1>
      <p class="text-h6 text-grey">Compete with learners worldwide!</p>
    </div>

    <!-- Current User Stats Card -->
    <v-card v-if="currentUserRank" class="mb-6 current-user-card" elevation="8">
      <v-card-text class="pa-6">
        <div class="d-flex align-center justify-space-between flex-wrap gap-4">
          <div class="d-flex align-center gap-4">
            <v-avatar size="80" :color="getRankColor(currentUserRank.rank)">
              <v-icon v-if="!currentUserRank.avatar_url" size="40" color="white">
                mdi-account
              </v-icon>
              <v-img v-else :src="currentUserRank.avatar_url" />
            </v-avatar>

            <div>
              <div class="text-h5 font-weight-bold">
                {{ currentUserRank.first_name }} {{ currentUserRank.last_name }}
              </div>
              <div class="d-flex align-center gap-2 mt-1">
                <v-chip
                  :color="getLevelBadge(currentUserRank.level).color"
                  size="small"
                  variant="flat"
                >
                  Level {{ currentUserRank.level }}
                </v-chip>
                <v-chip :color="getRankColor(currentUserRank.rank)" size="small" variant="flat">
                  #{{ currentUserRank.rank }}
                </v-chip>
              </div>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <v-icon color="indigo" size="20">mdi-lightning-bolt</v-icon>
              <span class="stat-value">{{ currentUserRank.total_xp }}</span>
              <span class="stat-label">XP</span>
            </div>
            <div class="stat-item">
              <v-icon color="amber" size="20">mdi-coin</v-icon>
              <span class="stat-value">{{ currentUserRank.coins }}</span>
              <span class="stat-label">Coins</span>
            </div>
            <div class="stat-item">
              <v-icon color="orange" size="20">mdi-fire</v-icon>
              <span class="stat-value">{{ currentUserRank.current_streak }}</span>
              <span class="stat-label">Streak</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Search & Filters -->
    <v-card class="mb-4" elevation="2">
      <v-card-text>
        <div class="d-flex gap-3 flex-wrap align-center">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Search users..."
            variant="outlined"
            density="compact"
            hide-details
            clearable
            style="max-width: 400px"
          />

          <!-- <v-btn-toggle v-model="selectedTab" color="primary" mandatory>
            <v-btn value="global" size="small">
              <v-icon start>mdi-earth</v-icon>
              Global
            </v-btn>
            <v-btn value="friends" size="small" disabled>
              <v-icon start>mdi-account-group</v-icon>
              Friends
            </v-btn>
          </v-btn-toggle> -->
        </div>
      </v-card-text>
    </v-card>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="text-h6 mt-4">Loading rankings...</p>
    </div>

    <!-- Leaderboard Table -->
    <v-card v-else elevation="4">
      <v-list class="py-0">
        <template v-for="(user, index) in filteredLeaderboard" :key="user.user_id">
          <v-list-item
            :class="[
              'leaderboard-item',
              { 'current-user-highlight': isCurrentUser(user.user_id) },
              { 'top-three': user.rank <= 3 },
            ]"
            :ripple="false"
          >
            <!-- Rank -->
            <template #prepend>
              <div class="rank-container">
                <v-icon
                  v-if="getMedal(user.rank)"
                  :color="getMedal(user.rank).color"
                  size="32"
                  class="medal-icon"
                >
                  {{ getMedal(user.rank).icon }}
                </v-icon>
                <v-chip v-else :color="getRankColor(user.rank)" size="small" class="rank-chip">
                  #{{ user.rank }}
                </v-chip>
              </div>
            </template>

            <!-- User Info -->
            <div class="d-flex align-center gap-3 flex-grow-1">
              <v-avatar :size="user.rank <= 3 ? 56 : 48" :color="getRankColor(user.rank)">
                <v-icon v-if="!user.avatar_url" color="white">mdi-account</v-icon>
                <v-img v-else :src="user.avatar_url" />
              </v-avatar>

              <div class="user-info flex-grow-1">
                <div class="d-flex align-center gap-2">
                  <span class="text-h6 font-weight-bold">
                    {{ user.first_name }} {{ user.last_name }}
                  </span>
                  <v-chip
                    v-if="isCurrentUser(user.user_id)"
                    color="primary"
                    size="x-small"
                    variant="flat"
                  >
                    YOU
                  </v-chip>
                </div>

                <div class="d-flex align-center gap-2 mt-1 flex-wrap">
                  <v-chip :color="getLevelBadge(user.level).color" size="x-small" variant="tonal">
                    Lv {{ user.level }} • {{ getLevelBadge(user.level).text }}
                  </v-chip>

                  <span class="text-caption text-grey">
                    {{ user.lessons_completed }} lessons • {{ user.quizzes_completed }} quizzes
                  </span>
                </div>
              </div>

              <!-- Stats -->
              <div class="stats-row d-none d-md-flex gap-4">
                <div class="stat-badge">
                  <v-icon color="indigo" size="18">mdi-lightning-bolt</v-icon>
                  <span class="font-weight-bold">{{ user.total_xp.toLocaleString() }}</span>
                </div>

                <div class="stat-badge">
                  <v-icon color="amber" size="18">mdi-coin</v-icon>
                  <span class="font-weight-bold">{{ user.coins }}</span>
                </div>

                <div v-if="user.current_streak > 0" class="stat-badge">
                  <v-icon color="orange" size="18">mdi-fire</v-icon>
                  <span class="font-weight-bold">{{ user.current_streak }}</span>
                </div>
              </div>
            </div>
          </v-list-item>

          <v-divider v-if="index < filteredLeaderboard.length - 1" />
        </template>

        <!-- Empty State -->
        <v-list-item v-if="filteredLeaderboard.length === 0" class="text-center py-12">
          <div>
            <v-icon size="64" color="grey-lighten-1">mdi-trophy-outline</v-icon>
            <p class="text-h6 mt-4">No users found</p>
            <p class="text-caption">Try a different search term</p>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.current-user-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.leaderboard-item {
  padding: 16px 20px;
  transition: all 0.3s ease;
}

.leaderboard-item:hover {
  background-color: rgba(103, 58, 183, 0.05);
}

.top-three {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%);
}

.current-user-highlight {
  background: linear-gradient(90deg, rgba(103, 58, 183, 0.15) 0%, transparent 100%);
  border-left: 4px solid #673ab7;
}

.rank-container {
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.medal-icon {
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.1);
    filter: brightness(1.3);
  }
}

.rank-chip {
  font-weight: 700;
  min-width: 50px;
}

.user-info {
  min-width: 200px;
}

.stats-row {
  min-width: 250px;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 12px;
}

@media (max-width: 960px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .stat-value {
    font-size: 18px;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    gap: 8px;
  }

  .stat-item {
    gap: 2px;
  }

  .stat-value {
    font-size: 16px;
  }

  .stat-label {
    font-size: 10px;
  }
}
</style>
