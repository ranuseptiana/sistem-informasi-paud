<template>
<div class="container">
    <div class="card mb-4">
        <div class="card-body text-center">
            <h1 class="h3 mb-2">
                <i class="fas fa-users me-2"></i>Kelas {{ kelasList.nama_kelas }}
            </h1>
            <p class="text-muted mb-0">
                <i class="fas fa-chalkboard-teacher me-1"></i> Guru Pengajar:
                <strong>{{ waliKelas.nama_lengkap }}</strong>
            </p>
        </div>
    </div>

    <div class="card mb-4">
        <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Siswa</h5>
            <div class="d-flex">
                <div class="input-group me-2" style="width: 250px;">
                    <input type="text" v-model="searchQuery" class="form-control" placeholder="Cari nama siswa...">
                    <span class="input-group-text">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
                <select v-model="rowsPerPage" class="form-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="100">Semua</option>
                </select>
            </div>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>NISN</th>
                            <th>Jenis Kelamin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedSiswaList.length === 0">
                            <td colspan="4" class="text-center py-4">
                                <div class="d-flex flex-column align-items-center">
                                    <i class="fas fa-user-slash text-muted mb-2" style="font-size: 2rem;"></i>
                                    <p class="text-muted mb-0">Tidak ada siswa dalam kelas ini</p>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id">
                            <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
                            <td>
                                <!-- <i 
                    :class="siswa.jenis_kelamin === 'Laki-laki' ? 'fas fa-male text-primary' : 'fas fa-female text-danger'" 
                    class="me-2"
                  ></i> -->
                                {{ siswa.nama_siswa }}
                            </td>
                            <td>{{ siswa.nisn }}</td>
                            <td>{{ siswa.jenis_kelamin }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="text-muted">
                    Menampilkan {{ (currentPage - 1) * rowsPerPage + 1 }} -
                    {{ Math.min(currentPage * rowsPerPage, filteredSiswa.length) }} dari
                    {{ filteredSiswa.length }} siswa
                </div>

                <nav aria-label="Page navigation">
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                                &laquo;
                            </button>
                        </li>

                        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                            <button class="page-link" @click="changePage(page)">
                                {{ page }}
                            </button>
                        </li>

                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                                &raquo;
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
            rowsPerPage: 10,
            currentPage: 1,
            searchQuery: "",
            kelasList: {},
            waliKelas: {},
            siswaList: []
        };
    },
    mounted() {
        const idSiswa = localStorage.getItem("user_id");
        if (idSiswa) {
            this.fetchKelasBySiswaId(idSiswa);
        } else {
            console.error("ID siswa tidak ditemukan");
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
                console.error("Gagal mengambil data kelas:", error);
            }
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    },
    computed: {
        filteredSiswa() {
            return this.siswaList.filter(siswa =>
                siswa.nama_siswa.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        totalPages() {
            return Math.ceil(this.filteredSiswa.length / this.rowsPerPage);
        },
        visiblePages() {
            const pages = [];
            const half = Math.floor(this.maxVisiblePages / 2);
            let start = Math.max(1, this.currentPage - half);
            let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

            if (end - start < this.maxVisiblePages - 1) {
                start = Math.max(1, end - this.maxVisiblePages + 1);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        paginatedSiswaList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            return this.filteredSiswa.slice(start, start + this.rowsPerPage);
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 5rem;
}
.card {
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.table th {
    font-weight: 600;
    background-color: #f8f9fa;
}

.page-item.active .page-link {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.page-link {
    color: #0d6efd;
}

@media (max-width: 768px) {
    .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .input-group {
        width: 100% !important;
    }

    .form-select {
        width: 100%;
    }

    .d-flex.justify-content-between {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .pagination {
        margin-top: 1rem;
    }
}
</style>
