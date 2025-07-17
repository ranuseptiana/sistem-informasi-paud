<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/tuition">Pembayaran</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Cicilan Pembayaran</li>
            </ol>
        </nav>
        <div class="header-button">
            <h4 class="header-text">
            Cicilan Pembayaran - <span class="student-name">{{ namaSiswa }}</span>
            </h4>

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
                        <th scope="col" class="table-head">Cicilan ke-</th>
                        <th scope="col" class="table-head">Tanggal Pembayaran</th>
                        <th scope="col" class="table-head">Nominal Cicilan</th>
                        <th scope="col" class="table-head">Status Verifikasi</th>
                        <th scope="col" class="table-head">Tempat Pembayaran</th>
                        <th scope="col" class="table-head">Keterangan</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cicilan, index) in paginatedCicilanList" :key="cicilan.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td>{{ cicilan.tanggal_cicilan }}</td>
                        <td>{{ Number(cicilan.nominal_cicilan).toLocaleString('id-ID') }}</td>
                        <td>{{ cicilan.status_verifikasi }}</td>
                        <td>{{ cicilan.tempat_tagihan }}</td>
                        <td>{{ cicilan.keterangan}}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="prepareEditCicilan(cicilan.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteCicilan(cicilan.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedCicilanList.length === 0" class="no-data">
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
                        <h5 class="custom-modal-title">{{ isEdit ? 'Edit Data Cicilan' : 'Tambah Data Cicilan' }}</h5>
                        <button type="button" class="close-btn" @click="closeModal">&times;</button>
                    </div>
                    <form @submit.prevent="simpanPembayaran">
                        <div class="custom-modal-body">
                            <div class="form-group-spp">
                                <div class="satu-row">
                                    <label for="tanggal">Tanggal Pembayaran:</label>
                                    <input type="date" v-model="form.tanggal_cicilan" class="form-input">

                                    <label for="nominal">Nominal Pembayaran:</label>
                                    <input type="text" v-model="form.nominal_cicilan" class="form-input" @input="formatNominal"/>

                                    <label for="status">Status Verifikasi:</label>
                                    <select v-model="form.status_verifikasi" class="form-input">
                                        <option value="Disetujui">Disetujui</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Ditolak">Ditolak</option>
                                    </select>

                                    <label for="tempat">Tempat Tagihan:</label>
                                    <input type="text" v-model="form.tempat_tagihan" class="form-input">

                                    <label for="keterangan">Keterangan:</label>
                                    <input type="text" v-model="form.keterangan" class="form-input" />
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
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ref,
    onMounted,
} from 'vue';

import {
    useRoute
} from 'vue-router';

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
            cicilanList: [],
            namaSiswa: '',
            form: {
                pembayaran_id: '',
                tanggal_cicilan: '',
                nominal_cicilan: '',
                status_verifikasi: '',
                tempat_tagihan: '',
                keterangan: '',
            },
        };
    },

    created() {
        const pembayaranId = this.$route.params.id; 
        if (pembayaranId) {
            this.form.pembayaran_id = pembayaranId; 
        }
    },

    setup() {
        const route = useRoute();
        const pembayaranId = route.params.id; 
        const cicilanList = ref([]);
        const namaSiswaRef = ref('');

        const fetchCicilanList = async () => {
            try {
                const res = await axios.get(`/cicilan/pembayaran/${pembayaranId}`);
                ('Data yang diterima:', res.data); 

                cicilanList.value = res.data.data;

                if (res.data.data && res.data.data.length > 0) {
                    namaSiswaRef.value = res.data.data[0].nama_siswa || 'Nama Siswa Tidak Ditemukan';
                }
        
                else if (res.data.siswa_nama) {
                    namaSiswaRef.value = res.data.siswa_nama;
                }
                else {
                    namaSiswaRef.value = 'Data Siswa Tidak Ditemukan'; 
                }

            } catch (error) {
                console.error("Gagal mengambil data cicilan:", error.response?.data || error.message);
                namaSiswaRef.value = 'Gagal Memuat Nama Siswa';
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal memuat data cicilan',
                    text: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data cicilan.',
                });
            }
        };

        onMounted(() => {
            fetchCicilanList();
        });

        return {
            pembayaranId,
            cicilanList,
            fetchCicilanList,
            namaSiswa: namaSiswaRef,
        };
    },
    methods: {
        formatNominal() {
            let num = this.form.nominal_cicilan.replace(/\D/g, '');

            this.form.nominal_cicilan = num ? Number(num).toLocaleString('id-ID') : '';
        },
        getNominalForBackend() {
            return this.form.nominal_cicilan.replace(/\./g, '');
        },
        prepareTambahPembayaran() {
            this.isEdit = false;
            this.tampilModal = true;
            this.resetForm();
            this.form.pembayaran_id = this.pembayaranId;
        },
        resetForm() {
            this.form = {
                tanggal_cicilan: '',
                nominal_cicilan: '',
                status_verifikasi: '',
                tempat_tagihan: '',
                keterangan: '',
            };
        },
        prepareEditCicilan(id) {
            this.isEdit = true;
            this.tampilModal = true;
            this.dropdownIndex = null;

            const cicilan = this.cicilanList.find(k => k.id === id);
            if (cicilan) {
                this.form = {
                    id: cicilan.id,
                    pembayaran_id: cicilan.pembayaran_id,
                    tanggal_cicilan: cicilan.tanggal_cicilan || '',
                    nominal_cicilan: Number(cicilan.nominal_cicilan).toLocaleString('id-ID'),
                    status_verifikasi: cicilan.status_verifikasi || '',
                    tempat_tagihan: cicilan.tempat_tagihan || '',
                    keterangan: cicilan.keterangan || '',
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
        getFilteredData() {
            return this.cicilanList.map((cicilan, index) => {
                const filteredCicilan = {
                    No: index + 1
                };
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredCicilan[key] = cicilan[key];
                    }
                });
                return filteredCicilan;
            });
        },
        simpanPembayaran() {
            const url = this.isEdit ? `/cicilan/${this.form.id}` : '/cicilan';
            const method = this.isEdit ? 'put' : 'post';

            const payload = {
                pembayaran_id: this.form.pembayaran_id,
                status_verifikasi: this.form.status_verifikasi.toLowerCase(),
                tanggal_cicilan: this.form.tanggal_cicilan,
                nominal_cicilan: this.getNominalForBackend(), 
                tempat_tagihan: this.form.tempat_tagihan,
                keterangan: this.form.keterangan,
                admin_id: this.form.admin_id || 1
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
                    this.fetchCicilanList();
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal menyimpan data',
                        text: err.response?.data?.message || 'Terjadi kesalahan',
                    });
                });
        },
        deleteCicilan(id) {
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
                    axios.delete(`/cicilan/${id}`)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil dihapus',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            this.fetchCicilanList();
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
        const id = this.$route.params.id;  
        this.fetchCicilanList(id);
    },
    computed: {
        filteredCicilanList() {
            if (!this.searchQuery) {
                return this.cicilanList;
            }
            const query = this.searchQuery.toLowerCase();

            return this.cicilanList.filter(cicilan => {
                return Object.keys(cicilan).some(key => {
                    let value = cicilan[key];

                    // Cek status verifikasi
                    if (key === "status_verifikasi" && cicilan.status_verifikasi) {
                        if (cicilan.status_verifikasi.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek tanggal pembayaran (formatkan ke string)
                    if (key === "tanggal_pembayaran" && cicilan.tanggal_cicilan) {
                        if (String(cicilan.tanggal_cicilan).toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek nominal pembayaran (konversi ke string agar bisa dicari)
                    if (key === "nominal" && cicilan.nominal_cicilan) {
                        if (String(cicilan.nominal_cicilan).toLowerCase().includes(query)) {
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
        paginatedCicilanList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredCicilanList.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.cicilanList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.cicilanList.length);
            return `Showing ${startRow} - ${endRow} of ${this.cicilanList.length} entries`;
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
    margin-top: 4rem;
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
