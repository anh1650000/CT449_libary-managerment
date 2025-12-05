
<script setup>
import { ref, onUnmounted, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const mobileMenuOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleLogout = () => {
  dropdownOpen.value = false;
  authStore.clearAuth();
  window.location.href = "/auth/login";
};

const onClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  // `initFromStorage` đã được gọi ở main.js nên không cần ở đây nữa
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div class="admin-layout">
    <div
      class="sidebar-overlay"
      :class="{ active: mobileMenuOpen }"
      @click="mobileMenuOpen = false"
    ></div>
    <aside class="admin-sidebar" :class="{ 'mobile-open': mobileMenuOpen }">
      <div class="sidebar-header">
        <router-link to="/admin" class="sidebar-logo">
          <img
            src="/images/logo.png"
            alt="Logo"
            class="sidebar-logo-image"
            style="
              max-width: 20px;
              max-height: 20px;
              object-fit: contain;
              border-radius: 50%;
            "
          />
          <span class="sidebar-logo-text">Admin Panel</span>
        </router-link>
      </div>

      <nav class="sidebar-nav">
        <router-link
          to="/admin/dashboard"
          class="nav-item"
          active-class="active"
        >
          <svg
            class="nav-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span>Bảng điều khiển</span>
        </router-link>
        <router-link to="/admin/content" class="nav-item" active-class="active">
          <svg
            class="nav-icon"
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
          <span>Quản lý Nội dung</span>
        </router-link>
        <router-link to="/admin/users" class="nav-item" active-class="active">
          <svg
            class="nav-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125a4 4 0 00-6.44-6.44m0 0l-1.06-1.06a4 4 0 00-5.657 5.657l1.06 1.06"
            />
          </svg>
          <span>Quản lý Người dùng</span>
        </router-link>
        <router-link to="/admin/borrows" class="nav-item" active-class="active">
          <svg
            class="nav-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Quản lý Mượn/Trả</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="sidebar-footer-link">
          <svg
            class="nav-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span>Quay về trang chủ</span>
        </router-link>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-header">
        <button @click="toggleMobileMenu" class="admin-mobile-menu-btn">
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
        <div class="admin-user-menu" ref="dropdownRef">
          <button @click="toggleDropdown" class="user-menu-button">
            <span class="user-menu-name">{{ authStore.name }}</span>
            <svg
              class="dropdown-icon"
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
          <div v-if="dropdownOpen" class="user-dropdown-menu">
            <button @click="handleLogout" class="logout-button">
              <svg
                class="nav-icon"
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
        </div>
      </header>

      <main class="admin-content">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>