import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import { useAuthState } from '@/composables/auth/useAuthState'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

// 🔒 Initialize auth state before mounting the app
const { initAuth } = useAuthState()
initAuth().then(() => {
  app.mount('#app')
})
