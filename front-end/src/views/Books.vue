
<template>
  <div class="books-page">
    <div class="books-container">
      <div class="books-header">
        <h1 class="books-title">Thư Viện Sách</h1>
        <p class="books-subtitle">
          Khám phá bộ sưu tập sách đa dạng của chúng tôi.
        </p>
      </div>

      <div class="books-controls">
        <div class="search-box">
          <input
            v-model="search"
            type="text"
            placeholder="Tìm sách theo tiêu đề hoặc tác giả..."
            @keyup.enter="fetchBooks"
          />
          <button @click="fetchBooks">
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
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="loading-container">
        <p class="loading-text">Đang tải danh sách sách...</p>
        <div class="loading-spinner"></div>
      </div>
      <div v-else-if="filteredBooks.length === 0" class="empty-state">
        <p class="empty-message">Không tìm thấy sách nào phù hợp.</p>
        <p class="empty-hint">Hãy thử từ khóa khác hoặc kiểm tra lại.</p>
      </div>

      <div v-else class="books-grid">
        <BookCard
          v-for="(book, index) in filteredBooks"
          :key="book._id"
          :book="book"
          :style="{ animationDelay: `${index * 0.05}s` }"
          class="animate-item-fade-in"
        />
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from "vue";
import BookCard from "../components/BookCard.vue";

import api from "../services/api";
import { useRoute } from "vue-router";

const books = ref([]);
const search = ref("");
const isLoading = ref(true);

const route = useRoute();

async function fetchBooks() {
  isLoading.value = true;
  try {
    const res = await api.get("/library/books");
    books.value = res.data;
  } catch (err) {
    console.error("Lỗi khi tải sách:", err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  if (route.query.q) {
    search.value = route.query.q;
  }
  fetchBooks();
});

const filteredBooks = computed(() => {
  if (!search.value) {
    return books.value;
  }
  const query = search.value.toLowerCase();
  return books.value.filter(
    (book) =>
      book.tenSach.toLowerCase().includes(query) ||
      book.tacGia.toLowerCase().includes(query)
  );
});
</script>

<style>
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

@keyframes itemFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-item-fade-in {
  opacity: 0;
  animation: itemFadeIn 0.6s ease-out forwards;
}
</style>