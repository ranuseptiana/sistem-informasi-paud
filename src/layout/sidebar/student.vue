<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
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
        <!-- Filter section -->
        <div class="filter-section">
            <div class="row-filter-wrapper">
                <div class="tampil-baris">
                    Show
                    <select v-model="rowsPerPage" class="select-rows-student">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="100">All</option>
                    </select>
                </div>
                <!-- Show filter button -->
                <div class="filter">
                    <button @click="toggleFilterPopup" class="filter-btn-student">
                        Filter
                        <i class="fa-solid fa-filter filter-icon"></i>
                    </button>
                    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                        <div class="modal-content">
                            <!-- Header -->
                            <div class="modal-header">
                                <h5 class="modal-title">Filter Data Siswa</h5>
                                <button type="button" class="close-btn" @click="closeModal">&times;</button>
                            </div>
                            <hr>

                            <!-- Filter Checkbox dalam Dua Kolom -->
                            <div class="filter-container">
                                <div class="column">
                                    <div v-for="(filter, index) in firstRowFilters" :key="index">
                                        <label>
                                            <input type="checkbox" v-model="selectedFilters[filter.key]" class="checkbox" />
                                            {{ filter.label }}
                                        </label>
                                    </div>
                                </div>
                                <div class="column">
                                    <div v-for="(filter, index) in secondRowFilters" :key="index">
                                        <label>
                                            <input type="checkbox" v-model="selectedFilters[filter.key]" class="checkbox" />
                                            {{ filter.label }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <!-- Tahun Ajaran -->
                            <div class="tahun-ajaran">
                                <label>
                                    <input type="checkbox" v-model="showTahunAjaran" class="checkbox" />
                                    Tahun Ajaran
                                </label>
                                <div v-if="showTahunAjaran" class="tahun-ajaran-dropdown">
                                    <select v-model="tahunAwal">
                                        <option value="2023/2024">2023/2024</option>
                                        <option value="2024/2025">2024/2025</option>
                                    </select>
                                    <span>-</span>
                                    <select v-model="tahunAkhir">
                                        <option value="2024/2025">2024/2025</option>
                                        <option value="2025/2026">2025/2026</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Tombol Save -->
                            <div class="modal-footer">
                                <button class="save-btn" @click="saveFilter">Save</button>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Export -->
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
            <!-- Pencarian -->
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
                        <th scope="col" class="table-head" v-if="selectedFilters.rombel">Kelas Saat Ini</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.status">Status Siswa</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tahunAjar">Tahun Ajaran</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id" class="row-hover">
                        <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
                        <td v-if="selectedFilters.noKk">{{ siswa.no_kk ? siswa.no_kk : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.nisn">{{ siswa.nisn ? siswa.nisn : 'Data tidak ditemukan' }}</td>
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
                        <td v-if="selectedFilters.rombel">{{ getKelasNama(siswa.kelas_id) }}</td>
                        <td v-if="selectedFilters.status">{{ siswa.status ? siswa.status : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.tahunAjar">{{ getTahunAjar(siswa.tahun_ajaran_id) }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="editSiswa(siswa.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteSiswa(siswa.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedSiswaList.length === 0" class="no-data">
                        <td colspan="9" class="no-data-cell">
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
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ref,
    computed,
    onMounted
} from 'vue';

export default {
    data() {
        return {
            maxVisiblePages: 5,
            rowsPerPage: 5,
            currentPage: 1,
            dropdownIndex: null,
            showModal: false,
            searchQuery: '', // for filtering
            siswaList: [],
            firstRowFilters: [{
                    key: "noKk",
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
            ],
            secondRowFilters: [{
                    key: "alamat",
                    label: "Alamat"
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
                {
                    key: "rombel",
                    label: "Kelas Saat Ini"
                },
                {
                    key: "status",
                    label: "Status Siswa"
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
                rombel: true,
                status: false,
                tahunAjar: true,
            },
            showTahunAjaran: true,
            // headerMapping: {
            //     nis: 'Nomor Induk Siswa',
            //     noKk: 'Nomor KK',
            //     nama: 'Nama Lengkap',
            //     jenisKelamin: 'Jenis Kelamin',
            //     agama: 'Agama',
            //     nik: 'NIK',
            //     tempatLahir: 'Tempat Lahir',
            //     tanggalLahir: 'Tanggal Lahir',
            //     alamat: 'Alamat',
            //     anakKe: 'Anak Ke',
            //     jumlahSaudara: 'Jumlah Saudara',
            //     beratBadan: 'Berat Badan',
            //     tinggiBadan: 'Tinggi Badan',
            //     lingkarKepala: 'Lingkar Kepala',
            //     rombel: 'Kelas Saat Ini',
            //     status: 'Status Siswa',
            //     tahunAjar: 'Tahun Ajaran',
            // }
        };
    },
    //untuk menampilkan data siswa
    setup() {
        const siswaList = ref([]);
        const kelasList = ref([]);
        const tahunAjaranList = ref([]);

        const fetchSiswaList = () => {
            axios.get('/siswa')
                .then((res) => {
                    console.log("Response dari API Siswa:", res.data); // Debugging
                    if (res.data && Array.isArray(res.data.data)) {
                        siswaList.value = res.data.data;
                        console.log("Siswa List:", siswaList.value); // Cek apakah datanya tersimpan
                    } else {
                        console.error("Format data siswa tidak sesuai", res.data);
                        siswaList.value = [];
                    }
                })
                .catch((error) => {
                    console.error("Terjadi error saat fetching data siswa:", error);
                    siswaList.value = [];
                });
        };

        const fetchKelasList = () => {
            axios.get('/kelas')
                .then(res => {
                    // console.log("Response dari API Kelas:", res.data); // Debugging
                    if (res.data && Array.isArray(res.data.data)) {
                        kelasList.value = res.data.data;
                        // console.log("Kelas List:", kelasList.value); 
                    } else {
                        console.error("Format data kelas tidak sesuai", res.data);
                        kelasList.value = [];
                    }
                })
                .catch(error => console.error("Error fetching kelas:", error));
        };

        const fetchTahunAjaranList = async () => {
            try {
                const response = await axios.get('/tahunajaran');
                tahunAjaranList.value = response.data;
                console.log("Tahun Ajar List:", tahunAjaranList.value);
            } catch (error) {
                console.error('Gagal mengambil data tahun ajaran', error);
            }
        };

        const getTahunAjar = (id) => {
            const tahunAjar = tahunAjaranList.value.find(item => item.id === id);
        
            return tahunAjar ? tahunAjar.tahun : 'Tidak ditemukan';
        };

        onMounted(() => {
            fetchSiswaList();
            fetchKelasList();
            fetchTahunAjaranList();
        });

        const sortedSiswaList = computed(() => {
            return [...siswaList.value].sort((a, b) => a.id - b.id);
        });

        return {
            siswaList,
            kelasList,
            tahunAjaranList,
            fetchSiswaList,
            fetchKelasList,
            fetchTahunAjaranList,
            getTahunAjar,
            sortedSiswaList
        };
    },
    methods: {
        saveFilter() {
            console.log("Filter disimpan:", this.selectedFilters, this.tahunAwal, this.tahunAkhir);
        },
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
            
        },
        editSiswa(id) {
            this.dropdownIndex = null;
            
            this.$router.push(`/adminmainsidebar/addStudents/${id}`);
        },
        async deleteSiswa(siswaId) {
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
                    const response = await axios.delete(`/siswa/${siswaId}`);

                    Swal.fire('Terhapus!', 'Data siswa berhasil dihapus.', 'success');

                    this.siswaList = this.siswaList.filter(siswa => siswa.id !== siswaId);
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data siswa!', 'error');
            }
        },
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
        filteredSiswaList() {
            if (!this.searchQuery) {
                return this.siswaList; // Jika tidak ada pencarian, tampilkan semua data
            }

            const query = this.searchQuery.toLowerCase();
            return this.siswaList.filter(siswa => {
                return Object.keys(siswa).some(key => {
                    return String(siswa[key]).toLowerCase().includes(query);
                });
            });
        },
        paginatedSiswaList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredSiswaList.slice(start, end);
        },
        // Total halaman berdasarkan jumlah siswa
        totalPages() {
            return Math.ceil(this.siswaList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.siswaList.length);
            return `Showing ${startRow} - ${endRow} of ${this.siswaList.length} entries`;
        },
        getKelasNama() {
            return (kelas_id) => {
                const kelas = this.kelasList.find(k => k.id === kelas_id);
                return kelas ? kelas.nama_kelas : 'Tidak ada kelas';
            };
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

/* Overlay modal */
.modal-overlay {
    position: fixed;
    z-index: 1200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Konten modal */
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
}

/* Header modal */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
}

/* Tombol close */
.close-btn {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
}

/* Layout dua kolom */
.filter-container {
    display: flex;
    justify-content: space-between;
}

.column {
    width: 48%;
}

/* Tahun ajaran dropdown */
.tahun-ajaran {
    margin-top: 15px;
}

.tahun-ajaran-dropdown {
    display: flex;
    gap: 10px;
    margin-top: 5px;
}

/* Footer modal */
.modal-footer {
    text-align: right;
    margin-top: 15px;
}

/* Tombol save */
.save-btn {
    background: blue;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

/* Filter Rows */
.filter-rows {
    margin: 0.5rem 0;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.col {
    display: flex;
    margin-bottom: 0.3rem;
    align-items: center;
    width: calc(50% - 0.5rem);
}

label {
    display: inline-block;
    white-space: nowrap;
    width: calc(100% - 30px);
    color: #636364;
}

.select-rows-student {
    color: #6E736D;
    padding: 5px;
    width: 3.4rem;
    border-radius: 10px;
    border: 1px solid #d6d6d686;
    background-color: #ffffff;
    box-shadow: 1px 1px 10px rgba(173, 173, 173, 0.15);
    transition: border-color 0.3s ease;
}

.filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 73rem;
    max-width: 150rem;
    overflow-x: auto;
    background-color: #ffffff;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

.filter-btn-student {
    font-weight: 600;
    color: #6E736D;
    padding: 4px;
    width: 7rem;
    border-radius: 10px;
    border: 1px solid #d6d6d686;
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
    margin-right: 0.5rem;
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background-color: white;
}

.checkbox:checked {
    text-align: center;
    background-color: #007bff;
    border-color: #007bff;
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

.breadcrumb {
    margin-top: 3.5rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
}

.btn-add-siswa {
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

.btn-add-siswa:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add-siswa i {
    font-size: 1rem;
}

.tampil-baris {
    color: #336C2A;
    font-weight: 600;
}

.export-section {
    margin-left: 0.5rem;
}

.search-bar-container {
    display: flex;
    align-items: center;
    border: 1px solid #d6d6d686;
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
    width: 73rem;
    max-width: 150rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 50rem;
    margin-top: 1rem;
    table-layout: auto;
}

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
}

.data-table td {
    overflow: visible;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.data-table th,
.data-table td {
    padding: 12px 8px;
    min-width: 120px;
    white-space: nowrap;
    text-align: left;
}

.data-table .table-head {
    font-weight: 800;
    color: #336C2A;
}

.data-table th:first-child,
.data-table td:first-child {
    width: 50px;
    min-width: 50px;
    max-width: 50px;
    text-align: center;
}

.data-table td:last-child,
.data-table th:last-child {
    text-align: center;
}

.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.popup {
    position: relative;
    display: inline-block;
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
    left: 0;
    transform: translateX(-30px);    
    z-index: 1000;
}

.popup-menu.show {
    display: block;
}

.popup-item {
    display: block;
    padding: 5px 12px;
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
    /* Warna teks abu-abu */
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
