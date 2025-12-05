<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/api";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore(); // Dùng để chào mừng admin

const loading = ref(true);
const error = ref(null);
const stats = ref({
  totalBookTitles: 0,
  totalUsers: 0,
  currentlyBorrowed: 0,
  overdueBooks: 0,
});
const overdueList = ref([]);
const outOfStockBooks = ref([]);

async function fetchDashboardData() {
  loading.value = true;
  error.value = null;
  try {
    const [booksRes, usersRes, borrowsRes, outOfStockRes] = await Promise.all([
      api.get("/library/books"),
      api.get("/management/readers"),
      api.get("/library/borrows"),
      api.get("/library/books/out-of-stock"),
    ]);

    stats.value.totalBookTitles = booksRes.data?.length || 0;
    stats.value.totalUsers = usersRes.data?.length || 0;
    outOfStockBooks.value = outOfStockRes.data;

    if (borrowsRes.data) {
      const allBorrows = borrowsRes.data;
      const now = new Date();

      const activeBorrows = allBorrows.filter((b) => b.status === "Đang mượn");
      stats.value.currentlyBorrowed = activeBorrows.length;

      overdueList.value = activeBorrows.filter(
        (b) => new Date(b.ngayTra) < now
      );
      stats.value.overdueBooks = overdueList.value.length;
    }
  } catch (err) {
    error.value = "Không thể tải dữ liệu từ máy chủ.";
    console.error("Lỗi khi tải dữ liệu cho dashboard:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchDashboardData);

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
}
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1 class="dashboard-title">Bảng điều khiển</h1>
      <p class="dashboard-subtitle">
        Chào mừng trở lại, {{ authStore.name }}! Đây là tổng quan hệ thống của
        bạn.
      </p>
    </div>

    <div v-if="loading" class="loading-message">Đang tải dữ liệu...</div>
    <div v-if="error" class="error-message" role="alert">
      <strong class="error-title">Lỗi!</strong>
      <span class="error-text"> {{ error }}</span>
    </div>

    <div v-if="!loading && !error">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-icon-primary">
            <svg
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
          </div>
          <div class="stat-content">
            <p class="stat-label">Tổng số đầu sách</p>
            <span class="stat-value">{{ stats.totalBookTitles }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-primary">
            <svg
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
          </div>
          <div class="stat-content">
            <p class="stat-label">Tổng số độc giả</p>
            <span class="stat-value">{{ stats.totalUsers }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-primary">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="stat-content">
            <p class="stat-label">Sách đang mượn</p>
            <span class="stat-value">{{ stats.currentlyBorrowed }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stat-icon-danger">
            <svg
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
          </div>
          <div class="stat-content">
            <p class="stat-label">Sách quá hạn trả</p>
            <span class="stat-value">{{ stats.overdueBooks }}</span>
          </div>
        </div>
      </div>

      <div class="tables-grid">
        <div class="table-card">
          <h2 class="table-title">Danh sách sách quá hạn</h2>
          <div v-if="overdueList.length > 0" class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th scope="col" class="table-cell">Tên sách</th>
                  <th scope="col" class="table-cell">Người mượn</th>
                  <th scope="col" class="table-cell">Ngày hẹn trả</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                  v-for="item in overdueList"
                  :key="item._id"
                  class="table-row"
                >
                  <td class="table-cell table-cell-bold">
                    {{ item.bookId?.tenSach }}
                  </td>
                  <td class="table-cell">
                    {{
                      item.borrowerId
                        ? item.borrowerId.hoTenNV ||
                          `${item.borrowerId.hoLot} ${item.borrowerId.ten}`
                        : "Không rõ"
                    }}
                  </td>
                  <td class="table-cell table-cell-danger">
                    {{ formatDate(item.ngayTra) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-table">
            <p>Không có sách nào bị quá hạn.</p>
          </div>
        </div>

        <div class="table-card">
          <h2 class="table-title">Danh sách sách đã hết</h2>
          <div v-if="outOfStockBooks.length > 0" class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th scope="col" class="table-cell">Tên sách</th>
                  <th scope="col" class="table-cell">Tác giả</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                  v-for="book in outOfStockBooks"
                  :key="book._id"
                  class="table-row"
                >
                  <td class="table-cell table-cell-bold">{{ book.tenSach }}</td>
                  <td class="table-cell">{{ book.tacGia }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-table">
            <p>Không có sách nào bị hết.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>