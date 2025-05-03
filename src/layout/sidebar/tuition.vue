<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Pembayaran SPP</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Pembayaran SPP</h3>
            <button class="btn-add-class" @click="prepareTambahPembayaran">Tambah Data
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
                <div class="filter">
                    <button @click="showModal = true" class="filter-btn">
                        Filter
                        <i class="fa-solid fa-filter filter-icon"></i>
                    </button>
                    <!-- Filter Popup -->
                    <div>
                        <!-- Modal Filter -->
                        <div v-if="showModal" class="modal-overlay modal-overlay-filter" @click.self="toggleFilterPopup">
                            <div class="modal-content-spp">
                                <div class="modal-header">
                                    <h5 class="modal-title">Filter Data SPP</h5>
                                    <button type="button" class="close-btn" @click="closeModal">&times;</button>
                                </div>
                                <hr>
                                <div class="filter-rows">
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
                        <th scope="col" class="table-head" v-if="selectedFilters.namaSiswa">Nama Siswa</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.namaKelas">Kelas Siswa</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tglPembayaran">Tanggal Pembayaran</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nominal">Nominal Pembayaran</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.buktiPembayaran">Bukti Pembayaran</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.statusPembayaran">Status Pembayaran</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.statusRapor">Status Rapor</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pembayaranSpp, index) in paginatedPembayaranSppList" :key="pembayaranSpp.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.namaSiswa">{{ pembayaranSpp.siswa?.nama_siswa }}</td>
                        <td v-if="selectedFilters.namaKelas">{{ getNamaKelasBySiswaId(pembayaranSpp.siswa_id) }}</td>
                        <td v-if="selectedFilters.tglPembayaran">{{ pembayaranSpp.tanggal_pembayaran ? pembayaranSpp.tanggal_pembayaran : 'Tanggal Tidak Ditemukan' }}</td>
                        <td v-if="selectedFilters.nominal"> {{ pembayaranSpp.nominal ? formatRupiah(pembayaranSpp.nominal) : 'Nominal Belum Ditambahkan' }}</td>
                        <td v-if="selectedFilters.buktiPembayaran">{{ pembayaranSpp.bukti_pembayaran ? pembayaranSpp.bukti_pembayaran : 'Bukti Belum Ditambahkan' }}</td>
                        <td v-if="selectedFilters.statusPembayaran">{{ pembayaranSpp.status_pembayaran }}</td>
                        <td v-if="selectedFilters.statusRapor">{{ pembayaranSpp.status_rapor }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="prepareEditPembayaran(pembayaranSpp.id)" style="color: #274278">Detail</button>
                                    <button class="popup-item" @click="prepareEditPembayaran(pembayaranSpp.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deletePembayaranSpp(pembayaranSpp.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedPembayaranSppList.length === 0" class="no-data">
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
        <div class="custom-modal" v-if="tampilModal">
            <div class="custom-modal-dialog">
                <div class="custom-modal-content">
                    <div class="custom-modal-header">
                        <h5 class="custom-modal-title">{{ isEdit ? 'Edit Data SPP' : 'Tambah Data SPP' }}</h5>
                        <button type="button" class="close-btn" @click="closeModal">&times;</button>
                    </div>
                    <form @submit.prevent="simpanSpp">
                        <div class="custom-modal-body">
                            <div class="form-group-spp">
                                <label for="idSiswa" style="font-weight: 700;">Nama Siswa</label>
                                <select id="idSiswa" v-model="form.siswa_id" class="form-input" :disabled="isEdit">
                                    <option disabled value="">-- Pilih Siswa --</option>
                                    <option v-for="siswa in siswaList" :key="siswa.id" :value="siswa.id">
                                        {{ siswa.nama_siswa }}
                                    </option>
                                </select>

                                <div class="satu-row">
                                    <label for="nominal">Nominal:</label>
                                    <input type="text" v-model="form.nominal" @input="formatNominal" class="form-input" />

                                    <label for="tanggalPembayaran">Tanggal Pembayaran:</label>
                                    <input type="date" v-model="form.tanggal_pembayaran" class="form-input">
                                </div>

                                <label for="buktiPembayaran" style="font-weight: 700;">Bukti Pembayaran:</label>
                                <input type="text" v-model="form.bukti_pembayaran" class="form-input">
                                <div class="satu-row">
                                    <label for="statusPembayaran">Status Pembayaran:</label>
                                    <select v-model="form.status_pembayaran" class="form-input">
                                        <option value="Lunas">Lunas</option>
                                        <option value="Belum Lunas">Belum Lunas</option>
                                    </select>

                                    <label for="statusRapor">Status Rapor:</label>
                                    <select v-model="form.status_rapor" class="form-input">
                                        <option value="Dapat Diterima">Dapat Diterima</option>
                                        <option value="Belum Dapat Diterima">Belum Dapat Diterima</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="custom-modal-footer">
                            <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
                            <button type="submit" class="btn-save">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </div>
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
            rowsPerPage: 5,
            currentPage: 1,
            showModal: false,
            tampilModal: false,
            isEdit: false,
            dropdownIndex: null,
            searchQuery: '',
            selectedFilters: {
                namaSiswa: true,
                namaKelas: true,
                tglPembayaran: true,
                nominal: true,
                buktiPembayaran: true,
                statusPembayaran: true,
                statusRapor: true,
            },
            siswaList: [],
            kelasList: [],
            pembayaranSppList: [],
            firstRowFilters: [{
                    key: "namaSiswa",
                    label: "Nama Siswa"
                },
                {
                    key: "namaKelas",
                    label: "Nama Kelas"
                },
                {
                    key: "tglPembayaran",
                    label: "Tanggal Pembayaran"
                },
                {
                    key: "nominal",
                    label: "Nominal"
                },
                {
                    key: "buktiPembayaran",
                    label: "Bukti Pembayaran"
                },
                {
                    key: "statusPembayaran",
                    label: "Status Pembayaran"
                },
                {
                    key: "statusRapor",
                    label: "Status Rapor"
                }
            ],
            form: {
                siswa_id: '',
                tanggal_pembayaran: '',
                nominal: '',
                bukti_pembayaran: '',
                status_pembayaran: '',
                status_rapor: '',
            },
            newPembayaran: {
                nama_siswa: '',
                tanggal_pembayaran: '',
                nominal: '',
                bukti_pembayaran: '',
                status_pembayaran: '',
                status_rapor: '',
            },
        };
    },
    setup() {
        const pembayaranSppList = ref([]);

        const fetchPembayaranSppList = () => {
            axios
                .get('/pembayaranspp')
                .then((res) => {
                    console.log('Data yang diterima:', res.data);
                    pembayaranSppList.value = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.data);
                });
        };
        onMounted(() => {
            fetchPembayaranSppList();
        });
        return {
            pembayaranSppList,
            fetchPembayaranSppList
        };
    },
    methods: {
        fetchKelasList() {
            axios.get('/kelas')
                .then((res) => {
                    this.kelasList = res.data.data;
                })
                .catch((err) => {
                    console.error("Gagal ambil data kelas", err);
                });
        },

        getNamaKelasBySiswaId(siswaId) {
            const siswa = this.siswaList.find(s => s.id === siswaId);
            if (!siswa) return 'Siswa Tidak Ditemukan';

            const kelas = this.kelasList.find(k => k.id === siswa.kelas_id);
            return kelas ? kelas.nama_kelas : 'Kelas Tidak Ditemukan';
        },
        fetchSiswaList() {
            axios.get('/siswa')
                .then((res) => {
                    this.siswaList = res.data.data;
                })
                .catch((err) => {
                    console.error("Gagal ambil data siswa", err);
                });
        },
        prepareTambahPembayaran() {
            this.isEdit = false;
            this.tampilModal = true;
            this.resetForm();
        },
        resetForm() {
            this.form = {
                siswa_id: '',
                nominal: '',
                tanggal_pembayaran: '',
                bukti_pembayaran: '',
                status_pembayaran: '',
                status_rapor: ''
            };
        },
        prepareEditPembayaran(id) {
            this.isEdit = true;
            this.tampilModal = true;
            this.dropdownIndex = null;

            const pembayaranSpp = this.pembayaranSppList.find(k => k.id === id);
            if (pembayaranSpp) {
                this.form = {
                    id: pembayaranSpp.id,
                    siswa_id: pembayaranSpp.siswa_id || '',
                    tanggal_pembayaran: pembayaranSpp.tanggal_pembayaran || '',
                    nominal: pembayaranSpp.nominal || '',
                    bukti_pembayaran: pembayaranSpp.bukti_pembayaran || '',
                    status_pembayaran: pembayaranSpp.status_pembayaran || '',
                    status_rapor: pembayaranSpp.status_rapor || '',
                };
            }
        },
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        closeModal() {
            this.showModal = false;
            this.tampilModal = false;
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.pembayaranSppList.map((pembayaranSpp, index) => {
                const filteredPembayaranSpp = {
                    No: index + 1
                };
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredPembayaranSpp[key] = pembayaranSpp[key];
                    }
                });
                return filteredPembayaranSpp;
            });
        },
        simpanSpp() {
            const url = this.isEdit ?
                `/pembayaranspp/${this.form.id}` // route update
                :
                '/pembayaranspp'; // route create

            const method = this.isEdit ? 'put' : 'post';

            const payload = {
                tanggal_pembayaran: this.form.tanggal_pembayaran,
                nominal: this.form.nominal,
                bukti_pembayaran: this.form.bukti_pembayaran,
                status_pembayaran: this.form.status_pembayaran,
                status_rapor: this.form.status_rapor,
                siswa_id: this.form.siswa_id,
                ...(this.isEdit ? {} : {
                    nama_siswa: this.form.nama_siswa
                }),
            };

            axios[method](url, payload)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: this.isEdit ? 'Data berhasil diubah' : 'Data berhasil ditambahkan',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.closeModal();
                    this.fetchPembayaranSppList();
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal menyimpan data',
                        text: err.response ?.data ?.message || 'Terjadi kesalahan',
                    });
                });
        },
        deletePembayaranSpp(id) {
            Swal.fire({
                title: 'Apakah kamu yakin?',
                text: 'Data yang dihapus tidak bisa dikembalikan!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`/pembayaranspp/${id}`)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil dihapus',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            this.fetchPembayaranSppList();
                            this.dropdownIndex = null;
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Gagal menghapus data',
                                text: err.response ?.data ?.message || 'Terjadi kesalahan'
                            });
                        });
                }
            });
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID').format(angka);
        }
    },
    mounted() {
        this.fetchSiswaList();
        this.fetchKelasList();
    },
    computed: {
        filteredPembayaranSppList() {
            if (!this.searchQuery) {
                return this.pembayaranSppList;
            }
            const query = this.searchQuery.toLowerCase();

            return this.pembayaranSppList.filter(pembayaranSpp => {
                return Object.keys(pembayaranSpp).some(key => {
                    let value = pembayaranSpp[key];

                    // Cek jika properti siswa.nama_siswa cocok dengan pencarian
                    if (key === "siswa" && pembayaranSpp.siswa ?.nama_siswa) {
                        if (pembayaranSpp.siswa.nama_siswa.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek status pembayaran
                    if (key === "status_pembayaran" && pembayaranSpp.status_pembayaran) {
                        if (pembayaranSpp.status_pembayaran.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek tanggal pembayaran (formatkan ke string)
                    if (key === "tanggal_pembayaran" && pembayaranSpp.tanggal_pembayaran) {
                        if (String(pembayaranSpp.tanggal_pembayaran).toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek nominal pembayaran (konversi ke string agar bisa dicari)
                    if (key === "nominal" && pembayaranSpp.nominal) {
                        if (String(pembayaranSpp.nominal).toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek status rapor
                    if (key === "status_rapor" && pembayaranSpp.status_rapor) {
                        if (pembayaranSpp.status_rapor.toLowerCase().includes(query)) {
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
        paginatedPembayaranSppList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredPembayaranSppList.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.pembayaranSppList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.pembayaranSppList.length);
            return `Showing ${startRow} - ${endRow} of ${this.pembayaranSppList.length} entries`;
        },
    },
};
</script>

<style scoped>
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

/* Modal Filter */
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

.modal-overlay-filter {
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

.modal-content-spp {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    width: 30%;
    max-width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
}

/* Modal Edit Pembayaran */
select[disabled] {
  color: #8a8a8a;
  cursor: not-allowed;
  border-color: #aeafaf;
}

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
    max-width: 600px;
    margin: 0;
    box-shadow: none;
    overflow: hidden;
}

.custom-modal-content {
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-radius: 8px;
    padding: 0px;
    max-height: calc(100vh - 10rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.custom-modal-header {
    background: #ffffff;
    padding: 2rem;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
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
    padding: 2rem;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;
    color: #333;
    padding-top: 0;
}

.form-input {
    color: black;
    width: 100%;
    padding: 10px;
    background-color: white;
    border: 1px solid #636364;
    border-radius: 5px;
    box-sizing: border-box;
}

.form-group-spp>label {
    margin-top: 1rem;
    display: block;
    font-weight: 500;
}

.form-group-spp>input,
.form-group-spp>select {
    margin-top: 5px;
    margin-bottom: 15px;
}

.satu-row {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 10px;
    align-items: center;
}

.custom-modal-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 2rem;
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

.btn-save,
.btn-cancel {
    flex: 1 1 45%;
    min-width: 120px;
}

.btn-save:hover,
.btn-cancel:hover {
    transition: background 0.3s ease, color 0.3s ease;
}

.btn-cancel:hover {
    background: #e4e3e3;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
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

.btn-add-tuition {
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

.btn-add-tuition:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add-tuition i {
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    width: 73rem;
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
