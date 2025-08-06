<template>
  <div class="main-content">
    <section class="content-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="breadcrumbLink">{{ breadcrumbText }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Detail Cicilan
          </li>
        </ol>
      </nav>
    </section>

    <div class="table-wrapper">
      <table class="table data-table table-hover">
        <thead>
          <tr>
            <th scope="col" class="table-head">Cicilan ke-</th>
            <th scope="col" class="table-head">Tanggal Pembayaran</th>
            <th scope="col" class="table-head">Nominal Cicilan</th>
            <th scope="col" class="table-head">Status Verifikasi</th>
            <th scope="col" class="table-head">Tempat Pembayaran</th>
            <th scope="col" class="table-head">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cicilan, index) in paginatedCicilanList" :key="cicilan.id">
            <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
            <td>{{ formatDate(cicilan.tanggal_cicilan) }}</td>
            <td>Rp {{ Number(cicilan.nominal_cicilan).toLocaleString('id-ID') }}</td>
            <td>{{ cicilan.status_verifikasi }}</td>
            <td>{{ cicilan.tempat_tagihan }}</td>
            <td>{{ cicilan.keterangan }}</td>
          </tr>
          <tr v-if="paginatedCicilanList.length === 0" class="no-data">
            <td colspan="10" class="no-data-cell"> <div class="no-data-content">
                <img src="/src/assets/images/no-data.svg" alt="no data here" class="no-data-img">
                <p class="no-data-text">Tidak ada data cicilan ditemukan.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-info-ortu">
      <p class="page-info">{{ pageInfo }}</p>
      <nav aria-label="Page navigation" class="pagination-nav">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous" :disabled="currentPage === 1">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next" :disabled="currentPage === totalPages">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue'; // Pastikan 'computed' diimpor
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2'; 

export default {
  data() {
    return {
      rowsPerPage: 5,
      currentPage: 1,
      searchQuery: '',
    };
  },
  setup() {
    const route = useRoute();
    const pembayaranId = route.params.id;
    const cicilanList = ref([]);

    // Dapatkan jenis pembayaran dari query parameter
    const paymentType = route.query.type || 'unknown';

    const fetchCicilanList = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/cicilan/pembayaran/${pembayaranId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // ('Data yang diterima:', res.data);
        cicilanList.value = res.data.data;
      } catch (error) {
        //console.error("Gagal mengambil data cicilan:", error.response?.data || error.message);
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Gagal memuat data cicilan',
            text: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data cicilan.',
          });
        }
      }
    };

    onMounted(() => {
      fetchCicilanList();
    });

    // Computed property untuk teks breadcrumb
    const breadcrumbText = computed(() => {
      if (paymentType === 'pendaftaran_baru') {
        return 'Pendaftaran Baru';
      } else if (paymentType === 'daftar_ulang') {
        return 'Daftar Ulang';
      }
      return 'Pembayaran'; // Default jika jenis tidak dikenal
    });

    // Computed property untuk link breadcrumb
    const breadcrumbLink = computed(() => {
      if (paymentType === 'pendaftaran_baru') {
        return '/siswamainsidebar/siswa/pembayaran/pendaftaran_baru';
      } else if (paymentType === 'daftar_ulang') {
        return '/siswamainsidebar/siswa/daftarUlang';
      }
      return '/siswamainsidebar/dashboard'; // Default link jika jenis tidak dikenal
    });

    // Pastikan semua yang dibutuhkan oleh template dan Options API dikembalikan dari setup()
    return {
      pembayaranId,
      cicilanList,
      fetchCicilanList,
      // Penting: Kembalikan computed properties ini
      breadcrumbText,
      breadcrumbLink,
    };
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  computed: {
    filteredCicilanList() {
      // Mengakses cicilanList.value karena cicilanList adalah ref
      if (!this.searchQuery) {
        return this.cicilanList;
      }
      const query = this.searchQuery.toLowerCase();

      return this.cicilanList.filter(cicilan => {
        return Object.keys(cicilan).some(key => {
          let value = cicilan[key];

          if (key === "status_verifikasi" && cicilan.status_verifikasi) {
            if (cicilan.status_verifikasi.toLowerCase().includes(query)) {
              return true;
            }
          }

          if (key === "tanggal_cicilan" && cicilan.tanggal_cicilan) {
            if (String(cicilan.tanggal_cicilan).toLowerCase().includes(query)) {
              return true;
            }
          }

          if (key === "nominal_cicilan" && cicilan.nominal_cicilan) {
            if (String(cicilan.nominal_cicilan).toLowerCase().includes(query)) {
              return true;
            }
          }

          if (value !== null && value !== undefined) {
            return String(value).toLowerCase().includes(query);
          }

          return false;
        });
      });
    },
    paginatedCicilanList() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      return this.filteredCicilanList.slice(startIndex, endIndex);
    },
    totalPages() {
      // Gunakan filteredCicilanList.length
      return Math.ceil(this.filteredCicilanList.length / this.rowsPerPage);
    },
    pageInfo() {
      const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
      // Gunakan filteredCicilanList.length
      const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredCicilanList.length);
      // Gunakan filteredCicilanList.length
      return `Showing ${startRow} - ${endRow} of ${this.filteredCicilanList.length} entries`;
    },
  },
};
</script>

<style scoped>
.content-header {
  margin: 0;
}
.col {
    display: flex;
    margin-bottom: 0.3rem;
    align-items: center;
}
.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
}

.breadcrumb {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
}

/* Gaya CSS Anda */
.main-content {
  margin-top: 3rem;
  padding: 20px;
}

.table-wrapper {
    width: 100%;
    max-width: auto;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.data-table {
    width: 100%;
    min-width: 50rem;
    border-collapse: collapse;
    box-sizing: border-box;
    table-layout: auto;
    margin-top: 1rem;
}

.data-table th,
.data-table td {
    padding: 12px 8px;
    text-align: left;
}

.data-table .table-head {
    font-weight: 800;
    color: #336C2A;
}

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
}

.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
}
.no-data-cell {
    text-align: center;
    padding: 20px;
    position: relative;
    height: 150px;
}

.no-data-content {
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
}

.no-data-text {
    font-size: 16px;
    color: #6c757d;
}
.pagination-info-ortu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 121%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.page-info {
    margin: 0;
}

.pagination {
    margin: 0;
}

@media (max-width: 768px) {
    .table-wrapper,
    .filter-section {
        width: 25rem;
    }
}
</style>