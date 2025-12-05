

<template>
  <footer class="footer-main">
    <div class="footer-background"></div>
    <div class="footer-overlay"></div>

    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section about">
          <div class="footer-logo">
            <img
              src="/images/logo.png"
              alt="Logo"
              class="footer-logo-image"
              style="
                max-width: 24px;
                max-height: 24px;
                object-fit: contain;
                border-radius: 50%;
              "
            />
            <span class="footer-logo-text">Anhh Library</span>
          </div>
          <p class="footer-description">
            Nơi tri thức được chia sẻ và lan tỏa.
          </p>
        </div>

        <div class="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li>
              <router-link to="/">Trang chủ</router-link>
            </li>
            <li>
              <router-link to="/books">Tất cả sách</router-link>
            </li>
            <li>
              <router-link to="/auth/login">Đăng nhập</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

