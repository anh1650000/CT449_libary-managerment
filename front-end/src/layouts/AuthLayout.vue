
<template>
  <div class="auth-page">
    <div class="auth-container">
      <div
        class="auth-image-section"
        :style="{
          backgroundImage:
            'url(\'https://images.unsplash.com/photo-1651519548696-8853b7b85af9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\')',
        }"
      >
        <div class="auth-image-overlay"></div>
        <div class="auth-image-content">
          <h2 class="auth-image-title">Khám phá <br />Thế giới Tri Thức</h2>
          <p class="auth-image-subtitle">
            Học hỏi, kết nối, và phát triển không ngừng.
          </p>
        </div>
      </div>

      <div class="auth-form-section">
        <div class="auth-header">
          <router-link to="/" class="auth-logo"> Anhh Library </router-link>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>