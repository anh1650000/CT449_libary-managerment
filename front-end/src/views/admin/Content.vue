<template>
  <div class="content-page">
    <div class="page-header">
      <h1 class="page-title">Quản lý Nội dung</h1>
      <p class="page-description">
        Thêm, sửa, xóa sách và nhà xuất bản trong hệ thống.
      </p>
    </div>

    <div class="tabs-container">
      <nav class="tabs-nav">
        <button
          @click="activeTab = 'books'"
          class="tab-button"
          :class="{ active: activeTab === 'books' }"
        >
          Quản lý Sách
        </button>
        <button
          @click="activeTab = 'publishers'"
          class="tab-button"
          :class="{ active: activeTab === 'publishers' }"
        >
          Quản lý Nhà xuất bản
        </button>
      </nav>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'books'">
        <div class="content-controls">
          <div class="search-box">
            <div class="search-icon">
              <svg
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
              v-model="bookSearchTerm"
              type="text"
              placeholder="Tìm theo tên sách hoặc tác giả..."
              class="search-input"
            />
          </div>
          <button @click="openBookModal()" class="btn-add">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Thêm sách mới</span>
          </button>
        </div>
        <div class="table-card">
          <div class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Số lượng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                  v-for="book in filteredBooks"
                  :key="book._id"
                  class="table-row"
                >
                  <td class="table-cell table-cell-bold">{{ book.tenSach }}</td>
                  <td class="table-cell">{{ book.tacGia }}</td>
                  <td class="table-cell">{{ book.soQuyen }}</td>
                  <td class="table-cell table-actions">
                    <button
                      @click="openBookModal(book)"
                      class="btn-action btn-action-edit"
                      title="Sửa"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deleteBook(book._id, book.tenSach)"
                      class="btn-action btn-action-delete"
                      title="Xóa"
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

      <div v-if="activeTab === 'publishers'">
        <div class="content-controls">
          <input
            v-model="publisherSearchTerm"
            type="text"
            placeholder="Tìm theo tên hoặc địa chỉ NXB..."
            class="publisher-search-input"
          />
          <div class="spacer"></div>
          <button @click="openPublisherModal()" class="btn-add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="btn-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Thêm NXB mới</span>
          </button>
        </div>
        <div class="table-card">
          <div class="table-scroll">
            <table class="data-table">
              <thead class="table-header">
                <tr>
                  <th>Tên Nhà xuất bản</th>
                  <th>Địa chỉ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                  v-for="pub in filteredPublishers"
                  :key="pub._id"
                  class="table-row"
                >
                  <td class="table-cell">{{ pub.tenNXB }}</td>
                  <td class="table-cell">{{ pub.diaChi }}</td>
                  <td class="table-cell table-actions">
                    <button
                      @click="openPublisherModal(pub)"
                      class="btn-action btn-action-edit"
                      title="Sửa"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="deletePublisher(pub._id, pub.tenNXB)"
                      class="btn-action btn-action-delete"
                      title="Xóa"
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
    </div>

    <div v-if="showBookModal" class="modal-overlay">
      <div class="modal-content modal-large">
        <h2 class="modal-title">
          {{ editingBook ? "Chỉnh sửa sách" : "Thêm sách mới" }}
        </h2>
        <form @submit.prevent="saveBook">
          <div class="form-grid">
            <div class="form-group-full">
              <label class="form-label">Tên sách</label>
              <input
                v-model="bookForm.tenSach"
                type="text"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Tác giả</label>
              <input
                v-model="bookForm.tacGia"
                type="text"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Số lượng</label>
              <input
                v-model.number="bookForm.soQuyen"
                type="number"
                required
                min="0"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Đơn giá</label>
              <input
                v-model.number="bookForm.donGia"
                type="number"
                required
                min="0"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Năm xuất bản</label>
              <input
                v-model.number="bookForm.namXuatBan"
                type="number"
                placeholder="YYYY"
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Nhà xuất bản</label>
              <select v-model="bookForm.maNXB" required class="form-input">
                <option disabled value="">-- Chọn nhà xuất bản --</option>
                <option
                  v-for="pub in publishers"
                  :key="pub.maNXB"
                  :value="pub.maNXB"
                >
                  {{ pub.tenNXB }}
                </option>
              </select>
            </div>
            <div class="form-group-full">
              <label class="form-label">Link hình ảnh</label>
              <input
                v-model="bookForm.hinhAnh"
                type="url"
                placeholder="https://example.com/image.jpg"
                class="form-input"
              />
            </div>
          </div>
          <div class="modal-actions">
            <button
              @click="showBookModal = false"
              type="button"
              class="btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" class="btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPublisherModal" class="modal-overlay">
      <div class="modal-content">
        <h2 class="modal-title">
          {{ editingPublisher ? "Chỉnh sửa NXB" : "Thêm NXB mới" }}
        </h2>
        <form @submit.prevent="savePublisher">
          <div class="form-stack">
            <div>
              <label class="form-label">Mã Nhà xuất bản</label>
              <input
                v-model.number="publisherForm.maNXB"
                type="number"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Tên Nhà xuất bản</label>
              <input
                v-model="publisherForm.tenNXB"
                type="text"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Địa chỉ</label>
              <input
                v-model="publisherForm.diaChi"
                type="text"
                class="form-input"
              />
            </div>
          </div>
          <div class="modal-actions">
            <button
              @click="showPublisherModal = false"
              type="button"
              class="btn-secondary"
            >
              Hủy
            </button>
            <button type="submit" class="btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../services/api";

const activeTab = ref("books");
const books = ref([]);
const publishers = ref([]);
const bookSearchTerm = ref("");
const publisherSearchTerm = ref("");

const showBookModal = ref(false);
const editingBook = ref(null);
const bookForm = ref({
  maSach: null,
  tenSach: "",
  tacGia: "",
  soQuyen: 1,
  maNXB: "",
  hinhAnh: "",
  donGia: 0,
  namXuatBan: null,
});

const showPublisherModal = ref(false);
const editingPublisher = ref(null);
const publisherForm = ref({
  maNXB: null,
  tenNXB: "",
  diaChi: "",
});

async function fetchData() {
  try {
    const [booksRes, publishersRes] = await Promise.all([
      api.get("/library/books"),
      api.get("/library/publishers"),
    ]);
    books.value = booksRes.data;
    publishers.value = publishersRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    alert("Không thể tải dữ liệu từ máy chủ.");
  }
}

onMounted(fetchData);

const filteredBooks = computed(() => {
  if (!bookSearchTerm.value) {
    return books.value;
  }
  const query = bookSearchTerm.value.toLowerCase();
  return books.value.filter(
    (book) =>
      book.tenSach.toLowerCase().includes(query) ||
      book.tacGia.toLowerCase().includes(query)
  );
});

const filteredPublishers = computed(() => {
  if (!publisherSearchTerm.value) {
    return publishers.value;
  }
  const query = publisherSearchTerm.value.toLowerCase();
  return publishers.value.filter(
    (pub) =>
      pub.tenNXB.toLowerCase().includes(query) ||
      (pub.diaChi && pub.diaChi.toLowerCase().includes(query))
  );
});

function openBookModal(book = null) {
  if (book) {
    editingBook.value = book;
    bookForm.value = {
      _id: book._id,
      maSach: book.maSach,
      tenSach: book.tenSach,
      tacGia: book.tacGia,
      soQuyen: book.soQuyen,
      maNXB: book.maNXB?.maNXB || book.maNXB,
      hinhAnh: book.hinhAnh,
      donGia: book.donGia,
      namXuatBan: book.namXuatBan,
    };
  } else {
    editingBook.value = null;
    bookForm.value = {
      tenSach: "",
      tacGia: "",
      soQuyen: 1,
      maNXB: "",
      hinhAnh: "",
      donGia: 0,
      namXuatBan: null,
    };
  }
  showBookModal.value = true;
}

async function saveBook() {
  try {
    if (editingBook.value && bookForm.value._id) {
      await api.put(`/library/books/${bookForm.value._id}`, bookForm.value);
    } else {
      await api.post("/library/books", bookForm.value);
    }
    showBookModal.value = false;
    await fetchData();
    alert("Lưu sách thành công!");
  } catch (error) {
    console.error("Lỗi khi lưu sách:", error);
    alert(error.response?.data?.message || "Lưu sách thất bại.");
  }
}

async function deleteBook(bookId, bookTitle) {
  if (!window.confirm(`Bạn có chắc chắn muốn xóa sách "${bookTitle}" không?`)) {
    return;
  }
  try {
    await api.delete(`/library/books/${bookId}`);
    await fetchData();
    alert("Xóa sách thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    alert(error.response?.data?.message || "Xóa sách thất bại.");
  }
}

function openPublisherModal(publisher = null) {
  if (publisher) {
    editingPublisher.value = publisher;
    publisherForm.value = { ...publisher };
  } else {
    editingPublisher.value = null;
    publisherForm.value = { maNXB: null, tenNXB: "", diaChi: "" };
  }
  showPublisherModal.value = true;
}

async function savePublisher() {
  try {
    if (editingPublisher.value) {
      await api.put(
        `/library/publishers/${editingPublisher.value._id}`,
        publisherForm.value
      );
    } else {
      await api.post("/library/publishers", publisherForm.value);
    }
    showPublisherModal.value = false;
    await fetchData();
    alert("Lưu nhà xuất bản thành công!");
  } catch (error) {
    console.error("Lỗi khi lưu nhà xuất bản:", error);
    alert(error.response?.data?.message || "Lưu nhà xuất bản thất bại.");
  }
}

async function deletePublisher(publisherId, publisherName) {
  if (
    !window.confirm(
      `Bạn có chắc chắn muốn xóa nhà xuất bản "${publisherName}" không?`
    )
  ) {
    return;
  }
  try {
    await api.delete(`/library/publishers/${publisherId}`);
    await fetchData();
    alert("Xóa nhà xuất bản thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
    alert(error.response?.data?.message || "Xóa nhà xuất bản thất bại.");
  }
}
</script>