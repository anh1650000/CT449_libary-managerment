
<template>
  <div class="register-container">
    <h2 class="auth-title">Tạo tài khoản mới</h2>
    <p class="auth-subtitle">Chỉ với 2 bước đơn giản để tham gia cộng đồng.</p>

    <div class="registration-steps">
      <div class="step-item" :class="step === 1 ? 'active' : 'completed'">
        <div class="step-number">1</div>
        <div class="step-label">Tài khoản</div>
      </div>
      <div
        class="step-divider"
        :class="step === 2 ? 'completed' : 'inactive'"
      ></div>
      <div class="step-item" :class="step === 2 ? 'active' : 'inactive'">
        <div class="step-number">2</div>
        <div class="step-label">Cá nhân</div>
      </div>
    </div>

    <form @submit.prevent="handleRegister" class="auth-form">
      <div v-if="step === 1" class="auth-form">
        <div class="form-group">
          <label for="email" class="form-label"
            >Email <span class="required">*</span></label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="Ví dụ: ban@example.com"
            class="form-input"
          />
          <p v-if="errorEmail" class="form-error">
            {{ errorEmail }}
          </p>
        </div>
        <div class="form-group">
          <label for="password" class="form-label"
            >Mật khẩu <span class="required">*</span></label
          >
          <div class="input-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              required
              placeholder="Tối thiểu 6 ký tự"
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
          <p v-if="errorPassword" class="form-error">
            {{ errorPassword }}
          </p>
        </div>
        <div class="form-group">
          <label for="confirm" class="form-label"
            >Xác nhận mật khẩu <span class="required">*</span></label
          >
          <div class="input-wrapper">
            <input
              v-model="confirm"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm"
              required
              placeholder="Nhập lại mật khẩu"
              class="form-input"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="password-toggle"
              :aria-label="
                showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
              "
            >
              <svg
                v-if="!showConfirmPassword"
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
          <p v-if="errorConfirm" class="form-error">
            {{ errorConfirm }}
          </p>
        </div>
      </div>

      <div v-if="step === 2" class="form-grid">
        <div class="form-group">
          <label for="hoLot" class="form-label"
            >Họ lót <span class="required">*</span></label
          >
          <input
            v-model="hoLot"
            type="text"
            id="hoLot"
            required
            placeholder="Ví dụ: Nguyễn Văn"
            class="form-input"
          />
          <p v-if="errorHoLot" class="form-error">
            {{ errorHoLot }}
          </p>
        </div>
        <div class="form-group">
          <label for="ten" class="form-label"
            >Tên <span class="required">*</span></label
          >
          <input
            v-model="ten"
            type="text"
            id="ten"
            required
            placeholder="Ví dụ: A"
            class="form-input"
          />
          <p v-if="errorTen" class="form-error">
            {{ errorTen }}
          </p>
        </div>
        <div class="form-group full-width">
          <label for="ngaySinh" class="form-label">Ngày sinh</label>
          <input
            v-model="ngaySinh"
            type="date"
            id="ngaySinh"
            class="form-input"
          />
        </div>
        <div class="form-group full-width">
          <label for="diaChi" class="form-label">Địa chỉ</label>
          <input
            v-model="diaChi"
            type="text"
            id="diaChi"
            placeholder="Ví dụ: 123 Đường ABC, Quận XYZ"
            class="form-input"
          />
        </div>
        <div class="form-group full-width">
          <label for="dienThoai" class="form-label">Số điện thoại</label>
          <input
            v-model="dienThoai"
            type="tel"
            id="dienThoai"
            placeholder="Ví dụ: 0901234567"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-actions">
        <div v-if="step === 1" class="full-width">
          <button @click="nextStep" type="button" class="btn-primary">
            Tiếp tục
          </button>
        </div>
        <div v-if="step === 2" class="form-actions">
          <button @click="prevStep" type="button" class="btn-secondary">
            Quay lại
          </button>
          <button type="submit" class="btn-primary btn-primary-wide">
            Đăng ký tài khoản
          </button>
        </div>
      </div>

      <p
        v-if="message"
        :class="message.includes('thành công') ? 'success' : 'error'"
        class="form-message"
      >
        {{ message }}
      </p>

      <p class="auth-footer">
        Đã có tài khoản?
        <router-link to="/auth/login"> Đăng nhập ngay </router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

// State để quản lý các bước
const step = ref(1);

// Info cá nhân
const hoLot = ref("");
const ten = ref("");
const ngaySinh = ref("");
const diaChi = ref("");
const dienThoai = ref("");

// Tài khoản
const email = ref("");
const password = ref("");
const confirm = ref("");
const message = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Các biến báo lỗi
const errorHoLot = ref("");
const errorTen = ref("");
const errorEmail = ref("");
const errorPassword = ref("");
const errorConfirm = ref("");

const router = useRouter();

// Hàm kiểm tra lỗi cho từng bước
const validateStep1 = () => {
  errorEmail.value = "";
  errorPassword.value = "";
  errorConfirm.value = "";
  let hasError = false;

  if (!email.value) {
    errorEmail.value = "Vui lòng nhập email.";
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorEmail.value = "Email không hợp lệ.";
    hasError = true;
  }

  if (!password.value) {
    errorPassword.value = "Vui lòng nhập mật khẩu.";
    hasError = true;
  } else if (password.value.length < 6) {
    errorPassword.value = "Mật khẩu phải từ 6 ký tự.";
    hasError = true;
  }

  if (password.value !== confirm.value) {
    errorConfirm.value = "Mật khẩu không khớp.";
    hasError = true;
  }

  return !hasError;
};

const validateStep2 = () => {
  errorHoLot.value = "";
  errorTen.value = "";
  let hasError = false;

  if (!hoLot.value) {
    errorHoLot.value = "Vui lòng nhập họ lót.";
    hasError = true;
  }
  if (!ten.value) {
    errorTen.value = "Vui lòng nhập tên.";
    hasError = true;
  }

  return !hasError;
};

// Hàm chuyển bước
const nextStep = () => {
  if (validateStep1()) {
    step.value = 2;
  }
};

const prevStep = () => {
  step.value = 1;
};

// Hàm đăng ký cuối cùng
const handleRegister = async () => {
  if (step.value === 1) {
    if (validateStep1()) step.value = 2;
    return;
  }

  if (!validateStep2()) {
    message.value = "Vui lòng kiểm tra lại các trường bị lỗi.";
    return;
  }

  message.value = "Đang xử lý...";

  try {
    // Convert date from YYYY-MM-DD to DD/MM/YYYY if exists
    let formattedDate = ngaySinh.value;
    if (ngaySinh.value) {
      const [year, month, day] = ngaySinh.value.split("-");
      formattedDate = `${day}/${month}/${year}`;
    }

    const userRes = await api.post("/management/readers", {
      hoLot: hoLot.value,
      ten: ten.value,
      ngaySinh: formattedDate,
      diaChi: diaChi.value,
      dienThoai: dienThoai.value,
    });

    const maDocGia = userRes.data.maDocGia;

    await api.post("/auth/register", {
      email: email.value,
      password: password.value,
      maDocGia: maDocGia,
    });

    message.value = "Tạo tài khoản thành công 🎉";
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  } catch (err) {
    message.value =
      err.response?.data?.message || "Đã có lỗi xảy ra khi đăng ký.";
  }
};
</script>