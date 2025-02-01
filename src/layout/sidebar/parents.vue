<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" class="breadcrumb-stu">
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
        <div class="table-wrapper-ortu">
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
                        <td v-if="selectedFilters.noKK">{{ ortu.no_kk }}</td>
                        <td v-if="selectedFilters.nikAyah">{{ ortu.nik_ayah }}</td>
                        <td v-if="selectedFilters.namaAyah">{{ ortu.nama_ayah }}</td>
                        <td v-if="selectedFilters.tahunLahirAyah">{{ ortu.tahun_lahir_ayah }}</td>
                        <td v-if="selectedFilters.pendidikanAyah">{{ ortu.pendidikan_ayah }}</td>
                        <td v-if="selectedFilters.pekerjaanAyah">{{ ortu.pekerjaan_ayah }}</td>
                        <td v-if="selectedFilters.penghasilanAyah">{{ ortu.penghasilan_ayah }}</td>
                        <td v-if="selectedFilters.nikIbu">{{ ortu.nik_ibu }}</td>
                        <td v-if="selectedFilters.namaIbu">{{ ortu.nama_ibu }}</td>
                        <td v-if="selectedFilters.tahunLahirIbu">{{ ortu.tahun_lahir_ibu }}</td>
                        <td v-if="selectedFilters.pendidikanIbu">{{ ortu.pendidikan_ibu }}</td>
                        <td v-if="selectedFilters.pekerjaanIbu">{{ ortu.pekerjaan_ibu }}</td>
                        <td v-if="selectedFilters.penghasilanIbu">{{ ortu.penghasilan_ibu }}</td>
                        <td v-if="selectedFilters.noHp">{{ ortu.no_telp }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }"  v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="editOrtu(ortu.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteOrtu(ortu.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedOrtuList.length === 0" class="no-data">
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
                    No: index + 1
                }; // Menambahkan nomor urut
                Object.keys(this.selectedFilters).forEach(key => {
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
            // Mengarahkan ke halaman addParents dengan ID orangtua yang ingin diedit
            this.$router.push(`/adminmainsidebar/addParents/${id}`);
        },
        // Fungsi untuk menghapus kelas berdasarkan ID
        async deleteOrtu(orangtuaId) {
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
                    const response = await axios.delete(`/orangtua/${orangtuaId}`);

                    // Tampilkan pesan sukses
                    Swal.fire('Terhapus!', 'Data kelas berhasil dihapus.', 'success');

                    // Hapus kelas dari KelasList di frontend
                    this.ortuList = this.ortuList.filter(ortu => ortu.id !== orangtuaId);
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data kelas!', 'error');
            }
        },
    },
    computed: {
        filteredOrtuList() {
            return this.ortuList.filter((ortu) => {
                return ortu.nama_ayah ?.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        isEditMode() {
            return this.editOrtu !== null;
        },
        paginatedOrtuList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.ortuList.slice(startIndex, endIndex); // Slice dari hasil filter, bukan ortuList langsung
        },
        totalPages() {
            return Math.ceil(this.ortuList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.ortuList.length);
            return `Showing ${startRow} - ${endRow} of ${this.ortuList.length} entries`;
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

<style>
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

.breadcrumb-stu {
    margin-top: 4.5rem;
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
}

.btn-add-ortu {
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

.btn-add-ortu:hover {
    color: white;
    background: #336C2A;
    text-decoration: none;
}

.btn-add-ortu i {
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
    flex-wrap: wrap;
    /* Agar elemen bisa berpindah baris jika ruang sempit */
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

.btn-add-ortu {
    right: 12px;
}

.btn-add-ortu:hover {
    transform: translateY(-2px);
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

.table-wrapper-ortu {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    /* Pastikan padding dan border tidak melebihi lebar */
}

.data-table {
    width: 100%;
    /* Pastikan tabel mengambil 100% lebar dari wrapper */
    min-width: 1000px;
    /* Tentukan lebar minimum yang lebih besar dari wrapper */
    border-collapse: collapse;
    box-sizing: border-box;
    /* Pastikan border dan padding tidak mempengaruhi lebar */
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
