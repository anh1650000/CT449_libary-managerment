
<template>
  <div class="my-borrows-page">
    <div class="my-borrows-container">
      <div class="page-header">
        <h1 class="page-title">Sách Đã Mượn</h1>
        <p class="page-description">
          Theo dõi lịch sử và trạng thái mượn sách của bạn.
        </p>
      </div>

      <div v-if="borrows.length === 0" class="empty-state">
        <p class="empty-message">
          Bạn chưa mượn cuốn sách nào từ thư viện của chúng tôi.
        </p>
        <p class="empty-hint">
          Hãy ghé thăm
          <router-link to="/books" class="empty-link"
            >Thư viện sách</router-link
          >
          để bắt đầu khám phá!
        </p>
      </div>
      <ul class="borrows-list borrows-grid">
        <li v-for="item in borrows" :key="item._id" class="borrow-card">
          <div class="book-cover">
            <img
              :src="item.bookId?.hinhAnh || defaultImg"
              :alt="`Bìa sách ${item.bookId?.tenSach || 'N/A'}`"
              class="book-cover-image"
              loading="lazy"
            />
          </div>

          <div class="book-details">
            <div>
              <h3 class="book-title">
                {{ item.bookId?.tenSach || "Sách không tồn tại" }}
              </h3>
              <p class="book-info">
                Tác giả:
                <span class="book-value">{{
                  item.bookId?.tacGia || "N/A"
                }}</span>
              </p>
              <p class="book-info">
                Ngày mượn:
                <span class="book-value">{{ formatDate(item.ngayMuon) }}</span>
              </p>
              <p v-if="item.ngayTra" class="book-info">
                Ngày trả dự kiến:
                <span class="book-value">{{ formatDate(item.ngayTra) }}</span>
              </p>
              <p
                v-if="item.ngayThucTra && item.status === 'Đã trả'"
                class="book-info"
              >
                Ngày trả thực tế:
                <span class="book-value">{{
                  formatDate(item.ngayThucTra)
                }}</span>
              </p>
            </div>

            <div class="status-container">
              <span :class="getHanStatusInfo(item).class" class="status-badge">
                <template v-if="getHanStatusInfo(item).icon">
                  <svg
                    :class="getHanStatusInfo(item).iconColor"
                    class="status-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      :d="getHanStatusInfo(item).icon"
                    />
                  </svg>
                </template>
                {{ getHanStatusInfo(item).text }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
const defaultImg =
  "https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
const borrows = ref([]);
const userId = localStorage.getItem("userId");

async function fetchBorrows() {
  try {
    const res = await api.get(`/library/borrows/me/${userId}`);
    borrows.value = res.data;
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử mượn:", err);
  }
}

onMounted(fetchBorrows);

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getHanStatusInfo(item) {
  if (item.status === "Đã trả") {
    const returnDateText = item.ngayThucTra
      ? ` ngày ${formatDate(item.ngayThucTra)}`
      : "";
    return {
      text: `Đã trả${returnDateText}`,
      class: "status-returned",
      icon: "M5 13l4 4L19 7",
      iconColor: "icon-returned",
    };
  }

  if (item.status === "Đang chờ duyệt") {
    return {
      text: "Đang chờ duyệt",
      class: "status-pending",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "icon-pending",
    };
  }

  if (!item.ngayTra) {
    return {
      text: "Chưa có hạn trả",
      class: "status-no-date",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "icon-no-date",
    };
  }

  const today = new Date();
  const traDate = new Date(item.ngayTra);
  today.setHours(0, 0, 0, 0);
  traDate.setHours(0, 0, 0, 0);

  const diffTime = traDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: "Quá hạn trả",
      class: "status-overdue",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      iconColor: "icon-overdue",
    };
  }
  if (diffDays <= 3) {
    return {
      text: `Sắp hết hạn (${diffDays} ngày)`,
      class: "status-due-soon",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "icon-due-soon",
    };
  }
  return {
    text: `Còn ${diffDays} ngày`,
    class: "status-normal",
    icon: "M8 7V3m8 4V3m-9 8h4m-4 4h4m6-4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1m-3 7H6a2 2 0 00-2 2v1a2 2 0 002 2h4a2 2 0 002-2v-1a2 2 0 00-2-2z",
    iconColor: "icon-normal",
  };
}
</script>