<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Guru</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Guru</h3>
            <router-link to="/adminmainsidebar/addTeachers" class="btn-add">
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
                    <select v-model="rowsPerPage" class="select-rows">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="100">All</option>
                    </select>
                </div>
                <div class="filter">
                    <button @click="showModal = true" class="filter-btn">
                        Filter
                        <i class="fa-solid fa-filter filter-icon"></i>
                    </button>
                    <!-- Filter Popup -->
                    <div>
                        <!-- Modal Filter -->
                        <div v-if="showModal" class="modal-overlay" @click.self="toggleFilterPopup">
                            <div class="modal-content-ortu">
                                <div class="modal-header">
                                    <h5 class="modal-title">Filter Data Guru</h5>
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
                        <th scope="col" class="table-head" v-if="selectedFilters.nip">NIP</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.username">Username</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.password">Password</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaGuru">Nama Lengkap</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.gender">Jenis Kelamin</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tempatLahir">Tempat Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tglLahir">Tanggal Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.agama">Agama</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.alamat">Alamat</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.noTelp">No Telp</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jabatan">Jabatan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.kelas">Kelas Yang Diajar</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jmlHari">Jumlah Hari Mengajar</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tugasMengajar">Tugas Mengajar</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(guru, index) in paginatedGuruList" :key="guru.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.nip">{{ guru.nip }}</td>
                        <td v-if="selectedFilters.username">{{ guru.username }}</td>
                        <td v-if="selectedFilters.password">{{ guru.password }}</td>
                        <td v-if="selectedFilters.namaGuru">{{ guru.nama_lengkap }}</td>
                        <td v-if="selectedFilters.gender">{{ guru.gender }}</td>
                        <td v-if="selectedFilters.tempatLahir">{{ guru.tempat_lahir }}</td>
                        <td v-if="selectedFilters.tglLahir">{{ guru.tgl_lahir }}</td>
                        <td v-if="selectedFilters.agama">{{ guru.agama }}</td>
                        <td v-if="selectedFilters.alamat">{{ guru.alamat }}</td>
                        <td v-if="selectedFilters.noTelp">{{ guru.no_telp }}</td>
                        <td v-if="selectedFilters.jabatan">{{ guru.jabatan }}</td>
                        <td v-if="selectedFilters.kelas">{{ guru.kelasDiampu }}</td>
                        <td v-if="selectedFilters.jmlHari">{{ guru.jumlah_hari_mengajar }}</td>
                        <td v-if="selectedFilters.tugasMengajar">{{ guru.tugas_mengajar }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="editGuru(guru.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteGuru(guru.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedGuruList.length === 0" class="no-data">
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
    computed,
    onMounted
} from 'vue';

export default {
    data() {
        return {
            rowsPerPage: 5,
            currentPage: 1,
            showModal: false,
            dropdownIndex: null,
            searchQuery: '', // for filtering
            selectedFilters: {
                nip: true,
                username: true,
                password: true,
                namaGuru: true,
                gender: false,
                tempatLahir: false,
                tglLahir: false,
                agama: false,
                alamat: false,
                noTelp: false,
                jabatan: true,
                kelas: true,
                jmlHari: true,
                tugasMengajar: true,
            },
            guruList: [],
            kelasList: [],
            headerMapping: {
                noKK: 'Nomor Kartu Keluarga',
            },
            firstRowFilters: [{
                    key: "nip",
                    label: "NIP"
                },
                {
                    key: "username",
                    label: "Username"
                },
                {
                    key: "password",
                    label: "Password"
                },
                {
                    key: "namaGuru",
                    label: "Nama Lengkap"
                },
                {
                    key: "gender",
                    label: "Jenis Kelamin"
                },
                {
                    key: "tempatLahir",
                    label: "Tempat Lahir"
                },
                {
                    key: "tglLahir",
                    label: "Tanggal Lahir"
                },
                {
                    key: "agama",
                    label: "Agama"
                },
                {
                    key: "alamat",
                    label: "Alamat"
                },
                {
                    key: "noTelp",
                    label: "Nomor Telp"
                },
                {
                    key: "jabatan",
                    label: "Jabatan"
                },
                {
                    key: "kelas",
                    label: "Kelas Yang Diajar"
                },
                {
                    key: "jmlHari",
                    label: "Jumlah Hari Mengajar"
                },
                {
                    key: "tugasMengajar",
                    label: "Tugas Mengajar"
                },
            ],
        };
    },
    setup() {
        const guruList = ref([]);
        const kelasList = ref([]);
        const relasiKelasList = ref([]);

        const fetchGuruList = () => {
            axios.get("/guru", {
                    withCredentials: true
                })
                .then((res) => {
                    guruList.value = res.data.data;
                })
                .catch((error) => console.log(error.response.data));
        };

        const fetchKelasList = () => {
            axios.get("/kelas")
                .then((res) => {
                    if (res.data && Array.isArray(res.data.data)) {
                        kelasList.value = res.data.data;
                    } else {
                        console.error("Format data kelas tidak sesuai", res.data);
                        kelasList.value = [];
                    }
                })
                .catch(error => console.error("Error fetching kelas:", error));
        };

        const fetchRelasiKelasList = () => {
            axios.get("/relasikelas")
                .then((res) => {
                    relasiKelasList.value = res.data.data;
                })
                .catch(error => console.error("Error fetching relasi kelas:", error));
        };

        // Mengelompokkan kelas yang diampu oleh guru
        const guruWithKelas = computed(() => {
            return guruList.value.map(guru => {
                const kelasDiampu = relasiKelasList.value
                    .filter(relasi => relasi.guru_id === guru.id) // Cari kelas berdasarkan guru_id
                    .map(relasi => {
                        const kelas = kelasList.value.find(k => k.id === relasi.kelas_id);
                        return kelas ? kelas.nama_kelas : "Tidak Diketahui"; // Pastikan nama kelas ada
                    });

                return {
                    ...guru,
                    kelasDiampu: kelasDiampu.join(", ") // Gabungkan kelas dalam satu string
                };
            });
        });

        onMounted(() => {
            fetchGuruList();
            fetchKelasList();
            fetchRelasiKelasList();
        });

        return {
            guruWithKelas,
            fetchGuruList,
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
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.guruList.map((guru, index) => {
                const filteredGuru = {
                    No: index + 1
                }; // Menambahkan nomor urut
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredGuru[key] = guru[key];
                    }
                });
                return filteredGuru;
            });
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
                const data = filteredData.map(guru => headers.map(key => guru[key] || ''));

                doc.autoTable({
                    head: [headerLabels],
                    body: data,
                });

                doc.save('filtered_data.pdf');
            } else if (format === 'excel') {
                const data = [headerLabels, ...filteredData.map(guru => headers.map(key => guru[key] || ''))];
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
        editGuru(id) {
            this.dropdownIndex = null;

            this.$router.push(`/adminmainsidebar/addTeachers/${id}`);
        },
        // Fungsi untuk menghapus kelas berdasarkan ID
        async deleteGuru(guruId) {
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
                    const response = await axios.delete(`/guru/${guruId}`);

                    Swal.fire('Terhapus!', 'Data guru berhasil dihapus.', 'success');

                    this.fetchGuruList();
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data guru!', 'error');
            }
        },
    },
    computed: {
        guruWithKelas() {
            return this.guruList.map(guru => {
                const kelasDiampu = this.relasiKelasList
                    .filter(relasi => relasi.guru_id === guru.id) // Cari relasi kelas berdasarkan guru_id
                    .map(relasi => {
                        const kelas = this.kelasList.find(k => k.id === relasi.kelas_id);
                        return kelas ? kelas.nama_kelas : "Tidak Diketahui";
                    });

                return {
                    ...guru,
                    kelasDiampu: kelasDiampu.join(", ") // Gabungkan kelas dalam satu string
                };
            });
        },
        paginatedGuruList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredGuruList.slice(startIndex, endIndex);
        },
        filteredGuruList() {
            const query = this.searchQuery.toLowerCase();
            return this.guruWithKelas.filter(guru => {
                return Object.keys(guru).some(key => {
                    return guru[key] && String(guru[key]).toLowerCase().includes(query);
                });
            });
        },
        totalPages() {
            return Math.ceil(this.guruWithKelas.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.guruWithKelas.length);
            return `Showing ${startRow} - ${endRow} of ${this.guruWithKelas.length} entries`;
        },
    },
};
</script>

<style scoped>
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

.modal-content-ortu {
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

.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.breadcrumb {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
}

.btn-add {
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

.btn-add:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add i {
    font-size: 1rem;
}

/* Style untuk dropdown */
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

.filter-section {
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 73rem;
    max-width: 150rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    color: #636364;
    font-weight: 600;
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

.filter-popup-ortu {
    position: absolute;
    top: 100%;
    margin-top: 0.3rem;
    left: 4;
    z-index: 999;
    background-color: white;
    border: 1px solid rgb(240, 238, 238);
    border-radius: 10px;
    padding: 10px;
    width: 40rem;
    max-width: 100%;
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

.material-symbols-outlined {
    font-size: 20px;
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

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
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

.data-table td:last-child {
    text-align: center;
}

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

.pagination-info-ortu {
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
    margin: 0;
}
</style>
