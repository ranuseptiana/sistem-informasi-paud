<template>
<div class="main-content">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Kelas</li>
        </ol>
    </nav>
    <div class="kotak-peserta">
        <div class="list-peserta">
            <h2>Kelas {{ kelasList.nama_kelas }}</h2>
        </div>
        <div class="table-wrapper">
            <div class="search-filter">
                <h3>Peserta Kelas</h3>
            </div>
            <hr>
            <div class="show">
                <div class="tampil-baris">
                    Show
                    <select v-model="rowsPerPage" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="100">All</option>
                    </select>
                </div>
                <div class="search-bar-container">
                    <input type="text" v-model="searchQuery" class="search-input" placeholder="Cari.." />
                    <i class="fas fa-search search-icon"></i>
                </div>
            </div>
            <table class="table data-table table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="table-head">No</th>
                        <th scope="col" class="table-head">NIS</th>
                        <th scope="col" class="table-head">Nama</th>
                        <th scope="col" class="table-head">Jenis Kelamin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td>{{ siswa.nisn }}</td>
                        <td>{{ siswa.nama }}</td>
                        <td>{{ siswa.jenis_kelamin }}</td>
                    </tr>
                    <tr v-if="paginatedSiswaList.length === 0" class="no-data">
                        <td colspan="5" class="no-data-cell">
                            <div class="no-data-content">
                                <img src="/src/assets/images/no-data.svg" alt="no data here" class="no-data-img">
                                <p class="no-data-text">Tidak ada data</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-info-guru">
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
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            searchQuery: "",
            kelasList: {},
            siswaList: [],
            username: "",
            password: "",
            currentPage: 1,
            rowsPerPage: 5
        };
    },
    mounted() {
        const idGuru = localStorage.getItem("user_id");

        ('ID Guru dari localStorage:', idGuru);

        if (idGuru) {
            this.fetchKelasByGuruId(idGuru);
        } else {
            console.error("ID guru tidak ditemukan di localStorage");
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("/auth/login", {
                    username: this.username,
                    password: this.password,
                });

                const token = response.data.token;
                const user = response.data.user;
                const guruId = response.data.guruId;

                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("id_guru", response.data.guruId);

                let userId = localStorage.getItem("id_guru");

                this.fetchKelasByGuruId(userId);
            } catch (error) {
                console.error("Login failed:", error);
            }
        },

        async fetchKelasByGuruId(idGuru) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/guru/${idGuru}/kelas`);
                ("Response:", response);
                ("Response Data:", response.data.data.daftar_kelas);

                if (!response.data) {
                    throw new Error('Response tidak valid dari server');
                }

                this.kelasList = response.data.data.daftar_kelas[0] || {};
                this.siswaList = response.data.data.daftar_kelas[0].siswa || [];

            } catch (error) {
                console.error("Error detail:", {
                    message: error.message,
                    response: error.response ?.data,
                    status: error.response ?.status
                });

                alert(`Gagal memuat data: ${error.response?.data?.message || error.message}`);
            }
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    },
    computed: {
        filteredSiswa() {
            return this.siswaList.filter((siswa) =>
                siswa.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                (siswa.nisn && siswa.nisn.toString().includes(this.searchQuery))
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
                return 'Tidak ada data';
            }
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswa.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredSiswa.length} entries`;
        },
    }
};
</script>

  
<style scoped>
.main-content {
    margin-top: 6.5rem;
    display: flex;
    flex-direction: column;
}

.list-peserta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: auto;
    max-width: 150rem;
    overflow-x: auto;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.show {
    display: flex;
    flex-direction: row;
}

.search-bar-container {
    display: flex;
    align-items: center;
    margin-left: auto;
    border: 1px solid #e2e2e286;
    padding: 5px 0.5rem;
    border-radius: 10px;
    width: fit-content;
    background-color: white;
    box-shadow: 1px 1px 10px rgba(173, 173, 173, 0.15);
}

.search-input {
    border: none;
    outline: none;
    text-align: left;
    background-color: white;
    width: 7rem;
}

.search-icon {
    color: #888;
}

.search-bar-container:focus-within {
    border-color: #636364;
}

.table-wrapper {
    width: 100%;
    max-width: 100rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 50rem;
    margin-top: 1rem;
    table-layout: auto;
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

.pagination-info-guru {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.pagination-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.page-info {
    margin: 0;
}

.pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
}

.page-item {
    margin: 0 2px;
}

.page-item.active .page-link {
    background-color: #336C2A;
    border-color: #336C2A;
    color: white;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

.kotak-peserta {
    width: 94%;
}
.page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #336C2A;
    background-color: #fff;
    border: 1px solid #dee2e6;
    cursor: pointer;
}

.page-link:hover {
    color: #1a3615;
    text-decoration: none;
    background-color: #e9ecef;
    border-color: #dee2e6;
}

.page-link:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(51, 108, 42, 0.25);
}

@media (max-width: 768px) {
    .kotak-peserta {
        width: 25rem;
    }
 }
</style>
