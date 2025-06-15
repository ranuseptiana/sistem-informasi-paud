<template>
    <div class="main-content children-friendly">
      <div class="header-section">
        <h1 class="class-title"><img src="/src/assets/class.png" alt="Class Icon" class="class-title-icon"> Kelas {{ kelasList.nama_kelas }}</h1>
        <p class="teacher-info">
          <img src="/src/assets/teacher.png" alt="" class="teacher-icon"> Guru Pengajar:
          <strong>{{ waliKelas.nama_lengkap }}</strong>
        </p>
      </div>
  
      <div class="content-area">
        <div class="students-overview-card">
          <div class="card-header">
            <h3>Daftar Teman di Kelas Ini</h3>
            <div class="search-and-filter">
              <div class="search-bar-container children-friendly-search">
                <input type="text" v-model="searchQuery" class="search-input" placeholder="Cari nama teman..." />
                <i class="fas fa-search search-icon"></i>
              </div>
              <select v-model="rowsPerPage" class="select-rows children-friendly-select">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="100">Semua</option>
              </select>
            </div>
          </div>
  
          <hr class="colorful-hr" />
  
          <div v-if="paginatedSiswaList.length > 0" class="student-cards-grid">
            <div
              v-for="(siswa) in paginatedSiswaList"
              :key="siswa.id"
              :class="['student-card', { 'card-boy': siswa.jenis_kelamin === 'Laki-laki', 'card-girl': siswa.jenis_kelamin === 'Perempuan' }]"
            >
              <div class="card-avatar">
                <img src="/src/assets/kid.png" alt="boy" v-if="siswa.jenis_kelamin === 'Laki-laki'" class="boy-icon">
                <img src="/src/assets/girl.png" alt="girl" v-else class="girl-icon">
              </div>
              <div class="card-info">
                <p class="student-name">{{ siswa.nama_siswa }}</p>
                <span class="student-nis">NISN: {{ siswa.nisn }}</span>
                <span class="student-gender">{{ siswa.jenis_kelamin }}</span>
              </div>
            </div>
          </div>
          <div v-else class="no-data-message">
            <p>Wah, belum ada teman di kelas ini. Ajak teman-teman lain yuk!</p>
            <img src="/src/assets/images/no-data.svg" alt="Tidak Ada Data" class="empty-state-image" />
          </div>
  
          <div class="pagination-section">
            <p class="page-info children-friendly-page-info">{{ pageInfo }}</p>
            <nav aria-label="Page navigation" class="pagination-nav">
              <ul class="pagination children-friendly-pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link colorful-button" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" aria-label="Previous">
                    <span aria-hidden="true">◀️</span>
                  </button>
                </li>
  
                <li class="page-item" :class="{ active: currentPage === 1 }">
                  <button class="page-link colorful-button" @click="changePage(1)">1</button>
                </li>
  
                <li v-if="showLeftEllipsis" class="page-item disabled">
                  <span class="page-link colorful-button">...</span>
                </li>
  
                <li v-for="page in middlePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <button class="page-link colorful-button" @click="changePage(page)">
                    {{ page }}
                  </button>
                </li>
  
                <li v-if="showRightEllipsis" class="page-item disabled">
                  <span class="page-link colorful-button">...</span>
                </li>
  
                <li v-if="totalPages > 1" class="page-item" :class="{ active: currentPage === totalPages }">
                  <button class="page-link colorful-button" @click="changePage(totalPages)">
                    {{ totalPages }}
                  </button>
                </li>
  
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link colorful-button" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" aria-label="Next">
                    <span aria-hidden="true">▶️</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      maxVisiblePages: 5,
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: "",
      kelasList: {},
      waliKelas: {},
      siswaList: [],
      username: "",
      password: "",
    };
  },
  mounted() {
    const idSiswa = localStorage.getItem("user_id"); // Atau "id_siswa"
    if (idSiswa) {
      this.fetchKelasBySiswaId(idSiswa);
    } else {
      console.error("ID siswa tidak ditemukan (route atau storage kosong)");
    }
  },
  methods: {
    // Metode login tidak perlu diubah di sini, karena ini halaman kelas
    async login() {
      // ... (kode login yang sudah ada)
    },

    async fetchKelasBySiswaId(id) {
      try {
        const response = await axios.get(`/siswa/${id}/kelas`);

        this.kelasList = response.data.kelas;
        this.waliKelas = response.data.wali_kelas;
        this.siswaList = response.data.daftar_siswa;
      } catch (error) {
        console.error("Gagal mengambil data kelas:", error.response ? error.response.data : error.message);
      }
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },
  },
  computed: {
    filteredSiswa() {
      // Perhatikan, jika Anda ingin menyaring berdasarkan jenis kelamin juga, tambahkan ke sini
      return this.siswaList.filter((siswa) =>
        siswa.nama_siswa.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    showLeftEllipsis() {
      return this.currentPage > 4;
    },
    showRightEllipsis() {
      return this.currentPage < this.totalPages - 3;
    },
    middlePages() {
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);

      if (this.currentPage <= 4) {
        start = 2;
        end = Math.min(5, this.totalPages - 1);
      } else if (this.currentPage >= this.totalPages - 3) {
        start = Math.max(this.totalPages - 4, 2);
        end = this.totalPages - 1;
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    paginatedSiswaList() {
      let start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredSiswa.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredSiswa.length / this.rowsPerPage); // Gunakan filteredSiswa untuk totalPages
    },
    pageInfo() {
      if (this.filteredSiswa.length === 0) {
        return 'Tidak ada teman di kelas ini.';
      }
      const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
      const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswa.length);
      return `Menampilkan ${startRow} - ${endRow} dari ${this.filteredSiswa.length} teman`;
    },
  },
};
</script>

<style scoped>
.main-content.children-friendly {
  padding: 30px;
  width: 67rem;
  margin-top: 8rem;
  background: linear-gradient(to bottom right, var(--background-light), #f1f1f1); /* Gradasi background yang lembut */
  min-height: calc(100vh - var(--navbar-height, 60px)); /* Sesuaikan tinggi agar mengisi layar */
  border-radius: 15px; /* Sudut membulat pada konten utama */
  overflow: hidden; /* Penting untuk mencegah shadow terpotong */
  font-family: 'Poppins', sans-serif; /* Gunakan font yang friendly, misal Poppins dari Google Fonts */
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 25px 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.class-title {
  font-size: 3rem;
  color: var(--primary-green);
  font-weight: 800;
  margin-bottom: 10px;
  animation: bounceIn 0.8s ease-out;
  letter-spacing: 1.5px;
  display: flex; /* Tambahkan ini agar ikon dan teks sejajar */
  align-items: center; /* Sejajarkan ikon dan teks secara vertikal */
  gap: 15px; /* Jarak antara ikon dan teks judul */
}

.class-title-icon { /* Beri class khusus untuk ikon ini di HTML */
  height: 3.2rem; /* Atur tinggi ikon agar sama dengan font-size judul */
  width: auto; /* Biarkan lebar mengikuti rasio aspek */
  vertical-align: middle; /* Membantu perataan vertikal */
  object-fit: contain; /* Memastikan gambar tidak terpotong */
}

.teacher-info {
  font-size: 1.3rem;
  color: var(--text-dark);
  font-weight: 400;
  display: flex;
  align-items: center; /* Penting untuk menyelaraskan ikon dengan teks */
  gap: 12px;
}

/* Gaya untuk ikon guru */
.teacher-icon {
  /* Hapus width: 5%; height: 5%; */
  height: 2em; /* Atur tinggi ikon relatif terhadap font-size parent-nya (teacher-info) */
  width: auto; /* Biarkan lebar mengikuti rasio aspek */
  vertical-align: middle; /* Membantu perataan vertikal dengan teks */
  object-fit: contain; /* Memastikan gambar tidak terpotong */
  /* align-items: center; <-- Hapus ini, karena ini properti flex container, bukan item */
}

/* Content Area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 25px; /* Jarak antar bagian konten */
}

.students-overview-card {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px var(--card-shadow);
  position: relative;
  z-index: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px; /* Jarak antar elemen header */
  margin-bottom: 25px;
}

.card-header h3 {
  font-size: 2rem; /* Ukuran judul daftar teman */
  color: var(--secondary-blue);
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
}

.search-and-filter {
  display: flex;
  gap: 15px;
  align-items: center;
}

.children-friendly-search {
  background-color: #f7f7f7; /* Background search bar */
  border: 2px solid var(--light-blue); /* Border dengan warna yang lebih terang */
  border-radius: 15px; /* Lebih bulat lagi */
  padding: 8px 15px; /* Padding lebih proporsional */
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.children-friendly-search:focus-within {
  border-color: var(--secondary-blue);
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.25); /* Glow saat fokus */
}

.children-friendly-search .search-input {
  border: none;
  outline: none;
  background-color: transparent; /* Background transparan */
  width: 14rem; /* Ukuran sedikit lebih kecil untuk simpel */
  font-size: 1.05rem;
  color: var(--text-dark);
}

.children-friendly-search .search-input::placeholder {
  color: #aaaaaa;
  font-weight: 400;
}

.children-friendly-search .search-icon {
  color: var(--secondary-blue);
  font-size: 1.3rem; /* Ukuran ikon pencarian */
}

.children-friendly-select {
  border-radius: 15px;
  padding: 8px 15px;
  border: 2px solid var(--light-green);
  background-color: var(--light-green);
  color: var(--text-light);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  appearance: none; /* Menghilangkan default arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 3px center;
  background-size: 1.2em;
}

.children-friendly-select:hover {
  background-color: var(--primary-green);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.colorful-hr {
  border: none;
  border-top: 4px dotted var(--accent-yellow); /* Garis putus-putus yang lebih tebal dan jelas */
  margin: 35px 0; /* Jarak lebih luas */
}

/* Grid Kartu Siswa - Tidak ada perubahan besar di sini, karena ini mengatur grid keseluruhan */
.student-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Mungkin perlu sedikit dilebarkan agar ada ruang */
  gap: 30px;
  margin-top: 20px;
}

.student-card {
  background-color: white;
  border-radius: 25px;
  padding: 25px;
  /* >>> PERUBAHAN PENTING DI SINI <<< */
  display: flex; /* Mengaktifkan Flexbox */
  flex-direction: row; /* Mengatur item agar sejajar horizontal (ikon dan info) */
  align-items: center; /* Mengatur item secara vertikal di tengah */
  text-align: left; /* Mengatur teks ke kiri, karena info di sebelah kanan ikon */
  gap: 20px; /* Jarak antara ikon dan informasi siswa */
  /* <<< AKHIR PERUBAHAN PENTING >>> */
  box-shadow: 0 10px 25px var(--card-shadow);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 3px solid transparent;
}

.student-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 35px var(--card-shadow);
}

/* Warna dan border khusus untuk kartu siswa */
/* (Tidak ada perubahan di sini kecuali Anda ingin menyesuaikan padding/margin setelah layout berubah) */
.student-card.card-boy {
  background-color: var(--light-blue);
  box-shadow: 0 10px 25px var(--colorful-shadow-boy); /* Tambahkan border yang hilang */
}

.student-card.card-boy:hover {
  box-shadow: 0 15px 35px var(--colorful-shadow-boy);
}

.student-card.card-girl {
  background-color: var(--light-pink);
  box-shadow: 0 10px 25px var(--colorful-shadow-girl); /* Tambahkan border yang hilang */
}

.student-card.card-girl:hover {
  box-shadow: 0 15px 35px var(--colorful-shadow-girl);
}

.card-avatar {
  padding: 0;
  width: 90px; /* Ukuran tetap untuk lingkaran */
  height: 90px; /* Ukuran tetap untuk lingkaran */
  /* margin-bottom: 20px; <-- Hapus atau ubah ini, karena sekarang sejajar horizontal */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0; /* Penting: Mencegah avatar menyusut jika ada ruang terbatas */
}

.card-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Pertahankan ini agar gambar tidak terdistorsi */ /* Membuat gambar itu sendiri bulat */
}

.card-info {
  /* >>> PERUBAHAN PENTING DI SINI <<< */
  display: flex;
  flex-direction: column; /* Biarkan teks di dalam card-info tetap menumpuk vertikal */
  align-items: flex-start; /* Sejajarkan teks ke kiri */
  /* Hapus text-align: center dari .student-card jika Anda ingin text-align: left di sini */
  /* margin-left: 20px; <-- Jika menggunakan gap pada .student-card, ini tidak lagi diperlukan */
  flex-grow: 1; /* Memungkinkan info mengambil sisa ruang yang tersedia */
  /* <<< AKHIR PERUBAHAN PENTING >>> */
}

.card-info .student-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
  line-height: 1.2;
}

.card-info .student-nis,
.card-info .student-gender {
  font-size: 1rem;
  color: #555;
  display: block; /* Pastikan tetap block agar menumpuk */
  margin-bottom: 3px;
}

/* No Data Message */
.no-data-message {
  text-align: center;
  padding: 60px;
  color: #777;
  font-size: 1.3rem; /* Lebih besar */
  font-weight: 500;
  background-color: #fcfcfc;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.empty-state-image {
  max-width: 250px; /* Ukuran gambar lebih besar */
  margin-top: 30px;
  opacity: 0.8;
  filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.1)); /* Efek bayangan pada SVG */
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px; /* Jarak lebih jauh dari konten */
  flex-wrap: wrap;
  gap: 20px; /* Jarak antar elemen pagination */
}

.children-friendly-page-info {
  font-size: 1.2rem; /* Ukuran info halaman */
  color: var(--text-dark);
  font-weight: 600;
}

.children-friendly-pagination .page-item {
  margin: 0 4px; /* Jarak antar tombol sedikit dirapatkan */
}

.children-friendly-pagination .colorful-button {
  background-color: var(--light-green);
  border: 2px solid var(--primary-green); /* Border lebih tebal */
  color: var(--text-light);
  border-radius: 12px; /* Lebih membulat */
  padding: 10px 18px; /* Padding lebih besar */
  font-size: 1.2rem; /* Ukuran font tombol */
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Bayangan tombol */
  transition: all 0.2s ease;
  display: inline-flex; /* Untuk senter ikon/teks */
  align-items: center;
  justify-content: center;
  min-width: 45px; /* Lebar minimum untuk tombol */
}

.children-friendly-pagination .colorful-button:hover:not(:disabled) {
  background-color: var(--primary-green);
  transform: translateY(-3px); /* Efek hover lebih kuat */
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.25);
}

.children-friendly-pagination .page-item.active .colorful-button {
  background-color: var(--primary-green);
  border-color: var(--primary-green);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.25);
}

.children-friendly-pagination .page-item.disabled .colorful-button {
  background-color: #e0e0e0; /* Warna lebih abu-abu */
  border-color: #ccc;
  color: #a0a0a0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Animasi */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Media Queries untuk Responsif */
@media (max-width: 768px) {
  .main-content.children-friendly {
    padding: 20px;
  }
  .header-section {
    padding: 20px 20px;
  }
  .class-title {
    font-size: 2.5rem;
  }
  .teacher-info {
    font-size: 1.1rem;
  }
  .students-overview-card {
    padding: 20px;
  }
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .card-header h3 {
    font-size: 1.7rem;
  }
  .search-and-filter {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .children-friendly-search .search-input {
    width: 100%;
    font-size: 0.95rem;
  }
  .children-friendly-select {
    width: 100%;
    font-size: 0.95rem;
  }
  .colorful-hr {
    margin: 25px 0;
  }
  .student-cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* Lebih kecil untuk mobile */
    gap: 20px;
  }
  .student-card {
    padding: 20px;
    border-radius: 20px;
  }
  .card-avatar {
    padding: 15px;
    margin-bottom: 15px;
  }
  .boy-icon, .girl-icon {
    font-size: 3rem;
  }
  .card-info .student-name {
    font-size: 1.3rem;
  }
  .card-info .student-nis,
  .card-info .student-gender {
    font-size: 0.9rem;
  }
  .no-data-message {
    padding: 40px;
    font-size: 1.1rem;
  }
  .empty-state-image {
    max-width: 200px;
  }
  .pagination-section {
    margin-top: 30px;
    flex-direction: column;
    gap: 10px;
  }
  .children-friendly-page-info {
    font-size: 1rem;
  }
  .children-friendly-pagination .colorful-button {
    padding: 8px 15px;
    font-size: 1.05rem;
  }
}
</style>