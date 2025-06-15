<template>
    <Navbar />
    <section>
      <div class="title">
        <h3>{{ album?.nama_album }}</h3>
        <p>{{ album?.deskripsi }}</p>
      </div>
    </section>
    <div class="container mx-auto p-4">
      <div class="button-back">
        <router-link to="/album">
          <span class="material-symbols-outlined">arrow_back</span> Kembali
        </router-link>
      </div>
      <div class="galeri">
        <div v-for="foto in fotoList" :key="foto.id" class="item-galeri" @click="showImage(foto)">
          <img :src="`http://localhost:8000/storage/${foto.path_foto.replace(/\\/g, '/')}`" alt="Foto Album" />
        </div>
      </div>
  
      <div v-if="selectedImage" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="close-button" @click="closeModal">×</button>
          <img :src="selectedImage" alt="Full Image" />
        </div>
      </div>
    </div>
    <Footer />
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios"; // Pastikan axios terimport
  import Navbar from "../navbar.vue";
  import Footer from "../footer.vue";
  
  const route = useRoute();
  const albumId = route.params.id; // Mengambil ID album dari URL
  
  const album = ref(null);
  const fotoList = ref([]);
  const selectedImage = ref(null);
  
  // **Fungsi untuk menampilkan modal gambar**
  function showImage(foto) {
    // Path gambar disesuaikan di sini juga
    selectedImage.value = `http://localhost:8000/storage/${foto.path_foto.replace(/\\/g, '/')}`;
  }
  
  // **Fungsi untuk menutup modal gambar**
  function closeModal() {
    selectedImage.value = null;
  }
  
  // **Fungsi untuk menangani tombol Escape**
  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  }
  
  onMounted(async () => {
    // Event listener untuk tombol Escape
    window.addEventListener("keydown", handleKeyDown);
  
    try {
      // Ambil data album
      // Perhatikan penggunaan `/api/album/${albumId}` jika base URL axios sudah diatur
      // Jika tidak, tetap gunakan `http://localhost:8000/api/album/${albumId}`
      const albumRes = await axios.get(`http://localhost:8000/api/album/${albumId}`);
      album.value = albumRes.data.data;
  
      // Ambil daftar foto untuk album ini
      // Pastikan rute di Laravel Anda adalah `Route::get('/album/{id}/foto', ...)`
      const fotoRes = await axios.get(`http://localhost:8000/api/album/${albumId}/foto`);
      fotoList.value = fotoRes.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Anda bisa tambahkan SweetAlert atau pesan lain untuk pengguna jika gagal
    }
  });
  
  // **onUnmounted untuk membersihkan event listener**
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
  </script>
  
  <style scoped>
  /* Gaya CSS yang sudah ada */
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1000px; /* Tambahkan ini agar konten tidak terlalu lebar */
    margin: 0 auto; /* Tengahkankan container */
    padding: 0 15px; /* Padding samping */
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  .title h3 {
    color: #336c2a;
    font-weight: 800;
    text-align: center;
  }
  
  .title p {
    color: #555;
    text-align: center;
  }
  
  .galeri {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsif */
    gap: 20px; /* Kurangi gap untuk kerapihan */
    margin-top: 20px;
    width: 100%; /* Pastikan galeri memenuhi lebar container */
  }
  
  .item-galeri {
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer; /* Menandakan ini bisa diklik */
    transition: transform 0.2s ease-in-out; /* Efek hover */
  }
  
  .item-galeri:hover {
      transform: translateY(-5px);
  }
  
  .item-galeri img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px; /* Sedikit rounded corner */
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 2.5rem; /* Lebih besar agar mudah diklik */
    color: white;
    cursor: pointer;
    z-index: 1001;
    text-shadow: 0 0 5px rgba(0,0,0,0.5); /* Agar terlihat di background terang */
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85); /* Sedikit lebih gelap */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: auto;
    padding: 20px; /* Tambah padding agar tidak terlalu mepet */
  }
  
  .modal-content {
    position: relative;
    max-width: 90vw; /* Lebih lebar untuk gambar besar */
    max-height: 90vh; /* Lebih tinggi */
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Pastikan gambar terlihat utuh */
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.5); /* Bayangan untuk gambar */
  }
  
  .button-back {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  
  .button-back a {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    color: #336c2a;
    text-decoration: none;
    padding: 5px 10px; /* Tambah padding agar area klik lebih besar */
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }
  
  .button-back .material-symbols-outlined {
    font-size: 20px;
    color: #336c2a;
  }
  
  .button-back a:hover {
    background-color: #e0e0e0;
  }
  
  /* Media Queries untuk Responsif */
  @media (max-width: 768px) {
      .galeri {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Kolom lebih kecil di mobile */
          gap: 15px;
      }
      .item-galeri img {
          height: 150px;
      }
      .modal-content {
          max-width: 95vw;
          max-height: 95vh;
      }
      .close-button {
          font-size: 2rem;
      }
  }
  
  @media (max-width: 480px) {
      .title h3 {
          font-size: 1.5rem;
      }
      .title p {
          font-size: 0.9rem;
      }
      .galeri {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
      }
      .item-galeri img {
          height: 120px;
      }
      .button-back a {
          font-size: 0.9rem;
      }
      .button-back .material-symbols-outlined {
          font-size: 18px;
      }
  }
  </style>