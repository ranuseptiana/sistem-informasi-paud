<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" class="breadcrumb-stu">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Kelas</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Kelas</h3>
            <button class="btn-add-class" @click="showModal = true">Tambah Data
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </section>
    <section class="content">
        <div class="table-wrapper">
            <!-- Filter section -->
            <div class="filter-section">
                <div class="row-filter-wrapper">
                    <div class="tampil-baris">
                        Show:
                        <select v-model="rowsPerPage" class="select-rows">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="100">All</option>
                        </select>
                    </div>
                    <div class="export-section">
                        <button class="btn btn-danger" @click="exportData('pdf')">
                            <i class="fa fa-file-pdf" aria-hidden="true"></i>
                            PDF
                        </button>
                        <button class="btn btn-success" @click="exportData('excel')">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                            Excel
                        </button>
                    </div>
                </div>
                <!-- Modal -->
                <div class="custom-modal" v-if="showModal">
                    <div class="custom-modal-dialog">
                        <div class="custom-modal-content">
                            <div class="custom-modal-header">
                                <h5 class="custom-modal-title">Tambah Data Kelas</h5>
                                <button type="button" class="close-btn" @click="closeModal">&times;</button>
                            </div>
                            <form @submit.prevent="simpanKelas">
                                <div class="custom-modal-body">
                                    <div class="form-group-kelas">
                                        <label for="namaKelas">Nama Kelas</label>
                                        <input type="text" id="namaKelas" v-model="form.nama_kelas" class="form-input" />
                                    </div>
                                </div>
                                <div class="custom-modal-footer">
                                    <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
                                    <button type="submit" class="btn-save">Simpan Data</button>
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
            <!-- Table Section -->
            <table class="table data-table">
                <thead>
                    <tr>
                        <th scope="col" class="table-head">No</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaKelas">Nama Kelas</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(kelas, index) in paginatedKelasList" :key="kelas.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.namaKelas">{{ kelas['nama_kelas'] }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="prepareEditKelas(kelas)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteKelas(kelas.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedKelasList.length === 0">
                        <td colspan="10" style="text-align: center">Tidak ada data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-info">
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
    </section>
</div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import Papa from "papaparse";
import axios from 'axios';
import {
    ref,
    onMounted
} from 'vue';

export default {
    data() {
        return {
            rowsPerPage: 5,
            currentPage: 1,
            openModal: false,
            editKelas: null,
            dropdownIndex: null,
            searchQuery: '',
            showModal: false,
            isFilterPopupVisible: false,
            KelasList: [],
            selectedFilters: {
                namaKelas: true,
            },
            headerMapping: {
                namaKelas: 'Nama Kelas'
            },
            resetForm: {
                namaKelas: '',
            },
            form: {
                nama_kelas: '',
            }
        };
    },
    methods: {
        async simpanKelas() {
            const payload = {
                nama_kelas: this.form.nama_kelas,
            };

            try {
                // Kirim data ke backend
                const response = await axios.post('/kelas', payload);

                Swal.fire('Berhasil', 'Data kelas berhasil disimpan!', 'success');
                this.form.nama_kelas = '';
                this.showModal = false;
                this.fetchKelasList();
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors; // Tampilkan error validasi
                } else {
                    console.error(error);
                    Swal.fire('Error', 'Gagal menyimpan data kelas!', 'error');
                }
            }
        },
        // Fungsi untuk menghapus kelas berdasarkan ID
        async deleteKelas(kelasId) {
            try {
                // Konfirmasi penghapusan data
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
        // Fungsi ekspor data berdasarkan filter aktif
        exportData(format) {
            const filteredData = this.getFilteredData();
            const headers = ['No', ...Object.keys(this.selectedFilters).filter((key) => this.selectedFilters[key])];
            const headerLabels = headers.map((header) => this.headerMapping[header] || header);

            if (format === 'pdf') {
                const doc = new jsPDF();
                const data = filteredData.map((kelas) => headers.map((key) => kelas[key] || ''));
                doc.autoTable({
                    head: [headerLabels],
                    body: data,
                });
                doc.save('filtered_data.pdf');
            } else if (format === 'excel') {
                const data = [headerLabels, ...filteredData.map((kelas) => headers.map((key) => kelas[key] || ''))];
                const csv = Papa.unparse(data);
                const blob = new Blob([csv], {
                    type: 'text/csv;charset=utf-8;'
                });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'filtered_data.csv';
                link.click();
            }
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
            this.editIndex = null;
        },
    },
    //untuk menampilkan data kelas
    setup() {
        const kelas = ref([]);
        const KelasList = ref([]); // List kelas

        const fetchKelasList = () => {
            axios
                .get('/kelas')
                .then((res) => {
                    KelasList.value = res.data.data; // Perbarui data kelas
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        };

        // Panggil fetchKelasList saat komponen di-mount
        onMounted(() => {
            fetchKelasList();
        });

        return {
            kelas,
            KelasList,
            fetchKelasList // Return supaya bisa diakses di luar setup
        };
    },
    computed: {
        filteredKelasList() {
            if (!this.KelasList) return []; // Return empty if KelasList is undefined or null

            return this.KelasList.filter(kelas => {
                const kelasNama = kelas.namaKelas ? kelas.namaKelas.toLowerCase() : '';
                return kelasNama.includes(this.searchQuery.toLowerCase());
            });
        },
        isEditMode() {
            return this.editKelas !== null;
        },
        // Paginate daftar siswa
        paginatedKelasList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.KelasList.slice(start, end);
        },
        // Total halaman berdasarkan jumlah siswa
        totalPages() {
            return Math.ceil(this.filteredKelasList.length / this.rowsPerPage);
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
.content-header {
    width: 100%;
}

.header-button {
    display: flex;
    align-items: center; /* Pastikan semua elemen sejajar secara vertikal */
    justify-content: space-between; /* Teks di kiri, tombol di kanan */
    width: 100%;
}

.header-text {
    font-weight: 800;
    color: #336C2A;
}

.btn-add-class {
    background: #61c252;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex; /* Menggunakan flexbox untuk memastikan ikon berada di tengah */
    align-items: center; /* Vertikal align icon dengan teks */
    justify-content: center; /* Horizontal align icon dengan teks */
    gap: 0.5rem; /* Menambahkan jarak antara teks dan ikon */
    width: auto;
}

.btn-add-class i {
    font-size: 1rem; /* Ukuran ikon */
}

.btn-add-class:hover {
    background: #186ac2;
}


/* Style untuk dropdown */
.select-rows {
    background: white;
    color: black;
    padding: 5px;
    width: 3.4rem;
    border-radius: 10px;
    border: 1px solid #e2e2e286;
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
    width: 140%;
    max-width: 100rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 50rem;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
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
</style>
