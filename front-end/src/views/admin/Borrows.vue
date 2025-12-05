<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../services/api";

const borrows = ref([]);
const searchTerm = ref("");
const filterStatus = ref("Tất cả");

async function fetchData() {
  try {
    const res = await api.get("/library/borrows");
    borrows.value = res.data;
  } catch (error) {
    console.error("Lỗi khi tải lịch sử mượn:", error);
  }
}

onMounted(fetchData);

const filteredBorrows = computed(() => {
  let filtered = borrows.value;

  if (filterStatus.value !== "Tất cả") {
    if (filterStatus.value === "Quá hạn") {
      filtered = filtered.filter(
        (b) => b.status === "Đang mượn" && new Date(b.ngayTra) < new Date()
      );
    } else {
      filtered = filtered.filter((b) => b.status === filterStatus.value);
    }
  }

  if (searchTerm.value) {
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.bookId?.tenSach.toLowerCase().includes(lowerCaseSearch) ||
        getBorrowerName(b.borrowerId).toLowerCase().includes(lowerCaseSearch)
    );
  }

  return filtered;
});

async function deleteBorrow(borrowId) {
  if (
    !window.confirm("Bạn có chắc chắn muốn XÓA VĨNH VIỄN phiếu mượn này không?")
  )
    return;
  try {
    await api.delete(`/library/borrows/${borrowId}`);
    await fetchData();
    alert("Xóa phiếu mượn thành công!");
  } catch (error) {
    alert("Xóa thất bại.");
  }
}

async function markAsReturned(borrowId) {
  if (
    !window.confirm(
      "Bạn có chắc chắn muốn đánh dấu phiếu mượn này là đã trả không?"
    )
  )
    return;
  try {
    await api.patch(`/library/borrows/return/${borrowId}`);
    await fetchData();
    alert("Cập nhật thành công!");
  } catch (error) {
    alert("Cập nhật thất bại.");
  }
}

function getBorrowerName(borrower) {
  if (!borrower) return "Không rõ";
  return borrower.hoTenNV || `${borrower.hoLot} ${borrower.ten}`;
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("vi-VN");
}

function getStatusText(item) {
  if (item.status === "Đã trả") return "Đã trả";
  if (new Date(item.ngayTra) < new Date()) return "Quá hạn";
  return "Đang mượn";
}

function getStatusClass(item) {
  const status = getStatusText(item);
  if (status === "Đã trả") return "status-returned";
  if (status === "Quá hạn") return "status-overdue";
  return "status-borrowing";
}

function getFilterClass(status) {
  return ["filter-button", filterStatus.value === status ? "active" : ""];
}
</script>

<template>
  <div class="borrows-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Quản lý Mượn/Trả</h1>
      <p class="page-description">
        Theo dõi và quản lý tất cả các hoạt động mượn trả sách trong hệ thống.
      </p>
    </div>

    <!-- Controls: Search and Filters -->
    <div class="content-controls">
      <!-- Search Input with Icon -->
      <div class="search-box">
        <div class="search-icon">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Tìm theo tên sách hoặc người mượn..."
          class="search-input"
        />
      </div>
      <!-- Filter Buttons -->
      <div class="filter-group">
        <button
          @click="filterStatus = 'Tất cả'"
          :class="getFilterClass('Tất cả')"
        >
          Tất cả
        </button>
        <button
          @click="filterStatus = 'Đang mượn'"
          :class="getFilterClass('Đang mượn')"
        >
          Đang mượn
        </button>
        <button
          @click="filterStatus = 'Quá hạn'"
          :class="getFilterClass('Quá hạn')"
        >
          Quá hạn
        </button>
        <button
          @click="filterStatus = 'Đã trả'"
          :class="getFilterClass('Đã trả')"
        >
          Đã trả
        </button>
      </div>
    </div>

    <!-- Borrow Table -->
    <div class="table-card">
      <div class="table-scroll">
        <table class="data-table">
          <thead class="table-header">
            <tr>
              <th>Tên sách</th>
              <th>Người mượn</th>
              <th>Ngày mượn</th>
              <th>Ngày hẹn trả</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr
              v-for="item in filteredBorrows"
              :key="item._id"
              class="table-row"
            >
              <td class="table-cell table-cell-bold">
                {{ item.bookId?.tenSach || "Sách đã bị xóa" }}
              </td>
              <td class="table-cell">{{ getBorrowerName(item.borrowerId) }}</td>
              <td class="table-cell">{{ formatDate(item.ngayMuon) }}</td>
              <td class="table-cell">{{ formatDate(item.ngayTra) }}</td>
              <td class="table-cell">
                <span :class="getStatusClass(item)" class="status-badge">
                  {{ getStatusText(item) }}
                </span>
              </td>
              <td class="table-cell table-actions">
                <button
                  v-if="item.status !== 'Đã trả'"
                  @click="markAsReturned(item._id)"
                  class="btn-action btn-action-return"
                  title="Đánh dấu đã trả"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="action-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteBorrow(item._id)"
                  class="btn-action btn-action-delete"
                  title="Xóa phiếu mượn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="action-icon"
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>