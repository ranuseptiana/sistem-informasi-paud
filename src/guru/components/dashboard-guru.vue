<template>
  <d-container fluid class="guru-dashboard">
    <d-row>
      <!-- Sidebar dan Navbar -->
      <Sidebar />
      <!-- Content -->
      <div class="content">
        <h1>Welcome, Guru!</h1>
        <!-- Konten dashboard admin -->
      </div>
    </d-row>
    <!-- Main Footer
    <Footer /> -->
  </d-container>
</template>

<script>
import Sidebar from './layout/sidebar.vue';
import Footer from './layout/footer.vue';

export default {
  name: 'GuruDashboard',
  components: {
    Sidebar,
    Footer,
  },
};
</script>

<style scoped>
.guru-dashboard {
  position: relative; 
  min-height: 100vh; 
  font-family: "Poppins", sans-serif;
}

.content {
  padding: 20px; 
}

h1 {
  color: black;
}
</style>
