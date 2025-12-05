

<template>
  <div class="book-detail-page">
    <div class="book-detail-container">
      <button @click="$router.back()" class="back-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Quay lại</span>
      </button>

      <div v-if="isLoading" class="loading-container">
        <p class="loading-text">Đang tải thông tin sách...</p>
      </div>

      <div v-else-if="book?._id" class="book-detail-card">
        <div class="book-detail-content">
          <div class="book-image-section">
            <img
              :src="book.hinhAnh || defaultImg"
              :alt="`Bìa sách ${book.tenSach}`"
              class="book-cover"
            />
          </div>

          <div class="book-info-section">
            <div>
              <h1 class="book-title">
                {{ book.tenSach }}
              </h1>
              <p class="book-code">
                Mã sách:
                <span class="code-value">{{ book.maSach }}</span>
              </p>
              <p class="book-author">
                Tác giả: <span class="author-name">{{ book.tacGia }}</span>
              </p>
              <p class="book-publisher">
                NXB:
                <span class="publisher-name">{{
                  book.maNXB?.tenNXB || "Chưa rõ"
                }}</span>
                (Năm: <span class="year-value">{{ book.namXuatBan }}</span
                >)
              </p>

              <div class="book-price">{{ book.donGia?.toLocaleString() }}₫</div>
            </div>

            <div class="book-meta-grid">
              <div class="meta-item">
                <div class="meta-label">Số quyển còn</div>
                <div
                  class="meta-value"
                  :class="{
                    'stock-low': book.soQuyen <= 5,
                    'stock-available': book.soQuyen > 5,
                  }"
                >
                  {{ book.soQuyen }}
                </div>
              </div>
            </div>

            <div class="borrow-section">
              <button
                @click="handleBorrowBook"
                :disabled="isBorrowing || book.soQuyen <= 0"
                class="borrow-button"
                :class="{
                  'borrow-button-disabled': book.soQuyen <= 0,
                  'borrow-button-loading': isBorrowing,
                }"
              >
                <span v-if="isBorrowing">
                  <svg class="loading-spinner" viewBox="0 0 24 24">
                    <circle
                      class="spinner-track"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="spinner-path"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang xử lý...
                </span>
                <span v-else-if="book.soQuyen > 0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="borrow-icon"
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
                  Yêu cầu mượn sách
                </span>
                <span v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stock-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Đã hết sách
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="error-container">
        <p class="error-message">
          Không thể tải thông tin sách. Vui lòng thử lại sau.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import api from "../services/api";
import { useAuthStore } from "../stores/auth";

// --- KHỞI TẠO ---
const defaultImg =
  "https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const book = ref({});
const isLoading = ref(true);
const isBorrowing = ref(false);

// --- LẤY DỮ LIỆU SÁCH ---
onMounted(async () => {
  const maSach = route.params.maSach;
  try {
    const res = await api.get(`/library/books/masach/${maSach}`);
    book.value = res.data;
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết sách:", err);
  } finally {
    isLoading.value = false;
  }
});

// --- HÀM MƯỢN SÁCH ĐÃ SỬA LẠI HOÀN CHỈNH ---
async function handleBorrowBook() {
  // 1. Kiểm tra đăng nhập
  if (!authStore.isAuthenticated) {
    alert("Bạn cần đăng nhập để mượn sách.");
    router.push({ name: "Login" });
    return;
  }

  // 2. Kiểm tra sách còn không
  if (book.value.soQuyen <= 0) {
    alert("Sách này đã hết, không thể mượn.");
    return;
  }

  isBorrowing.value = true;

  try {
    // 3. Chuẩn bị payload đúng cho API
    const borrowerId = authStore.userInfo?.maDocGia || authStore.userInfo?.msnv;
    const onModel = authStore.role === "admin" ? "Staff" : "User";
    const bookId = book.value.maSach;
    const ngayTra = new Date();
    ngayTra.setDate(ngayTra.getDate() + 7);

    // 4. Gọi API
    await api.post("/library/borrows", {
      borrowerId,
      onModel,
      bookId,
      ngayTra: ngayTra.toISOString(),
    });

    alert(
      `Yêu cầu mượn sách "${
        book.value.tenSach
      }" thành công!\nHạn trả: ${ngayTra.toLocaleDateString("vi-VN")}`
    );

    // 5. Cập nhật giao diện ngay lập tức
    book.value.soQuyen--;
  } catch (err) {
    console.error("Lỗi khi tạo phiếu mượn:", err);
    alert(err.response?.data?.message || "Không thể gửi yêu cầu mượn sách.");
  } finally {
    isBorrowing.value = false;
  }
}
</script>

<style>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Spinner for loading button */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>