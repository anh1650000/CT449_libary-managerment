import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import CSS files
import './assets/base.css'
import './assets/main.css'
import './assets/footer.css'
import './assets/home.css'
import './assets/books.css'
import './assets/book-detail.css'
import './assets/book-card.css'
import './assets/auth.css'
import './assets/my-borrows.css'
import './assets/not-found.css'
import './assets/admin.css'
import './assets/admin-components.css'
import './assets/admin-dashboard.css'
import './assets/admin-content.css'
import './assets/admin-users.css'
import './assets/admin-borrows.css'
import './assets/dark-theme.css'

import App from './App.vue'
import router from '../router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore()
authStore.initFromStorage()

app.use(router)

app.mount('#app')