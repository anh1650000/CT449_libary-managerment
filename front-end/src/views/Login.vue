

<template>
  <form @submit.prevent="handleLogin" class="auth-form">
    <h2 class="auth-title">Đăng nhập tài khoản</h2>

    <div class="form-group">
      <label for="email" class="form-label"> Email đăng nhập </label>
      <div class="input-wrapper">
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          placeholder="Ví dụ: ban@example.com"
          class="form-input"
        />
        <svg
          class="input-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          ></path>
        </svg>
      </div>
    </div>

    <div class="form-group">
      <label for="password" class="form-label"> Mật khẩu </label>
      <div class="input-wrapper">
        <input
          id="password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          required
          placeholder="Mật khẩu của bạn"
          class="form-input"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="password-toggle"
          :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
        >
          <svg
            v-if="!showPassword"
            class="input-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          <svg
            v-else
            class="input-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <button type="submit" class="btn-primary">Đăng nhập</button>

    <p v-if="error" class="form-message error">
      <svg
        class="message-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      {{ error }}
    </p>

    <p class="auth-footer">
      Chưa có tài khoản?
      <router-link to="/auth/register"> Đăng ký tài khoản mới </router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);

const handleLogin = async () => {
  error.value = "";

  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

    // Chỉ lưu khi đăng nhập thành công
    authStore.setAuth(res.data);

    // Đợi một chút để localStorage được lưu
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Kiểm tra vai trò và chuyển hướng an toàn
    if (res.data.role === "admin") {
      await router.push("/admin/dashboard");
    } else {
      await router.push("/");
    }
  } catch (err) {
    // Xóa mật khẩu khi có lỗi
    password.value = "";

    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 404)
    ) {
      error.value =
        err.response.data.message || "Email hoặc mật khẩu không chính xác.";
    } else {
      error.value = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      console.error("Lỗi đăng nhập không xác định:", err);
    }
  }
};
</script>