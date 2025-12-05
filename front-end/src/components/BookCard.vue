

<template>
  <div class="book-card">
    <div class="book-image-container">
      <img
        :src="book.hinhAnh || defaultImg"
        :alt="`Bìa sách ${book.tenSach}`"
        class="book-image"
      />
    </div>

    <div class="book-info">
      <h3 class="book-title">{{ book.tenSach }}</h3>

      <p class="book-author">
        Tác giả: <span>{{ book.tacGia }}</span>
      </p>
      <p class="book-price">
        Giá:
        {{ book.donGia ? book.donGia.toLocaleString() + "₫" : "Chưa cập nhật" }}
      </p>
      <router-link
        :to="`/books/masach/${book.maSach}`"
        class="book-detail-button"
      >
        Xem chi tiết
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          ></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const defaultImg =
  "https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";
defineProps({
  book: Object,
});
</script>
