<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Kelas</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Kelas</h3>
            <button class="btn-add-class" @click="prepareTambahKelas">Tambah Data
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </section>
    <section class="content">
        <!-- Filter section -->
        <div class="filter-section">
            <div class="row-filter-wrapper">
                <div class="tampil-baris">
                    Show
                    <select v-model="rowsPerPage" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="100">All</option>
                    </select>
                </div>
            </div>
            <!-- Modal -->
            <div class="custom-modal" v-if="showModal">
                <div class="custom-modal-dialog">
                    <div class="custom-modal-content">
                        <div class="custom-modal-header">
                            <h5 class="custom-modal-title">{{ isEditing ? 'Edit Data Kelas' : 'Tambah Data Kelas' }}</h5>
                            <button type="button" class="close-btn" @click="closeModal">&times;</button>
                        </div>
                        <form @submit.prevent="simpanKelas">
                            <div class="custom-modal-body">
                                <div class="form-group-kelas">
                                    <label for="namaKelas">Nama Kelas</label>
                                    <input type="text" id="namaKelas" v-model="form.nama_kelas" class="form-input" />
                                </div>
                                <div class="form-group-kelas">
                                    <label for="namaKelas">Guru Pengajar</label>
                                    <select v-model="form.guru_id">
                                        <option value="" disabled>Pilih Guru</option>
                                        <option v-for="guru in GuruList" :key="guru.id" :value="guru.id">
                                            {{ guru.nama_lengkap }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="custom-modal-footer">
                                <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
                                <button type="submit" class="btn-save">{{ isEditing ? 'Simpan Perubahan' : 'Simpan Data' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="search-bar-container">
                <input type="text" v-model="searchQuery" class="search-input" placeholder="Cari.." />
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
        <div class="table-wrapper">
            <!-- Table Section -->
            <table class="table data-table table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="table-head">No</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaKelas">Nama Kelas</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jumlahSiswa">Jumlah Siswa</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaGuru">Guru Pengajar</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(kelas, index) in paginatedKelasList" :key="kelas.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.namaKelas">{{ kelas['nama_kelas'] }}</td>
                        <td v-if="selectedFilters.jumlahSiswa">{{ kelas['jumlah_siswa'] }}</td>
                        <td v-if="selectedFilters.namaGuru">{{ kelas['nama_guru'] }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="prepareEditKelas(kelas.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteKelas(kelas.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="KelasList.length === 0" class="no-data">
                        <td colspan="7" class="no-data-cell">
                            <div class="no-data-content">
                                <img src="/src/assets/images/no-data.svg" alt="no data here" class="no-data-img">
                                <p class="no-data-text">Tidak ada data</p>
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
    </section>
</div>
</template>

<script>
import "jspdf-autotable";
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ref,
    onMounted
} from 'vue';

export default {
    data() {
        return {
            maxVisiblePages: 5,
            rowsPerPage: 5,
            currentPage: 1,
            openModal: false,
            isEditing: false,
            dropdownIndex: null,
            searchQuery: '',
            GuruList: [],
            showModal: false,
            isFilterPopupVisible: false,
            selectedFilters: {
                namaKelas: true,
                jumlahSiswa: true,
                namaGuru: true
            },
            headerMapping: {
                namaKelas: 'Nama Kelas',
                jumlahSiswa: 'Jumlah Siswa',
                namaGuru: 'Nama Guru'
            },
            newKelas: {
                nama_kelas: '',
                guru_id: '',
            },
            form: {
                nama_kelas: '',
                guru_id: '',
            },
            errors: {},
        };
    },
    methods: {
        prepareTambahKelas() {
            this.form = {
                id: null,
                nama_kelas: "",
                guru_id: '',
            }; 
            this.isEditing = false;
            this.showModal = true; 
        },
        prepareEditKelas(id) {
            this.dropdownIndex = null;
            
            const kelas = this.KelasList.find(k => k.id === id); 
            if (kelas) {
                this.form = {
                    ...kelas
                }; 
                this.isEditing = true; 
                this.showModal = true; 
            }
        },
        async simpanKelas() {
            const payload = {
                nama_kelas: this.form.nama_kelas,
                guru_id: this.form.guru_id
            };

            try {
                if (this.isEditing) {
                    await axios.put(`/kelas/${this.form.id}`, payload);
                    Swal.fire('Berhasil', 'Data kelas berhasil diperbarui!', 'success');
                } else {
                    await axios.post('/kelas', payload);
                    Swal.fire('Berhasil', 'Data kelas berhasil disimpan!', 'success');
                }

                this.closeModal(); 
                this.fetchKelasList(); 
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    console.error(error);
                    Swal.fire('Error', 'Gagal menyimpan data kelas!', 'error');
                }
            }
        },
        async deleteKelas(kelasId) {
            try {
                const confirmDelete = await Swal.fire({
                    title: 'Apakah Anda yakin?',
                    text: "Data ini akan dihapus!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Hapus',
                    cancelButtonText: 'Batal'
                });

                if (confirmDelete.isConfirmed) {
                    // Kirim permintaan DELETE ke backend
                    const response = await axios.delete(`/kelas/${kelasId}`);

                    // Tampilkan pesan sukses
                    Swal.fire('Terhapus!', 'Data kelas berhasil dihapus.', 'success');

                    // Hapus kelas dari KelasList di frontend
                    this.KelasList = this.KelasList.filter(kelas => kelas.id !== kelasId);
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data kelas!', 'error');
            }
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.KelasList.map((kelas, index) => {
                const filteredKelas = {
                    No: index + 1,
                };
                Object.keys(this.selectedFilters).forEach((key) => {
                    if (this.selectedFilters[key]) {
                        filteredKelas[key] = kelas[key];
                    }
                });
                return filteredKelas;
            });
        },
        closeModal() {
            this.showModal = false;
            this.newKelas.nama_kelas = '';
            this.resetForm();
        },
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        resetForm() {
            this.newKelas = {
                nama_kelas: "",
            };
        },
    },
    //untuk menampilkan data kelas
    setup() {
        const kelas = ref([]);
        const KelasList = ref([]); 
        const guru = ref([]);
        const GuruList = ref([]);

        const fetchKelasList = () => {
            axios.get('/kelas')
                .then((res) => {
                    // ("Response dari backend:", res.data);
                    if (res.data && Array.isArray(res.data.data)) {
                        KelasList.value = res.data.data;
                    } else {
                        console.error("Data tidak sesuai:", res.data);
                        KelasList.value = [];
                    }
                })
                .catch((error) => {
                    console.error("Gagal mengambil data kelas:", error);
                });
        };

        const fetchGuruList = () => {
            axios.get('/guru')
                .then((res) => {
                    ("Response dari backend:", res.data);
                    if (res.data && Array.isArray(res.data.data)) {
                        GuruList.value = res.data.data;
                    } else {
                        console.error("Data tidak sesuai:", res.data);
                        GuruList.value = [];
                    }
                })
                .catch((error) => {
                    console.error("Gagal mengambil data guru:", error);
                });
        };

        onMounted(() => {
            fetchKelasList();
            fetchGuruList();
        });

        return {
            kelas,
            KelasList,
            guru,
            GuruList,
            fetchKelasList,
            fetchGuruList
        };
    },
    computed: {
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
        filteredKelasList() {
            const query = this.searchQuery.toLowerCase();
            return this.KelasList.filter(kelas => {
                return Object.keys(kelas).some(key => {
                    return kelas[key] && String(kelas[key]).toLowerCase().includes(query);
                });
            });
        },
        paginatedKelasList() {
            let start = (this.currentPage - 1) * this.rowsPerPage;
            return this.filteredKelasList.slice(start, start + this.rowsPerPage);
        },
        totalPages() {
            return Math.ceil(this.KelasList.length / this.rowsPerPage);
        },
        pageInfo() {
            if (this.filteredKelasList.length === 0) {
                return 'Tidak ada data';
            }
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredKelasList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredKelasList.length} entries`;
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style>
.breadcrumb {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
}

.content-header {
    width: 100%;
}

.header-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.header-text {
    font-weight: 800;
    color: #336C2A;
}

.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
}

.btn-add-class {
    text-decoration: none;
    background: #46943a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    right: 12px;
    width: auto;
}

.btn-add-class i {
    font-size: 1rem;
}

.btn-add-class:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.tampil-baris {
    color: #336C2A;
    font-weight: 600;
}

.select-rows {
    color: #6E736D;
    padding: 5px;
    width: 3.4rem;
    border-radius: 10px;
    border: 1px solid #d6d6d686;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px rgba(173, 173, 173, 0.15);
    transition: border-color 0.3s ease;
}

.material-symbols-outlined {
    font-size: 20px;
}

.export-section {
    margin-left: 0.5rem;
}

.filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 73rem;
    max-width: 150rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.row-filter-wrapper {
    display: flex;
    align-items: center;
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

.data-table td:last-child,
.data-table th:last-child {
    text-align: center;
}

.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.popup .btn {
    box-shadow: none;
    border: none;
    background: transparent;
    padding: 0;
}

.popup-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px;
    transform: translateX(-30px);    
    border-radius: 8px;
    display: none;
    z-index: 1000;
}

.popup-menu.show {
    display: block;
}

.popup-item {
    display: block;
    padding: 8px 12px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
}

.popup-item:hover {
    background-color: #f5f5f5;
}

.pagination-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140%;
    margin-top: 1rem;
}

.page-info,
.pagination {
    margin: 0;
}

/* Background overlay */
.custom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
}

.custom-modal-dialog {
    background: white;
    border: none;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: none;
    overflow: hidden;
}

.custom-modal-content {
    display: flex;
    flex-direction: column;
}

.custom-modal-header {
    background: #ffffff;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-modal-title {
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
}

.custom-modal-body {
    text-align: left;
    padding: 1rem;
    font-size: 1rem;
    color: #333;
}

.custom-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 1rem;
    background: #ffffff;
}

.btn-save {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 0.5rem;
    width: 50%;
}

.btn-save:hover {
    background: #0056b3;
}

.btn-cancel {
    background: #ffffff;
    color: rgb(10, 10, 10);
    border: 1px solid rgb(167, 163, 163);
    width: 50%;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 0.5rem;
}

.btn-cancel:hover {
    background: #e4e3e3;
}
.form-group-kelas {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.form-group-kelas label {
    font-weight: 800;
    width: 100%;
    color: #272727;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}

.form-group-kelas input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
}

.form-group-kelas select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
}

label {
    font-weight: 700;
    width: 40%;
    text-align: left;
}

.form-input {
    color: black;
    width: 60%;
    padding: 10px;
    background-color: white;
    border: 1px solid #636364;
    border-radius: 20px;
}

.pagination-info-ortu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
</style>
