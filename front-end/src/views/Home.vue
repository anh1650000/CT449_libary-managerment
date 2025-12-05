
<template>
  <div class="home-page">
    <section class="hero-section">
      <div
        class="hero-background"
        :style="{
          backgroundImage: `url('/images/library-background.jpg')`,
        }"
      ></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <h1 class="hero-title">
          <span v-if="authStore.isAuthenticated"
            >Xin Chào {{ authStore.name }} !</span
          >
          <span v-else
            >Nơi Bạn Tìm Thấy Chính Mình <br />Trong Những Trang Sách</span
          >
        </h1>
        <p class="hero-subtitle">
          Mọi thứ bạn cần cho một tương lai tốt đẹp hơn và thành công đều đã
          được viết sẵn. <br />Và đoán xem? Tất cả những gì bạn cần làm là đọc
          chúng!
        </p>

        <div class="search-container">
          <form @submit.prevent="handleSearch" class="search-form">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm sách, tác giả, thể loại..."
              class="search-input"
            />
            <button type="submit" class="search-button">
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
          </form>
        </div>
      </div>
    </section>

    <section
      ref="featuredBooksSection"
      class="featured-section"
      :class="{
        'section-hidden': !isFeaturedBooksSectionVisible,
        'section-visible': isFeaturedBooksSectionVisible,
      }"
    >
      <h2 class="section-title">Sách Nổi Bật <span>Trong Tuần</span></h2>
      <div v-if="featuredBooks.length > 0" class="books-grid">
        <BookCard v-for="book in featuredBooks" :key="book._id" :book="book" />
      </div>
      <div v-else class="loading-message">
        <p>Đang tải những cuốn sách nổi bật nhất...</p>
      </div>
      <div class="view-all-container">
        <router-link to="/books" class="view-all-button">
          Xem Tất Cả Sách
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
    </section>

    <section
      ref="quoteSection"
      class="quote-section"
      :class="{
        'section-hidden': !isQuoteSectionVisible,
        'section-visible': isQuoteSectionVisible,
      }"
    >
      <div
        class="quote-background"
        :style="{
          backgroundImage: `url('https://images.pexels.com/photos/990432/pexels-photo-990432.jpeg')`,
        }"
      ></div>
      <div class="quote-content">
        <p class="quote-text">
          "Đọc nhiều sách tốt là tốt, nhưng nếu không áp dụng vào cuộc sống thực
          tế thì không khác gì việc giữ sách trong hòm."
        </p>
        <p class="quote-author">— Hồ Chí Minh —</p>
        <img
          src="https://vanvn.net/wp-content/uploads/2024/02/nhung-cau-noi-hay-ve-sach-cua-bac.jpg"
          alt="Hình ảnh Bác đang làm việc"
          class="quote-avatar"
        />
      </div>
    </section>

    <section
      ref="aboutSection1"
      class="about-section"
      :class="{
        'section-hidden-left': !isAboutSection1Visible,
        'section-visible': isAboutSection1Visible,
      }"
    >
      <div class="about-content">
        <div class="about-image">
          <img
            src="https://images.pexels.com/photos/5913138/pexels-photo-5913138.jpeg"
            alt="Thư viện hiện đại"
          />
        </div>
        <div class="about-text">
          <h3 class="about-title">Khám Phá Bộ Sưu Tập Khổng Lồ</h3>
          <p class="about-description">
            Với hàng ngàn đầu sách từ mọi thể loại, chúng tôi mang đến cho bạn
            một thế giới tri thức vô tận ngay trong tầm tay. Dù bạn yêu thích
            tiểu thuyết, khoa học, lịch sử hay tự phát triển, thư viện của chúng
            tôi luôn có điều gì đó dành cho bạn.
          </p>
          <router-link to="/books" class="cta-button">
            Xem Thể Loại
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <section
      ref="aboutSection2"
      class="about-section about-section-alt"
      :class="{
        'section-hidden-right': !isAboutSection2Visible,
        'section-visible': isAboutSection2Visible,
      }"
    >
      <div class="about-content about-content-reverse">
        <div class="about-image">
          <img
            src="https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg"
            alt="Người đọc sách trên thiết bị di động"
          />
        </div>
        <div class="about-text">
          <h3 class="about-title">Đọc Sách Mọi Lúc, Mọi Nơi</h3>
          <p class="about-description">
            Trải nghiệm đọc sách tiện lợi trên mọi thiết bị của bạn. Với giao
            diện thân thiện và tính năng đồng bộ, bạn có thể tiếp tục hành trình
            tri thức của mình dù ở nhà, trên đường, hay bất cứ đâu.
          </p>
          <router-link
            v-if="!authStore.isAuthenticated"
            to="/auth/register"
            class="cta-button"
          >
            Đăng Ký Miễn Phí
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.478 0-2.923.473-4.204 1.334L4 18l1.397-2.794C6.205 14.887 7.55 14 9 14h6c1.45 0 2.795.887 3.603 2.206L20 18l-3.796-2.666C14.923 14.473 13.478 14 12 14z"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";
import BookCard from "../components/BookCard.vue";
import { useAuthStore } from "../stores/auth";

const featuredBooks = ref([]);
const authStore = useAuthStore();
const searchQuery = ref("");
const router = useRouter();

// Refs cho các section để theo dõi Intersection
const featuredBooksSection = ref(null);
const quoteSection = ref(null);
const aboutSection1 = ref(null);
const aboutSection2 = ref(null);

// State để kiểm soát hiển thị animation
const isFeaturedBooksSectionVisible = ref(false);
const isQuoteSectionVisible = ref(false);
const isAboutSection1Visible = ref(false);
const isAboutSection2Visible = ref(false);

const fetchFeaturedBooks = async () => {
  try {
    const res = await api.get("/library/books");
    featuredBooks.value = res.data.slice(0, 8);
  } catch (err) {
    console.error("Lỗi khi tải sách nổi bật:", err);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "Books", query: { q: searchQuery.value.trim() } });
  }
};

onMounted(() => {
  fetchFeaturedBooks();

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Khi section hiện lên, đặt trạng thái hiển thị thành true
          if (entry.target === featuredBooksSection.value) {
            isFeaturedBooksSectionVisible.value = true;
          } else if (entry.target === quoteSection.value) {
            isQuoteSectionVisible.value = true;
          } else if (entry.target === aboutSection1.value) {
            isAboutSection1Visible.value = true;
          } else if (entry.target === aboutSection2.value) {
            isAboutSection2Visible.value = true;
          }
          // Ngừng theo dõi section này để animation chỉ chạy một lần
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport là root
      rootMargin: "0px", // Không có margin thêm
      threshold: 0.2, // Kích hoạt khi 20% của phần tử xuất hiện trong viewport
    }
  );

  // Bắt đầu theo dõi các section
  if (featuredBooksSection.value) observer.observe(featuredBooksSection.value);
  if (quoteSection.value) observer.observe(quoteSection.value);
  if (aboutSection1.value) observer.observe(aboutSection1.value);
  if (aboutSection2.value) observer.observe(aboutSection2.value);

  // Lưu observer để có thể disconnect khi component unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes bounceSubtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-bounce-subtle {
  animation: bounceSubtle 1.5s infinite ease-in-out;
}
</style>