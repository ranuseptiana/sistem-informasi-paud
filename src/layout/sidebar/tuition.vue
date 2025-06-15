<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Pembayaran</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Pembayaran</h3>
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
                        <th scope="col" class="table-head">NISN</th>
                        <th scope="col" class="table-head">Nama Siswa</th>
                        <th scope="col" class="table-head">Kelas Siswa</th>
                        <th scope="col" class="table-head">Tahun Ajaran</th>
                        <th scope="col" class="table-head">Jenis Pembayaran</th>
                        <th scope="col" class="table-head">Tanggal Pembayaran</th>
                        <th scope="col" class="table-head">Metode Pembayaran</th>
                        <th scope="col" class="table-head">Nominal Pembayaran</th>
                        <th scope="col" class="table-head">Sisa Pembayaran</th>
                        <th scope="col" class="table-head">Bukti Pembayaran</th>
                        <th scope="col" class="table-head">Status Pembayaran</th>
                        <th scope="col" class="table-head">Status Cicilan</th>
                        <th scope="col" class="table-head">Status Rapor</th>
                        <th scope="col" class="table-head">Status Atribut</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pembayaran, index) in paginatedPembayaranList" :key="pembayaran.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td>{{ pembayaran.siswa?.nisn }}</td>
                        <td>{{ pembayaran.siswa?.nama_siswa }}</td>
                        <td>{{ getNamaKelasBySiswaId(pembayaran.siswa_id) }}</td>
                        <td>{{ getTahunAjaranBySiswaId(pembayaran.siswa_id) }}</td>
                        <td>{{ pembayaran.jenis_pembayaran}}</td>
                        <td>{{ pembayaran.tanggal_pembayaran ? pembayaran.tanggal_pembayaran : 'Tanggal Tidak Ditemukan' }}</td>
                        <td>{{ pembayaran.metode_pembayaran }}</td>
                        <td>{{ pembayaran.nominal ? formatRupiah(pembayaran.nominal) : 'Nominal Belum Ditambahkan' }}</td>
                        <td>{{ pembayaran.sisa_pembayaran ? formatRupiah(pembayaran.sisa_pembayaran) : 'Tidak Ada Sisa Pembayaran' }}</td>
                        <td>
                            <template v-if="pembayaran.bukti_pembayaran_url">
                                <img :src="`http://localhost:8000/storage/${pembayaran.bukti_pembayaran}`"
                                    alt="Bukti Pembayaran"
                                    class="img-thumbnail cursor-pointer"
                                    style="max-width: 80px; max-height: 150px; object-fit: cover;"
                                    @click="openImageModal(`http://localhost:8000/storage/${pembayaran.bukti_pembayaran}`)">
                                </template>
                            <span v-else>Tidak Ada</span>
                        </td>
                        <td>{{ pembayaran.status_pembayaran }}</td>
                        <td>{{ pembayaran.status_cicilan }}</td>
                        <td>{{ pembayaran.status_rapor }}</td>
                        <td>{{ pembayaran.status_atribut }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="cicilanPembayaran(pembayaran.id)" style="color: #274278">Cicilan</button>
                                    <button class="popup-item" @click="prepareEditPembayaran(pembayaran.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deletePembayaran(pembayaran.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedPembayaranList.length === 0" class="no-data">
                        <td colspan="15" class="no-data-cell">
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
                        <h5 class="custom-modal-title">{{ isEdit ? 'Edit Data Pembayaran' : 'Tambah Data Pembayaran' }}</h5>
                        <button type="button" class="close-btn" @click="closeModal">&times;</button>
                    </div>
                    <form @submit.prevent="simpanPembayaran">
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
                                    <input type="text" v-model="displayNominal" @input="formatNominal" class="form-input" placeholder="Masukkan nominal" />

                                    <label for="metodePembayaran">Metode Pembayaran:</label>
                                    <select v-model="form.metode_pembayaran" class="form-input" @change="updateStatusPembayaran">
                                        <option value="full">Cash (Bayar Penuh Tanpa Cicil)</option>
                                        <option value="cicilan">Cicilan</option>
                                    </select>

                                    <label for="jenisPembayaran">Jenis Pembayaran:</label>
                                    <select v-model="form.jenis_pembayaran" class="form-input">
                                        <option value="pendaftaran baru">Pendaftaran Baru</option>
                                        <option value="daftar ulang">Daftar Ulang</option>
                                    </select>

                                    <label for="tanggalPembayaran">Tanggal Pembayaran:</label>
                                    <input type="date" v-model="form.tanggal_pembayaran" class="form-input">
                                </div>

                                <!-- <label for="buktiPembayaran" style="font-weight: 700;">Bukti Pembayaran:</label>
                                <input type="file" class="form-input"> -->

                                <div class="form-group">
                                <label for="bukti_pembayaran">Bukti Pembayaran (Gambar):</label>
                                <input type="file" id="bukti_pembayaran" @change="handleFileUpload" class="form-control-file">
                                <span v-if="errors && errors.bukti_pembayaran" class="text-danger">{{ errors.bukti_pembayaran[0] }}</span>
                            </div>

                                <div class="satu-row">
                                    <label for="statusPembayaran">Status Pembayaran:</label>
                                    <input type="text" class="form-input" :value="form.metode_pembayaran === 'full' ? 'Lunas' : 'Belum Lunas'" readonly :disabled="isEdit" />

                                    <label for="statusCicilan">Status Cicilan:</label>
                                    <input type="text" class="form-input" :value="form.metode_pembayaran === 'full' ? 'Lunas' : 'Belum Lunas'" readonly :disabled="isEdit" />

                                    <label for="statusRapor">Status Rapor:</label>
                                    <select v-model="form.status_rapor" class="form-input">
                                        <option value="Dapat Diterima">Dapat Diterima</option>
                                        <option value="Belum Dapat Diterima">Belum Dapat Diterima</option>
                                    </select>

                                    <label for="statusAtribut">Status Atribut:</label>
                                    <select v-model="form.status_atribut" class="form-input">
                                        <option value="Sudah Diterima">Sudah Diterima</option>
                                        <option value="Belum Diterima">Belum Diterima</option>
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
<div v-if="showImageModal"
     class="image-modal-backdrop"
     @click="handleClickOutside">
    <div class="image-modal-content">
        <button class="image-modal-close" @click="closeImageModal">&times;</button>
        <img :src="currentImageUrl" alt="Bukti Pembayaran Full" class="full-image">
    </div>
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
            siswaList: [],
            kelasList: [],
            tahunAjaranList: [],
            form: {
                id: null,
                siswa_id: '',
                tanggal_pembayaran: '',
                jenis_pembayaran: '',
                nominal: '',
                metode_pembayaran: '',
                isCicilan: false,
                bukti_pembayaran: null,
                bukti_pembayaran_url: null,
                status_pembayaran: '',
                status_cicilan: '',
                status_rapor: '',
                status_atribut: '',
            },
            displayNominal: '',
            fileNameBuktiPembayaran: '',
            showImageModal: false, // Tambahkan ini
            currentImageUrl: '',
            errors: {},
        };
    },
    setup() {
        const pembayaranList = ref([]);

        const fetchPembayaranList = () => {
            axios
                .get('/pembayaran')
                .then((res) => {
                    pembayaranList.value = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.data);
                });
        };
        onMounted(() => {
            fetchPembayaranList();
        });
        return {
            pembayaranList,
            fetchPembayaranList
        };
    },
    methods: {
        cicilanPembayaran(id) {
            this.$router.push(`/adminmainsidebar/cicilan/${id}`);
        },

        formatNominal(event) {
            let inputValue = event.target.value;
            let numericValue = inputValue.replace(/[^\d]/g, '');

            if (numericValue.length > 9) {
                numericValue = numericValue.slice(0, 9);
            }

            this.form.nominal = numericValue;

            this.displayNominal = numericValue ?
                new Intl.NumberFormat('id-ID').format(parseInt(numericValue)) :
                '';

            event.target.value = this.displayNominal;
        },

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

        fetchTahunAjaranList() {
            axios.get('/tahunajaran')
                .then((res) => {
                    this.tahunAjaranList = res.data;
                })
                .catch((err) => {
                    console.error("Gagal ambil data tahun ajaran", err);
                });
        },

        getTahunAjaranBySiswaId(siswaId) {
            if (!this.siswaList || !this.siswaList) {
                return 'Data siswa belum dimuat';
            }

            const siswa = this.siswaList.find(s => s.id === siswaId);
            if (!siswa) return 'Siswa Tidak Ditemukan';

            if (!this.tahunAjaranList || !Array.isArray(this.tahunAjaranList)) {
                return 'Data tahun ajaran belum dimuat';
            }

            const tahunajaran = this.tahunAjaranList.find(k => k.id === siswa.tahun_ajaran_id);
            return tahunajaran ? tahunajaran.tahun : 'Tahun Ajaran Tidak Ditemukan';
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
                jenis_pembayaran: '',
                tanggal_pembayaran: '',
                metode_pembayaran: '',
                bukti_pembayaran: null, // Reset ke null untuk file
                bukti_pembayaran_url: null, 
                status_pembayaran: '',
                status_cicilan: '',
                status_rapor: '',
                status_atribut: ''
            };
            this.errors = {}; // Reset errors
            // Reset input file HTML secara manual
            const fileInput = document.getElementById('bukti_pembayaran');
            if (fileInput) {
                fileInput.value = '';
            }
        },

        updateStatusPembayaran() {
            if (this.form.metode_pembayaran === 'full') {
                this.form.status_pembayaran = 'Lunas';
                this.form.status_cicilan = 'Lunas';
            } else {
                this.form.status_pembayaran = 'Belum Lunas';
                this.form.status_cicilan = 'Belum Lunas';
            }
        },

        prepareEditPembayaran(id) {
            axios.get(`/pembayaran/${id}`)
                .then((res) => {
                    const pembayaran = res.data.data;

                    this.displayNominal = pembayaran.nominal ?
                        parseInt(pembayaran.nominal).toLocaleString('id-ID') :
                        '';

                    this.form = {
                        id: pembayaran.id,
                        siswa_id: pembayaran.siswa_id,
                        tanggal_pembayaran: pembayaran.tanggal_pembayaran || '',
                        jenis_pembayaran: pembayaran.jenis_pembayaran || 'pendaftaran baru',
                        nominal: pembayaran.nominal ? pembayaran.nominal.toString() : '', // <-- Ambil langsung dari pembayaran.nominal
                        metode_pembayaran: pembayaran.metode_pembayaran || 'full',
                        bukti_pembayaran: null, // Penting: Set null untuk file baru, biarkan yang lama di backend
                        bukti_pembayaran_url: pembayaran.bukti_pembayaran_url,
                        status_pembayaran: pembayaran.status_pembayaran || 'Belum Lunas',
                        status_cicilan: pembayaran.status_cicilan || 'Belum Lunas',
                        status_rapor: pembayaran.status_rapor || 'Dapat Diterima',
                        status_atribut: pembayaran.status_atribut || 'Sudah Diterima',
                    };

                    this.isEdit = true;
                    this.tampilModal = true;
                    this.errors = {}; 
                    const fileInput = document.getElementById('bukti_pembayaran');
                if (fileInput) {
                    fileInput.value = '';
                }
                })
                .catch((err) => {
                    console.error("Gagal mengambil data pembayaran", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal memuat data',
                        text: err.response ?.data ?.message || 'Terjadi kesalahan saat memuat data pembayaran',
                    });
                });
        },
        async simpanPembayaran() {
    this.errors = {}; // Reset errors sebelum submit

    // Konversi nominal dari format tampilan ke format database
    const nominalValue = this.displayNominal 
        ? parseInt(this.displayNominal.replace(/\./g, '')) 
        : 0;

    // Siapkan FormData
    const formData = new FormData();
    formData.append('siswa_id', this.form.siswa_id);
    formData.append('tanggal_pembayaran', this.form.tanggal_pembayaran);
    formData.append('jenis_pembayaran', this.form.jenis_pembayaran);
    formData.append('nominal', nominalValue);
    formData.append('metode_pembayaran', this.form.metode_pembayaran);
    formData.append('status_rapor', this.form.status_rapor);
    formData.append('status_atribut', this.form.status_atribut);
    formData.append('status_pembayaran', this.form.status_pembayaran);

    console.log('Respon API:', formData);
    // Handle file upload
    if (this.form.bukti_pembayaran instanceof File) {
        formData.append('bukti_pembayaran', this.form.bukti_pembayaran);
    } else if (this.isEdit && !this.form.bukti_pembayaran_url) {
        // Jika mode edit dan tidak ada file lama, kirim string kosong
        formData.append('bukti_pembayaran', '');
    }

    try {
        let res;
        if (this.isEdit) {
            formData.append('_method', 'PUT');
            res = await axios.post(`/pembayaran/${this.form.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            res = await axios.post('/pembayaran', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        Swal.fire({
            icon: 'success',
            title: this.isEdit ? 'Data berhasil diubah' : 'Data berhasil ditambahkan',
            timer: 1500,
            showConfirmButton: false
        });

        this.closeModal();
        this.fetchPembayaranList();

        if (this.form.metode_pembayaran === 'cicilan') {
            this.$router.push(`/adminmainsidebar/cicilan/${res.data.data.id}`);
        }
    } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 422) {
            this.errors = err.response.data.errors;
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                text: 'Silakan periksa kembali input Anda.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal menyimpan data',
                text: err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data',
            });
        }
    }
},
        deletePembayaran(id) {
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
                    axios.delete(`/pembayaran/${id}`)
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Berhasil dihapus',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            this.fetchPembayaranList();
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
        },
        handleFileUpload(event) {
            // Mengambil file pertama yang dipilih
            this.form.bukti_pembayaran = event.target.files[0];
            // Clear URL bukti pembayaran yang lama jika ada file baru diupload
            if (this.form.bukti_pembayaran) {
                this.form.bukti_pembayaran_url = null;
            }
        },
        removeBuktiPembayaran() {
            // Ini akan menandakan bahwa bukti pembayaran harus dihapus di backend
            this.form.bukti_pembayaran = null;
            this.form.bukti_pembayaran_url = null; // Hapus tampilan URL di frontend
            // Juga reset input file
            const fileInput = document.getElementById('bukti_pembayaran');
            if (fileInput) {
                fileInput.value = '';
            }
        },
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        closeModal() {
            this.showModal = false;
            this.tampilModal = false;
            this.dropdownIndex = null; // Tutup dropdown jika ada
            this.errors = {}; 
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.pembayaranList.map((pembayaran, index) => {
                const filteredPembayaran = {
                    No: index + 1
                };
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredPembayaran[key] = pembayaran[key];
                    }
                });
                return filteredPembayaran;
            });
        },
        openImageModal(url) {
            this.currentImageUrl = url;
            this.showImageModal = true;
            // Opsional: Disable body scroll saat modal terbuka
            document.body.style.overflow = 'hidden';
        },
        closeImageModal() {
            this.showImageModal = false;
            this.currentImageUrl = ''; // Opsional: Bersihkan URL setelah ditutup
            // Opsional: Enable body scroll kembali
            document.body.style.overflow = '';
        },
        handleClickOutside(event) {
            // Cek jika klik berada di luar modal content tapi di dalam modal backdrop
            if (event.target.classList.contains('image-modal-backdrop')) {
                this.closeImageModal();
            }
        },
    },
    mounted() {
        this.fetchSiswaList();
        this.fetchKelasList();
        this.fetchTahunAjaranList();
    },
    computed: {
        filteredPembayaranList() {
            if (!this.searchQuery) {
                return this.pembayaranList;
            }
            const query = this.searchQuery.toLowerCase();

            return this.pembayaranList.filter(pembayaran => {
                return Object.keys(pembayaran).some(key => {
                    let value = pembayaran[key];

                    // Cek jika properti siswa.nama_siswa cocok dengan pencarian
                    if (key === "siswa" && pembayaran.siswa ?.nama_siswa) {
                        if (pembayaran.siswa.nama_siswa.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek status pembayaran
                    if (key === "status_pembayaran" && pembayaran.status_pembayaran) {
                        if (pembayaran.status_pembayaran.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek tanggal pembayaran (formatkan ke string)
                    if (key === "tanggal_pembayaran" && pembayaran.tanggal_pembayaran) {
                        if (String(pembayaran.tanggal_pembayaran).toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek nominal pembayaran (konversi ke string agar bisa dicari)
                    if (key === "nominal" && pembayaran.nominal) {
                        if (String(pembayaran.nominal).toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek status rapor
                    if (key === "status_rapor" && pembayaran.status_rapor) {
                        if (pembayaran.status_rapor.toLowerCase().includes(query)) {
                            return true;
                        }
                    }

                    // Cek status atribut
                    if (key === "status_atribut" && pembayaran.status_atribut) {
                        if (pembayaran.status_atribut.toLowerCase().includes(query)) {
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
        paginatedPembayaranList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredPembayaranList.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.pembayaranList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.pembayaranList.length);
            return `Showing ${startRow} - ${endRow} of ${this.pembayaranList.length} entries`;
        },
    },
};
</script>

<style scoped>
.readonly {
    color: #636364;
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
    left: 77rem;
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

.image-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Latar belakang gelap transparan */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Pastikan di atas elemen lain */
    overflow: auto; /* Agar bisa scroll jika gambar terlalu besar */
}

.image-modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 90vw; /* Lebar maksimal modal */
    max-height: 90vh; /* Tinggi maksimal modal */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Sedikit lebih gelap */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2.5em; /* Ukuran lebih besar */
    color: #fff; /* Warna putih agar terlihat di backdrop gelap */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5); /* Shadow agar lebih jelas */
    cursor: pointer;
    z-index: 10;
}

.image-modal-close:hover {
    color: #ff0000; /* Merah saat hover */
}

.full-image {
    max-width: 100%; /* Agar gambar tidak melebihi lebar modal */
    max-height: calc(90vh - 40px); /* Kurangi tinggi untuk padding/tombol close */
    object-fit: contain; /* Agar gambar tidak terpotong, menyesuaikan diri dalam batas */
    display: block;
}

/* Optional: Menambahkan sedikit efek transisi saat modal muncul/hilang */
.image-modal-backdrop.v-enter-active, .image-modal-backdrop.v-leave-active {
  transition: opacity 0.3s ease;
}
.image-modal-backdrop.v-enter-from, .image-modal-backdrop.v-leave-to {
  opacity: 0;
}

.img-thumbnail.cursor-pointer {
    cursor: pointer;
}
</style>
