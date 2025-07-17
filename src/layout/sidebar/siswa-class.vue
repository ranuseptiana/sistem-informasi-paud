<template>
  <div class="main-content">
    <div class="header-section">
      <h1 class="class-title"><img src="/src/assets/class.png" alt="Class Icon" class="class-title-icon"> Kelas {{ kelasList.nama_kelas }}</h1>
      <p class="teacher-info">
        <img src="/src/assets/teacher.png" alt="" class="teacher-icon"> Guru Pengajar:
        <strong>{{ waliKelas.nama_lengkap }}</strong>
      </p>
    </div>

    <div class="content-area">
      <div class="students-table-container">
        <div class="table-header">
          <h3>Daftar Siswa di Kelas Ini</h3>
          <div class="search-and-filter">
            <div class="search-bar-container">
              <input type="text" v-model="searchQuery" class="search-input" placeholder="Cari nama siswa..." />
              <i class="fas fa-search search-icon"></i>
            </div>
            <select v-model="rowsPerPage" class="select-rows">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="100">Semua</option>
            </select>
          </div>
        </div>

        <hr class="colorful-hr" />

        <div class="table-responsive">
          <table class="students-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>NISN</th>
                <th>Jenis Kelamin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paginatedSiswaList.length === 0">
                <td colspan="4" class="no-data">
                  <p>Tidak ada siswa didalam kelas ini.</p>
                  <img src="/src/assets/images/no-data.svg" alt="Tidak Ada Data" class="empty-state-image" />
                </td>
              </tr>
              <tr 
                v-for="(siswa, index) in paginatedSiswaList" 
                :key="siswa.id"
                :class="['student-row', siswa.jenis_kelamin === 'Laki-laki' ? 'boy-row' : 'girl-row']"
              >
                <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
                <td class="student-name-cell">
                  <img 
                    :src="siswa.jenis_kelamin === 'Laki-laki' ? '/src/assets/kid.png' : '/src/assets/girl.png'" 
                    :alt="siswa.jenis_kelamin" 
                    class="student-icon"
                  >
                  {{ siswa.nama_siswa }}
                </td>
                <td>{{ siswa.nisn }}</td>
                <td>{{ siswa.jenis_kelamin }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-section">
          <p class="page-info">{{ pageInfo }}</p>
          <nav aria-label="Page navigation" class="pagination-nav">
              <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>

                  <li class="page-item" :class="{ active: currentPage === 1 }">
                      <button class="page-link" @click="changePage(1)">1</button>
                  </li>

                  <li v-if="showLeftEllipsis" class="page-item disabled">
                      <span class="page-link">...</span>
                  </li>

                  <li v-for="page in middlePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                      <button class="page-link" @click="changePage(page)">
                          {{ page }}
                      </button>
                  </li>

                  <li v-if="showRightEllipsis" class="page-item disabled">
                      <span class="page-link">...</span>
                  </li>

                  <li v-if="totalPages > 1" class="page-item" :class="{ active: currentPage === totalPages }">
                      <button class="page-link" @click="changePage(totalPages)">
                          {{ totalPages }}
                      </button>
                  </li>

                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
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
    const idSiswa = localStorage.getItem("user_id"); 
    if (idSiswa) {
      this.fetchKelasBySiswaId(idSiswa);
    } else {
      console.error("ID siswa tidak ditemukan (route atau storage kosong)");
    }
  },
  methods: {
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
  },
  computed: {
    filteredSiswa() {
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
      return Math.ceil(this.filteredSiswa.length / this.rowsPerPage);
    },
    pageInfo() {
      if (this.filteredSiswa.length === 0) {
        return 'Tidak ada siswa di kelas ini.';
      }
      const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
      const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswa.length);
      return `Menampilkan ${startRow} - ${endRow} dari ${this.filteredSiswa.length} siswa`;
    },
  },
};
</script>

<style scoped>
.main-content {
  padding: 30px;
  margin-top: 8rem;
  background-color: #fff;
  min-height: calc(100vh - var(--navbar-height, 60px));
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
  display: flex;
  align-items: center;
  gap: 15px;
}

.class-title-icon {
  height: 3.2rem;
  width: auto;
  vertical-align: middle;
  object-fit: contain;
}

.teacher-info {
  font-size: 1.3rem;
  color: var(--text-dark);
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 12px;
}

.teacher-icon {
  height: 2em;
  width: auto;
  vertical-align: middle;
  object-fit: contain;
}

/* Content Area */
.content-area {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.students-table-container {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px var(--card-shadow);
  position: relative;
  z-index: 1;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
}

.table-header h3 {
  font-size: 2rem;
  color: var(--secondary-blue);
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
}

.search-and-filter {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-bar-container {
  background-color: #f7f7f7;
  border: 2px solid var(--light-blue);
  border-radius: 15px;
  padding: 8px 15px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.search-bar-container:focus-within {
  border-color: var(--secondary-blue);
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.25);
}

.search-input {
  border: none;
  outline: none;
  background-color: transparent;
  width: 14rem;
  font-size: 1.05rem;
  color: var(--text-dark);
}

.search-input::placeholder {
  color: #aaaaaa;
  font-weight: 400;
}

.search-icon {
  color: var(--secondary-blue);
  font-size: 1.3rem;
  margin-left: 8px;
}

.select-rows {
  border-radius: 15px;
  padding: 8px 15px;
  border: 2px solid var(--light-green);
  background-color: var(--light-green);
  color: var(--text-light);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 3px center;
  background-size: 1.2em;
}

.select-rows:hover {
  background-color: var(--primary-green);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.colorful-hr {
  border: none;
  border-top: 4px dotted var(--accent-yellow);
  margin: 35px 0;
}

/* Table Styles */
.table-responsive {
  overflow-x: auto;
}

.students-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.students-table th {
  background-color: var(--primary-green);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.students-table th:first-child {
  border-top-left-radius: 15px;
}

.students-table th:last-child {
  border-top-right-radius: 15px;
}

.students-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.students-table tr:last-child td {
  border-bottom: none;
}

.students-table tr:hover {
  background-color: #f9f9f9;
}

.student-row.boy-row {
  background-color: rgba(173, 216, 230, 0.1);
}

.student-row.girl-row {
  background-color: rgba(255, 182, 193, 0.1);
}

.student-row.boy-row:hover {
  background-color: rgba(173, 216, 230, 0.3);
}

.student-row.girl-row:hover {
  background-color: rgba(255, 182, 193, 0.3);
}

.student-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.student-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #777;
  font-size: 1.3rem;
  font-weight: 500;
}

.empty-state-image {
  max-width: 250px;
  margin-top: 20px;
  opacity: 0.8;
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.page-info {
  font-size: 1.2rem;
  color: var(--text-dark);
  font-weight: 600;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-item {
  margin: 0 4px;
}

.page-link {
  background-color: var(--light-green);
  border: 2px solid var(--primary-green);
  color: var(--text-light);
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  cursor: pointer;
}

.page-link:hover:not(:disabled) {
  background-color: var(--primary-green);
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.25);
}

.page-item.active .page-link {
  background-color: var(--primary-green);
  border-color: var(--primary-green);
  color: var(--text-light);
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.25);
}

.page-item.disabled .page-link {
  background-color: #e0e0e0;
  border-color: #ccc;
  color: #a0a0a0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Animations */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .main-content {
    padding: 20px;
  }
  
  .header-section {
    padding: 20px;
  }
  
  .class-title {
    font-size: 2.5rem;
  }
  
  .teacher-info {
    font-size: 1.1rem;
  }
  
  .students-table-container {
    padding: 20px;
  }
  
  .table-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .table-header h3 {
    font-size: 1.7rem;
  }
  
  .search-and-filter {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .search-input {
    width: 100%;
    font-size: 0.95rem;
  }
  
  .select-rows {
    width: 100%;
    font-size: 0.95rem;
  }
  
  .colorful-hr {
    margin: 25px 0;
  }
  
  .students-table th, 
  .students-table td {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .student-icon {
    width: 25px;
    height: 25px;
  }
  
  .no-data {
    padding: 30px;
    font-size: 1.1rem;
  }
  
  .empty-state-image {
    max-width: 200px;
  }
  
  .pagination-section {
    margin-top: 20px;
    flex-direction: column;
    gap: 10px;
  }
  
  .page-info {
    font-size: 1rem;
  }
  
  .page-link {
    padding: 8px 15px;
    font-size: 1.05rem;
  }
}
</style>