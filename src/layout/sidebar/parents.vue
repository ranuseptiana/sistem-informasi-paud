<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Orangtua</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Orangtua</h3>
            <router-link to="/adminmainsidebar/addParents" class="btn-add-ortu">
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
                                        <h5 class="modal-title">Filter Data Ortu</h5>
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
        <div class="table-wrapper-ortu">
            <!-- Table Section -->
            <table class="table data-table table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="table-head">No</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.noKK">No Kartu Keluarga</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nikAyah">NIK Ayah</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaAyah">Nama Ayah</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tahunLahirAyah">Tahun Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.pendidikanAyah">Jenjang Pendidikan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.pekerjaanAyah">Pekerjaan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.penghasilanAyah">Penghasilan</th>

                        <th scope="col" class="table-head" v-if="selectedFilters.nikIbu">NIK Ibu</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaIbu">Nama Ibu</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tahunLahirIbu">Tahun Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.pendidikanIbu">Jenjang Pendidikan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.pekerjaanIbu">Pekerjaan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.penghasilanIbu">Penghasilan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.noHp">Nomor Hp</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ortu, index) in paginatedOrtuList" :key="ortu.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.noKK">{{ ortu.no_kk ? ortu.no_kk : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.nikAyah">{{ ortu.nik_ayah ? ortu.nik_ayah : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.namaAyah">{{ ortu.nama_ayah ? ortu.nama_ayah : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.tahunLahirAyah">{{ ortu.tahun_lahir_ayah }}</td>
                        <td v-if="selectedFilters.pendidikanAyah">{{ ortu.pendidikan_ayah }}</td>
                        <td v-if="selectedFilters.pekerjaanAyah">{{ ortu.pekerjaan_ayah }}</td>
                        <td v-if="selectedFilters.penghasilanAyah">{{ ortu.penghasilan_ayah }}</td>
                        <td v-if="selectedFilters.nikIbu">{{ ortu.nik_ibu ? ortu.nik_ibu : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.namaIbu">{{ ortu.nama_ibu ? ortu.nama_ibu : 'Data tidak ditemukan' }}</td>
                        <td v-if="selectedFilters.tahunLahirIbu">{{ ortu.tahun_lahir_ibu }}</td>
                        <td v-if="selectedFilters.pendidikanIbu">{{ ortu.pendidikan_ibu }}</td>
                        <td v-if="selectedFilters.pekerjaanIbu">{{ ortu.pekerjaan_ibu }}</td>
                        <td v-if="selectedFilters.penghasilanIbu">{{ ortu.penghasilan_ibu }}</td>
                        <td v-if="selectedFilters.noHp">{{ ortu.no_telp ? ortu.no_telp : 'Data tidak ditemukan'}}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="editOrtu(ortu.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteOrtu(ortu.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedOrtuList.length === 0" class="no-data">
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
            maxVisiblePages: 5,
            rowsPerPage: 5,
            currentPage: 1,
            showModal: false,
            dropdownIndex: null,
            searchQuery: '', // for filtering
            selectedFilters: {
                noKK: true,
                nikAyah: true,
                namaAyah: true,
                tahunLahirAyah: false,
                pendidikanAyah: false,
                pekerjaanAyah: true,
                penghasilanAyah: false,
                nikIbu: true,
                namaIbu: true,
                tahunLahirIbu: false,
                pendidikanIbu: false,
                pekerjaanIbu: true,
                penghasilanIbu: false,
                noHp: false,
            },
            ortuList: [],
            headerMapping: {
                noKK: 'Nomor Kartu Keluarga',
                nikAyah: 'NIK Ayah',
                namaAyah: 'Nama Ayah',
                tahunLahirAyah: 'Tahun Lahir Ayah',
                pendidikanAyah: 'Pendidikan Terakhir Ayah',
                pekerjaanAyah: 'Pekerjaan Ayah',
                penghasilanAyah: 'Penghasilan Ayah',
                nikIbu: 'NIK Ibu',
                namaIbu: 'Nama Ibu',
                tahunLahirIbu: 'Tahun Lahir Ibu',
                pendidikanIbu: 'Pendidikan Terakhir Ibu',
                pekerjaanIbu: 'Pekerjaan Ibu',
                penghasilanIbu: 'Penghasilan Ibu',
                noHp: 'Nomor Hp'
            },
            firstRowFilters: [{
                    key: "noKK",
                    label: "No KK"
                },
                {
                    key: "nikAyah",
                    label: "NIK Ayah"
                },
                {
                    key: "tahunLahirAyah",
                    label: "Tahun Lahir Ayah"
                },
                {
                    key: "pendidikanAyah",
                    label: "Pendidikan Ayah"
                },
                {
                    key: "pekerjaanAyah",
                    label: "Pekerjaan Ayah"
                },
                {
                    key: "penghasilanAyah",
                    label: "Penghasilan Ayah"
                },
                {
                    key: "noHp",
                    label: "No HP"
                },
                {
                    key: "nikIbu",
                    label: "NIK Ibu"
                },
                {
                    key: "tahunLahirIbu",
                    label: "Tahun Lahir Ibu"
                },
                {
                    key: "pendidikanIbu",
                    label: "Pendidikan Ibu"
                },
                {
                    key: "pekerjaanIbu",
                    label: "Pekerjaan Ibu"
                },
                {
                    key: "penghasilanIbu",
                    label: "Penghasilan Ibu"
                },
            ],
        };
    },
    //untuk menampilkan data orangtua
    setup() {
        const ortuList = ref([]); // List ortu

        const fetchOrtuList = () => {
            axios
                .get('/orangtua')
                .then((res) => {
                    // console.log('Data yang diterima:', res.data);
                    ortuList.value = res.data.data; // Perbarui data ortu
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        };

        // Panggil fetchOrtuList saat komponen di-mount
        onMounted(() => {
            fetchOrtuList();
        });

        return {
            ortuList,
            fetchOrtuList // Return supaya bisa diakses di luar setup
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
            return this.ortuList.map((ortu, index) => {
                const filteredOrtu = {
                    No: index + 1,
                }; // Menambahkan nomor urut
                Object.keys(this.selectedFilters).forEach((key) => {
                    if (this.selectedFilters[key]) {
                        filteredOrtu[key] = ortu[key];
                    }
                });
                return filteredOrtu;
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
                const data = filteredData.map(ortu => headers.map(key => ortu[key] || ''));

                doc.autoTable({
                    head: [headerLabels],
                    body: data,
                });

                doc.save('filtered_data.pdf');
            } else if (format === 'excel') {
                const data = [headerLabels, ...filteredData.map(ortu => headers.map(key => ortu[key] || ''))];
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
        editOrtu(id) {
            this.dropdownIndex = null;
            
            this.$router.push(`/adminmainsidebar/addParents/${id}`);
        },
        async deleteOrtu(orangtuaId) {
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
                    const response = await axios.delete(`/orangtua/${orangtuaId}`);

                    Swal.fire('Terhapus!', 'Data orangtua berhasil dihapus.', 'success');
                    this.ortuList = this.ortuList.filter(ortu => ortu.id !== orangtuaId);
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data orangtua!', 'error');
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
        filteredOrtuList() {
            if (!this.searchQuery) {
                return this.ortuList; // Jika tidak ada pencarian, tampilkan semua data
            }

            const query = this.searchQuery.toLowerCase();
            return this.ortuList.filter(ortu => {
                return Object.keys(ortu).some(key => {
                    return ortu[key] && String(ortu[key]).toLowerCase().includes(query);
                });
            });
        },
        paginatedOrtuList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredOrtuList.slice(startIndex, endIndex); // Slice dari hasil filter, bukan ortuList langsung
        },
        totalPages() {
            return Math.ceil(this.ortuList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.ortuList.length);
            return `Showing ${startRow}-${endRow} of ${this.ortuList.length} entries`;
        },
    },
    mounted() {
        console.log(this.ortuList);

        // Hapus duplikasi berdasarkan ID
        this.ortuList = this.ortuList.filter(
            (item, index, self) => index === self.findIndex((t) => t.id === item.id)
        );
    }
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

.btn-add-ortu {
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

.btn-add-ortu:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add-ortu i {
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

.tampil-baris {
    color: #336C2A;
    font-weight: 600;
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

.filter-btn {
    color: #6E736D;
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

.table-wrapper-ortu {
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
    overflow: hidden;
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
}.no-data-cell {
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
</style>
