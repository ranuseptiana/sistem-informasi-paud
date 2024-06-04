<template>
  <d-container fluid class="admin-dashboard">
    <d-row>
      <!-- Sidebar dan Navbar -->
      <Sidebar />
      <!-- Content -->
      <div class="content">
        <h1>Welcome, Admin!</h1>
        <!-- Konten dashboard admin -->
      </div>
    </d-row>
    <!-- Main Footer -->
    <!-- <Footer />  -->
  </d-container>
</template>

<script>
import Sidebar from './layout/sidebar.vue';
import Footer from './layout/footer.vue';

export default {
  name: 'AdminDashboard',
  components: {
    Sidebar,
    Footer,
  },
};
</script>

<style scoped>
.admin-dashboard {
  position: relative; /* Tetapkan posisi relatif untuk kontainer utama */
  min-height: 100vh; /* Memastikan konten mengisi setidaknya seluruh tinggi viewport */
  font-family: "Poppins", sans-serif;
}

.content {
  padding: 20px; /* Tambahkan padding agar konten terlihat */
}

h1 {
  color: black;
}
</style>
