

<template>
  <header class="header-main">
    <div class="header-container">
      <div class="header-content">
        <router-link to="/" class="logo-link">
          <img
            src="/images/logo.png"
            alt="Logo Anhh Library"
            class="logo-image"
            style="
              max-width: 48px;
              max-height: 48px;
              object-fit: contain;
              border-radius: 50%;
            "
          />
          <span class="logo-text">Anhh Library</span>
        </router-link>

        <!-- Hamburger button for mobile -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="mobile-menu-btn"
        >
          <svg
            v-if="!mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
          <router-link to="/" class="nav-link">Trang chủ</router-link>
          <router-link to="/books" class="nav-link">Sách</router-link>

          <template v-if="authStore.isAuthenticated">
            <div class="user-dropdown" ref="dropdownRef">
              <button @click="toggleDropdown" class="user-button">
                <span>{{ authStore.name }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="dropdown-icon"
                  :class="{ 'rotate-180': dropdownOpen }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <transition name="dropdown">
                <div v-if="dropdownOpen" class="dropdown-menu">
                  <router-link
                    v-if="authStore.role === 'admin'"
                    to="/admin"
                    @click="dropdownOpen = false"
                    class="dropdown-item admin"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="dropdown-icon-menu"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Trang quản lý</span>
                  </router-link>

                  <router-link
                    to="/my-borrows"
                    @click="dropdownOpen = false"
                    class="dropdown-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="dropdown-icon-menu"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>Sách đã mượn</span>
                  </router-link>

                  <button @click="handleLogout" class="dropdown-item logout">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="dropdown-icon-menu"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </transition>
            </div>
          </template>

          <template v-else>
            <router-link to="/auth/login" class="login-button">
              Đăng nhập
            </router-link>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const mobileMenuOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleLogout = () => {
  authStore.clearAuth();
  dropdownOpen.value = false;
  mobileMenuOpen.value = false;
  // Dùng window.location để đảm bảo trang thái được reset hoàn toàn
  window.location.href = "/auth/login";
};

// Close mobile menu on route change
router.afterEach(() => {
  mobileMenuOpen.value = false;
});

// Khởi tạo lại khi reload trang
onMounted(() => {
  authStore.initFromStorage?.();
});

// Xử lý click ra ngoài để đóng dropdown
const onClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.1s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scale(1);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>