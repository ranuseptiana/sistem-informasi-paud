<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" class="breadcrumb-stu">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Siswa</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Siswa</h3>
            <router-link to="/adminmainsidebar/addStudents" class="btn-add-siswa">
                Tambah Data
                <i class="fa-solid fa-plus"></i>
            </router-link>
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
                    <!-- Show filter button -->
                    <div class="filter">
                        <button @click="toggleFilterPopup" class="filter-btn">
                            Filter
                            <i class="fa-solid fa-filter filter-icon"></i>
                        </button>
                        <!-- Filter Popup -->
                        <div>
                            <!-- Modal Filter -->
                            <div v-if="showModal" class="modal-overlay" @click.self="toggleFilterPopup">
                                <div class="modal-content-siswa">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Filter Data Siswa</h5>
                                        <button type="button" class="close-btn" @click="closeModal">&times;</button>
                                    </div>
                                    <hr>
                                    <div class="filter-rows">
                                        <!-- First row -->
                                        <div class="col" v-for="(filter, key) in firstRowFilters" :key="key">
                                            <label>
                                                <input type="checkbox" class="checkbox" v-model="selectedFilters[filter.key]" />
                                                {{ filter.label }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Export -->
                    <div class="export-section">
                        <button class="btn btn-primary" @click="exportData('pdf')">
                            <i class="fa fa-file-pdf" aria-hidden="true"></i>
                            PDF
                        </button>
                        <button class="btn btn-success" @click="exportData('excel')">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                            Excel
                        </button>
                    </div>
                </div>
                <!-- Pencarian -->
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
                        <th scope="col" class="table-head" v-if="selectedFilters.noKk">No KK</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nisn">NISN</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nik">NIK</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nama">Nama Lengkap</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jenisKelamin">Jenis Kelamin</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tempatLahir">Tempat Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tanggalLahir">Tanggal Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.agama">Agama</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.alamat">Alamat</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.anakKe">Anak Ke</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jumlahSaudara">Jumlah Saudara</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.beratBadan">Berat Badan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tinggiBadan">Tinggi Badan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.lingkarKepala">Lingkar Kepala</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td v-if="selectedFilters.noKk">{{ siswa.no_kk }}</td>
                        <td v-if="selectedFilters.nisn">{{ siswa.nisn }}</td>
                        <td v-if="selectedFilters.nik">{{ siswa.nik_siswa }}</td>
                        <td v-if="selectedFilters.nama">{{ siswa.nama_siswa }}</td>
                        <td v-if="selectedFilters.jenisKelamin">{{ siswa.jenis_kelamin }}</td>
                        <td v-if="selectedFilters.tempatLahir">{{ siswa.tempat_lahir }}</td>
                        <td v-if="selectedFilters.tanggalLahir">{{ siswa.tanggal_lahir }}</td>
                        <td v-if="selectedFilters.agama">{{ siswa.agama }}</td>
                        <td v-if="selectedFilters.alamat">{{ siswa.alamat }}</td>
                        <td v-if="selectedFilters.anakKe">{{ siswa.anak_ke }}</td>
                        <td v-if="selectedFilters.jumlahSaudara">{{ siswa.jumlah_saudara }}</td>
                        <td v-if="selectedFilters.beratBadan">{{ siswa.berat_badan }}</td>
                        <td v-if="selectedFilters.tinggiBadan">{{ siswa.tinggi_badan }}</td>
                        <td v-if="selectedFilters.lingkarKepala">{{ siswa.lingkar_kepala }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="prepareEditSiswa(siswa)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteSiswa(siswa.nomorInduk)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedSiswaList.length === 0" class="no-data">
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
import Papa from "papaparse";
import Swal from "sweetalert2";
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
            dropdownIndex: null,
            showModal: false,
            searchQuery: '', // for filtering
            firstRowFilters: [{
                    key: "noKK",
                    label: "No KK"
                },
                {
                    key: "nik",
                    label: "NIK Siswa"
                },
                {
                    key: "nisn",
                    label: "NISN"
                },
                {
                    key: "nama",
                    label: "Nama Siswa"
                },
                {
                    key: "tempatLahir",
                    label: "Tempat Lahir"
                },
                {
                    key: "tanggalLahir",
                    label: "Tanggal Lahir"
                },
                {
                    key: "jenisKelamin",
                    label: "Jenis Kelamin"
                },
                {
                    key: "agama",
                    label: "Agama"
                },
                {
                    key: "alamat",
                    label: "Tahun Lahir Ibu"
                },
                {
                    key: "anakKe",
                    label: "Anak Ke"
                },
                {
                    key: "jumlahSaudara",
                    label: "Jumlah Saudara"
                },
                {
                    key: "beratBadan",
                    label: "Berat Badan"
                },
                {
                    key: "tinggiBadan",
                    label: "Tinggi Badan"
                },
                {
                    key: "lingkarKepala",
                    label: "Lingkar Kepala"
                },
            ],
            selectedFilters: {
                noKk: true,
                nik: true,
                nisn: true,
                nama: true,
                jenisKelamin: true,
                agama: false,
                tempatLahir: false,
                tanggalLahir: false,
                alamat: false,
                anakKe: false,
                jumlahSaudara: false,
                beratBadan: false,
                tinggiBadan: false,
                lingkarKepala: false,
            },
            // Mock data for testing
            siswaList: [],
            headerMapping: {
                nis: 'Nomor Induk Siswa',
                noKk: 'Nomor KK',
                nama: 'Nama Lengkap',
                jenisKelamin: 'Jenis Kelamin',
                agama: 'Agama',
                nik: 'NIK',
                tempatLahir: 'Tempat Lahir',
                tanggalLahir: 'Tanggal Lahir',
                alamat: 'Alamat',
                anakKe: 'Anak Ke',
                jumlahSaudara: 'Jumlah Saudara',
                beratBadan: 'Berat Badan',
                tinggiBadan: 'Tinggi Badan',
                lingkarKepala: 'Lingkar Kepala'
            }
        };
    },
    //untuk menampilkan data siswa
    setup() {
        const siswaList = ref([]); // List siswa

        const fetchSiswaList = () => {
            axios.get('/siswa')
                .then((res) => {
                    console.log("Response dari API:", res.data); // Debugging

                    if (res.data && Array.isArray(res.data.data)) {
                        siswaList.value = res.data.data; // Ambil array siswa
                    } else {
                        console.error("Format data tidak sesuai", res.data);
                        siswaList.value = [];
                    }
                })
                .catch((error) => {
                    console.error("Terjadi error saat fetching data:", error);
                    siswaList.value = []; // Set array kosong jika ada error
                });
        };

        // Panggil fetchOrtuList saat komponen di-mount
        onMounted(() => {
            fetchSiswaList();
        });

        return {
            siswaList,
            fetchSiswaList // Return supaya bisa diakses di luar setup
        };
    },
    methods: {
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        closeModal() {
            this.showModal = false;
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.siswaList.map((siswa, index) => {
                const filteredSiswa = {
                    No: index + 1
                }; // Menambahkan nomor urut
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredSiswa[key] = siswa[key];
                    }
                });
                return filteredSiswa;
            });
        },

        toggleFilterPopup() {
            this.showModal = !this.showModal;
        },

        // Fungsi ekspor data berdasarkan filter aktif
        exportData(format) {
            const filteredData = this.getFilteredData();

            // Buat header sesuai mapping
            const headers = ['No', ...Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key])];
            const headerLabels = headers.map(header => this.headerMapping[header] || header);

            if (format === 'pdf') {
                const doc = new jsPDF();

                // Buat data tabel untuk PDF
                const data = filteredData.map(siswa => headers.map(key => siswa[key] || ''));

                doc.autoTable({
                    head: [headerLabels],
                    body: data,
                });

                doc.save('filtered_data.pdf');
            } else if (format === 'excel') {
                const data = [headerLabels, ...filteredData.map(siswa => headers.map(key => siswa[key] || ''))];
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
    },
    computed: {
        // Filter siswa list based on search query
        filteredSiswaList() {
            if (!Array.isArray(this.siswaList)) {
                return [];
            }

            return this.siswaList.filter((siswa) =>
                siswa && siswa.nama_siswa ?
                siswa.nama_siswa.toLowerCase().includes(this.searchQuery.toLowerCase()) :
                false
            );
        },
        // Paginate daftar siswa
        paginatedSiswaList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredSiswaList.slice(start, end);
        },
        // Total halaman berdasarkan jumlah siswa
        totalPages() {
            return Math.ceil(this.filteredSiswaList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswaList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredSiswaList.length} entries`;
        },
    },
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

/* Modal Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

/* Modal Content */
.modal-content-siswa {
    background: rgb(255, 255, 255);
    padding: 1.5rem;
    border-radius: 10px;
    width: 30%;
    max-width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
}

/* Filter Rows */
.filter-rows {
    margin: 0.5rem 0;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
}

.col {
    display: flex;
    margin-bottom: 0.3rem;
    align-items: center;
}

.checkbox {
    margin-right: 0.5rem;
}

label {
    display: inline-block;
    white-space: nowrap;
    width: calc(100% - 30px);
    color: #636364;
}

.breadcrumb-stu {
    margin-top: 4.5rem;
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
}

.btn-add-siswa {
    text-decoration: none;
    /* Hilangkan underline */
    background: #61c252;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: auto;
}

.btn-add-siswa:hover {
    color: white;
    background: #336C2A;
    text-decoration: none;
}

.btn-add-siswa i {
    font-size: 1rem;
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

.filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.row-filter-wrapper {
    display: flex;
    align-items: center;
}

.filter {
    margin-left: 0.5rem;
}

.filter-actions {
    display: flex;
    align-items: center;
    gap: 2px;
}

.filter-btn {
    background-color: white;
    color: black;
    padding: 4px;
    width: 7rem;
    border-radius: 10px;
    border: 1px solid #e2e2e286;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px rgba(173, 173, 173, 0.15);
    transition: border-color 0.3s ease;
}

.filter-icon {
    margin-left: 2rem;
    color: #636364;
}

.filter-popup {
    position: absolute;
    top: 100%;
    margin-top: 0.3rem;
    left: 4;
    z-index: 999;
    background-color: white;
    border: 1px solid rgb(240, 238, 238);
    border-radius: 10px;
    padding: 10px;
    width: 75%;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-popup label {
    display: block;
    margin-bottom: 5px;
}

.checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    /* Menghilangkan tampilan default */
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background-color: white;
    /* Warna dasar putih */
}

.checkbox:checked {
    text-align: center;
    background-color: #007bff;
    /* Warna saat di-checked */
    border-color: #007bff;
    /* Border sesuai dengan warna utama */
}

.checkbox:checked::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.export-section {
    margin-left: 0.5rem;
}

.search-bar-container {
    display: flex;
    align-items: center;
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
    width: 65rem;
    max-width: 150rem;
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
    /* Added more padding for a cleaner look */
    text-align: left;
}

.data-table .table-head {
    font-weight: 800;
    color: #336C2A;
}

.data-table td:last-child {
    text-align: center;
    /* Align the 'Action' column */
}

.data-table th:last-child {
    text-align: center;
    /* Align the 'Action' column */
}

.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
    /* Light gray background for alternating rows */
}

.data-table tr:hover {
    background-color: #f1f1f1;
    /* Light hover effect */
}

.popup .btn {
    box-shadow: none;
    /* Remove the box shadow */
    border: none;
    /* Optionally, remove any border */
    background: transparent;
    /* If you want the background to be transparent */
    padding: 0;
    /* Adjust padding if necessary */
}

.popup-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    /* Bayangan abu-abu */
    padding: 10px;
    border-radius: 8px;
    display: none;
    /* Awalnya tidak terlihat */
    z-index: 1000;
}

.popup-menu.show {
    display: block;
    /* Tampilkan popup saat dropdownIndex === index */
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

.no-data-cell {
    text-align: center;
    padding: 20px;
    position: relative;
    height: 150px;
    /* Tinggi baris agar elemen berada di tengah */
}

.no-data-content {
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* Pastikan isi memenuhi tinggi */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.no-data-img {
    max-width: 100px;
    /* Sesuaikan ukuran gambar */
    margin-bottom: 10px;
}

.no-data-text {
    font-size: 16px;
    color: #6c757d;
    /* Warna teks abu-abu */
}

.pagination-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
}

.page-info {
    margin: 0;
}

.pagination {
    margin: 0;
}
</style>
