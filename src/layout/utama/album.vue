<template>
  <Navbar />
  <section>
    <div class="title">
      <h3>GALERI KEGIATAN PAUD AL UMMAH</h3>
      <p>Dokumentasi kegiatan PAUD Al Ummah</p>
    </div>
  </section>

  <div class="container">
    <section class="galeri-koleksi">
      <div v-for="(albums, monthYear) in groupedAlbums" :key="monthYear" class="month-group">
        <h4 class="month-title">{{ monthYear }}</h4>
        <div class="album-grid">
          <div v-for="album in albums" :key="album.id" class="album-item-no-card">
            <router-link :to="`/album/${album.id}`" class="album-link">
              <div class="album-cover-wrapper">
                <img
                :src="`${baseUrl}/storage/${album.photo_cover}`"
                  alt="Cover Album"
                  class="album-cover"
                />
              </div>
              <p class="nama-kegiatan">{{ album.nama_album }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import Navbar from "../navbar.vue";
import Footer from "../footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
  const albumList = ref([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const groupedAlbums = computed(() => {
    const groups = {};
    const options = { year: 'numeric', month: 'long' };
    const sortedAlbums = [...albumList.value].sort((a, b) => {
      return new Date(b.tanggal_kegiatan) - new Date(a.tanggal_kegiatan);
    });
    sortedAlbums.forEach(album => {
      const date = new Date(album.tanggal_kegiatan);
      const monthYear = date.toLocaleDateString('id-ID', options);
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(album);
    });
    return groups;
  });

  const fetchAlbumList = () => {
    axios
      .get(`${baseUrl}/api/album`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          albumList.value = res.data.data;
        } else {
          console.error("Data format salah:", res.data);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      });
  };

  onMounted(() => {
    fetchAlbumList();
  });

  return {
    albumList,
    groupedAlbums,
    baseUrl 
  };
}

};
</script>

<style scoped>
/* Umum */
.title h3 {
  color: #336c2a;
  font-weight: 800;
  text-align: center;
}

.title p {
  color: #555;
  text-align: center;
}

.container {
  max-width: 1000px; /* Lebar maksimum container */
  margin: 0 auto;
  padding: 0 15px;
}

/* Link Album */
.album-link {
  text-decoration: none;
  color: #336c2a;
  font-weight: 600;
  display: block; /* Penting agar link mengisi seluruh area item */
  height: 100%; /* Agar transisi hover berlaku di seluruh area link */
}

.album-link:hover {
  color: #336c2a;
  font-weight: 800;
}

/* Item Album Tanpa Card */
.album-item-no-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Memastikan item mengisi tinggi sel grid */
  transition: transform 0.3s ease-in-out; /* Efek naik yang lebih halus */
}

.album-item-no-card:hover {
  transform: translateY(-5px); /* Efek naik saat hover */
}

/* Pembungkus Album Cover untuk Rasio 1:1 */
.album-cover-wrapper {
  width: 100%;
  padding-bottom: 100%; /* Ini menciptakan rasio 1:1 (tinggi sama dengan lebar) */
  position: relative;
  overflow: hidden; /* Penting untuk menyembunyikan bagian gambar yang berlebih */
  border-radius: 8px; /* Rounded corner untuk pembungkus */
  margin-bottom: 10px; /* Jarak antara gambar dan teks */
}

.album-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Pastikan gambar mengisi seluruh area pembungkus dan terpotong jika perlu */
}

.nama-kegiatan {
  font-size: 1.1em;
  font-weight: 600;
  color: #336c2a;
  margin: 0;
  word-break: break-word;
}

.nama-kegiatan:hover {
  color: #336c2a;
  font-weight: 800;
}

/* Pengelompokan Per Bulan */
.month-group {
  margin-bottom: 40px;
}

.month-title {
  font-size: 1.3em;
  color: #336c2a;
  font-weight: 700;
  text-align: left;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

/* Grid Album: Maksimal 4 Kolom */
.album-grid {
  display: grid;
  /* max-width: 800px; Hapus ini atau sesuaikan jika Anda ingin grid punya max-width sendiri*/
  /* Gunakan repeat(4, 1fr) untuk 4 kolom tetap, atau auto-fill/fit untuk responsif */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Default: Min 200px, mengisi baris */
  gap: 20px;
}

/* Media Queries untuk Responsif */
@media (min-width: 992px) { /* Untuk desktop dan layar besar */
  .album-grid {
    /* Tetapkan 4 kolom di layar lebar */
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .album-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 2-3 kolom di tablet */
    gap: 15px;
  }
  .nama-kegiatan {
    font-size: 1em;
  }
  .month-title {
    font-size: 1.5em;
  }
}

@media (max-width: 480px) {
  .title h3 {
    font-size: 1.5rem;
  }
  .title p {
    font-size: 0.9rem;
  }
  .album-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 2 kolom di mobile */
    gap: 10px;
  }
  .nama-kegiatan {
    font-size: 0.9em;
  }
  .month-title {
    font-size: 1.3em;
  }
}
</style>