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
            <button class="btn-add-payment" @click="prepareTambahPembayaran">Tambah Data
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
                        <!-- Filter Modal -->
                        <div v-if="showModal" class="modal-overlay modal-overlay-filter" @click.self="showModal = false">
                            <div class="modal-content-spp">
                                <div class="modal-header">
                                    <h5 class="modal-title">Filter Data Pembayaran</h5>
                                    <button type="button" class="close-btn" @click="showModal = false">&times;</button>
                                </div>
                                <hr>
                                <div class="filter-form">
                                    <!-- Tahun Ajaran -->
                                    
                                    <!-- Status Cicilan -->
                                    <div class="form-group">
                                        <label>Status Cicilan</label>
                                        <select v-model="filter.status_cicilan" class="form-input">
                                            <option value="" disabled>Semua</option>
                                            <option value="Lunas">Lunas</option>
                                            <option value="Belum Lunas">Belum Lunas</option>
                                        </select>
                                    </div>

                                    <!-- Kelas -->
                                    <div class="form-group">
                                        <label>Kelas</label>
                                        <input type="text" class="form-input" :value="selectedKelasLabel" placeholder="Tap untuk memilih kelas" readonly @click="showKelasModal = true" />
                                    </div>

                                    <!-- Modal Pilih Kelas -->
                                    <div v-if="showKelasModal" class="modal-overlay" @click.self="showKelasModal = false">
                                        <div class="modal-content-kelas">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Pilih Kelas</h5>
                                                <button type="button" class="close-btn" @click="showKelasModal = false">&times;</button>
                                            </div>
                                            <hr />
                                            <div class="kelas-list">
                                                <div class="kelas-item" v-for="kelas in kelasList" :key="kelas.id">
                                                    <input type="checkbox" :id="'kelas-' + kelas.id" :value="kelas.id" v-model="filter.kelas_ids" />
                                                    <label :for="'kelas-' + kelas.id">{{ kelas.nama_kelas }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Metode Pembayaran -->
                                    <div class="form-group">
                                        <label>Metode Pembayaran</label>
                                        <select v-model="filter.metode_pembayaran" class="form-input">
                                            <option value="" disabled>Semua</option>
                                            <option value="full">Cash (Bayar Penuh)</option>
                                            <option value="cicilan">Cicilan</option>
                                        </select>
                                    </div>

                                    <!-- Status Pembayaran -->
                                    <div class="form-group">
                                        <label>Status Pembayaran</label>
                                        <select v-model="filter.status_pembayaran" class="form-input">
                                            <option value="" disabled>Semua</option>
                                            <option value="Lunas">Lunas</option>
                                            <option value="Belum Lunas">Belum Lunas</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label>Filter Tahun Ajaran (Rentang)</label>
                                        <div class="tahun-ajaran-dropdown">
                                            <select v-model="tahunAwal">
                                                <option value="">Pilih Tahun Awal</option>
                                                <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.tahun.split('/')[0]">
                                                    {{ tahun.tahun }}
                                                </option>
                                            </select>
                                            <span>-</span>
                                            <select v-model="tahunAkhir">
                                                <option value="">Pilih Tahun Akhir</option>
                                                <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.tahun.split('/')[1]">
                                                    {{ tahun.tahun }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-danger" @click="resetFilter">Reset</button>
                                    <button class="btn btn-primary" @click="applyFilters()">Terapkan</button>
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
                        <td>{{ pembayaran.jenis_pembayaran }}</td>
                        <td>{{ pembayaran.tanggal_pembayaran ? pembayaran.tanggal_pembayaran : 'Tanggal Tidak Ditemukan' }}</td>
                        <td>{{ pembayaran.metode_pembayaran }}</td>
                        <td>{{ pembayaran.nominal ? formatRupiah(pembayaran.nominal) : 'Nominal Belum Ditambahkan'
                                }}</td>
                        <td>{{ pembayaran.sisa_pembayaran ? formatRupiah(pembayaran.sisa_pembayaran) : 'Tidak Ada Sisa Pembayaran' }}</td>
                        <td>
                            <template v-if="pembayaran.bukti_pembayaran">
                                <img 
                                    :src="getBuktiUrl(pembayaran.bukti_pembayaran)" 
                                    alt="Bukti Pembayaran" 
                                    class="img-thumbnail cursor-pointer" 
                                    style="max-width: 80px; max-height: 150px; object-fit: cover;" 
                                    @click="openImageModal(getBuktiUrl(pembayaran.bukti_pembayaran))"
                                >
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
                                <div class="popup-menu-pembayaran" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
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
                        <h5 class="custom-modal-title">{{ isEdit ? 'Edit Data Pembayaran' : 'Tambah Data Pembayaran'
                                }}</h5>
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
                                <span v-if="errors.siswa_id" class="text-danger">{{ errors.siswa_id[0] }}</span>

                                <div class="satu-row">
                                    <label for="nominal">Nominal:</label>
                                    <input type="text" v-model="displayNominal" @input="formatNominal" class="form-input" placeholder="Masukkan nominal" />
                                    <span v-if="errors.nominal" class="text-danger">{{ errors.nominal[0] }}</span>

                                    <label for="metodePembayaran">Metode Pembayaran:</label>
                                    <select v-model="form.metode_pembayaran" class="form-input" @change="updateStatusPembayaran">
                                        <option disabled value="">-- Pilih Metode Pembayaran --</option>
                                        <option value="full">Cash (Bayar Penuh Tanpa Cicil)</option>
                                        <option value="cicilan">Cicilan</option>
                                    </select>
                                    <span v-if="errors.metode_pembayaran" class="text-danger">{{
                                            errors.metode_pembayaran[0]
                                            }}</span>

                                    <label for="jenisPembayaran">Jenis Pembayaran:</label>
                                    <select v-model="form.jenis_pembayaran" class="form-input">
                                        <option disabled value="">-- Pilih Jenis Pembayaran --</option>
                                        <option value="pendaftaran baru">Pendaftaran Baru</option>
                                        <option value="daftar ulang">Daftar Ulang</option>
                                    </select>
                                    <span v-if="errors.jenis_pembayaran" class="text-danger">{{
                                            errors.jenis_pembayaran[0]
                                            }}</span>

                                    <label for="tanggalPembayaran">Tanggal Pembayaran:</label>
                                    <input type="date" v-model="form.tanggal_pembayaran" class="form-input">
                                    <span v-if="errors.tanggal_pembayaran" class="text-danger">{{
                                            errors.tanggal_pembayaran[0]
                                            }}</span>
                                </div>

                                <div class="form-group">
                                    <label for="bukti_pembayaran">Bukti Pembayaran (Gambar):</label>
                                    <input type="file" id="bukti_pembayaran" @change="handleFileUpload" class="form-control-file">
                                    <span v-if="errors.bukti_pembayaran" class="text-danger">{{
                                            errors.bukti_pembayaran[0]
                                            }}</span>
                                    <div v-if="isEdit && form.bukti_pembayaran_url && !form.bukti_pembayaran" class="mt-2">
                                        <p>Bukti pembayaran saat ini:</p>
                                        <img :src="getBuktiUrl(form.bukti_pembayaran_url)" alt="Bukti Pembayaran Lama" style="max-width: 150px; height: auto;">
                                        <button type="button" class="btn btn-sm btn-outline-danger mt-1" @click="removeBuktiPembayaran">Hapus Bukti</button>
                                    </div>
                                </div>

                                <div class="satu-row">
                                    <label for="statusPembayaran">Status Pembayaran:</label>
                                    <input type="text" class="form-input" :value="form.status_pembayaran || '-- Status --'" readonly disabled />
                                    <span v-if="errors.status_pembayaran" class="text-danger">{{
                                            errors.status_pembayaran[0]
                                            }}</span>

                                    <label for="statusCicilan">Status Cicilan:</label>
                                    <input type="text" class="form-input" :value="form.status_cicilan || '-- Status --'" readonly disabled />
                                    <span v-if="errors.status_cicilan" class="text-danger">{{
                                            errors.status_cicilan[0] }}</span>

                                    <label for="statusRapor">Status Penerimaan Rapor:</label>
                                    <select v-model="form.status_rapor" class="form-input">
                                        <option disabled value="">-- Status --</option>
                                        <option value="Dapat Diterima">Dapat Diterima</option>
                                        <option value="Belum Dapat Diterima">Belum Dapat Diterima</option>
                                    </select>
                                    <span v-if="errors.status_rapor" class="text-danger">{{ errors.status_rapor[0]
                                            }}</span>

                                    <label for="statusAtribut">Status Penerimaan Atribut:</label>
                                    <select v-model="form.status_atribut" class="form-input">
                                        <option disabled value="">-- Status --</option>
                                        <option value="Sudah Diterima">Sudah Diterima</option>
                                        <option value="Belum Diterima">Belum Diterima</option>
                                    </select>
                                    <span v-if="errors.status_atribut" class="text-danger">{{
                                            errors.status_atribut[0] }}</span>
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
<div v-if="showImageModal" class="image-modal-backdrop" @click="handleClickOutside">
    <div class="image-modal-content">
        <button class="image-modal-close" @click="closeImageModal">&times;</button>
        <img :src="currentImageUrl" alt="Bukti Pembayaran Full" class="full-image">
    </div>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';

const paramsSerializer = params => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(`${key}[]`, v));
        } else if (value !== undefined && value !== null) {
            searchParams.append(key, value);
        }
    }
    return searchParams.toString();
}

export default {
    data() {
        return {
            isFilterActive: false,
            rowsPerPage: 5,
            currentPage: 1,
            showModal: false,
            showKelasModal: false,
            tampilModal: false,
            isEdit: false,
            dropdownIndex: null,
            searchQuery: '',
            siswaList: [],
            tahunAwal: '',
            tahunAkhir: '',
            pembayaranList: [],
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
            filter: {
                kelas_ids: [],
                metode_pembayaran: '',
                status_pembayaran: '',
                status_cicilan: ''
            },
            displayNominal: '',
            fileNameBuktiPembayaran: '',
            showImageModal: false,
            currentImageUrl: '',
            errors: {},
        };
    },
    methods: {
        cicilanPembayaran(id) {
            this.$router.push(`/adminmainsidebar/cicilan/${id}`);
        },
        getBuktiUrl(path) {
            if (!path) return '/src/assets/images/placeholder.png';
            
            // Jika path sudah URL lengkap (dari Supabase)
            if (path.startsWith("http")) return path;
            
            // Jika path relatif (format lama)
            return `${import.meta.env.VITE_API_URL}/storage/v1/object/public/${path}`;
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
        },

        async fetchPembayaranList(params = {}) {
            try {
                Object.keys(params).forEach(key => {
                    if (params[key] === null || params[key] === '') delete params[key];
                });

                const response = await axios.get('/pembayaran', {
                    params
                });
                this.pembayaranList = response.data.data || response.data;
            } catch (error) {
                console.error('Error fetching pembayaran:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal memuat data',
                    text: error.response ?.data ?.message || 'Terjadi kesalahan saat memuat data pembayaran'
                });
            }
        },
        mapFrontendToBackendKey(frontendKey) {
            const mapping = {
                nisn: 'nisn',
                nama: 'nama_siswa',
                rombel: 'kelas_nama',
                tahunAjar: 'tahun_ajaran_id'
            };

            return mapping[frontendKey] || frontendKey;
        },
        getColumnLabel(key) {
            const allFilters = [...this.firstRowFilters, ...this.secondRowFilters];
            const filter = allFilters.find(f => f.key === key);

            const specialLabels = {
                rombel: 'Kelas Saat Ini',
                nama: 'Nama Lengkap'
            };

            return specialLabels[key] || (filter ? filter.label : key);
        },
        applyFilters() {
            this.isFilterActive = false;

            const hasYearFilter = this.tahunAwal && this.tahunAkhir;
            const hasClassFilter = this.filter.kelas_ids && this.filter.kelas_ids.length > 0;
            const hasPaymentMethodFilter = this.filter.metode_pembayaran && this.filter.metode_pembayaran.trim() !== '';
            const hasPaymentStatusFilter = this.filter.status_pembayaran && this.filter.status_pembayaran.trim() !== '';
            const hasInstallmentStatusFilter = this.filter.status_cicilan && this.filter.status_cicilan.trim() !== '';

            if (!hasYearFilter && !hasClassFilter && !hasPaymentMethodFilter && !hasPaymentStatusFilter && !hasInstallmentStatusFilter) {
                this.showModal = false;
                this.showKelasModal = false;
                return;
            }

            if (hasYearFilter) {
                const tahunAwal = parseInt(this.tahunAwal);
                const tahunAkhir = parseInt(this.tahunAkhir);

                if (isNaN(tahunAwal) || isNaN(tahunAkhir)) {
                    alert('Format tahun tidak valid');
                    return;
                }

                if (tahunAwal > tahunAkhir) {
                    alert('Tahun awal tidak boleh lebih besar dari tahun akhir');
                    return;
                }
            }

            if (hasYearFilter) {
                const uniqueYears = [...new Set(this.pembayaranList.map(p => this.getTahunAjaranBySiswaId(p.siswa_id)))];

                this.pembayaranList.forEach((pembayaran, index) => {
                    const tahunAjaran = this.getTahunAjaranBySiswaId(pembayaran.siswa_id);
                });
            }

            this.isFilterActive = true;
            this.showModal = false;
            this.showKelasModal = false;

            this.$nextTick(() => {
                const filteredData = this.filteredPembayaranList;
            });
        },

        resetFilter() {
            this.filter = {
                kelas_ids: [],
                metode_pembayaran: '',
                status_pembayaran: '',
                status_cicilan: ''
            };

            this.tahunAwal = '';
            this.tahunAkhir = '';

            this.isFilterActive = false;
            this.showModal = true;
            this.showKelasModal = false;
        },
        async exportData(type) {
            try {
                this.exportLoading = true;

                const endpoint = '/pembayaran/export';

                const params = {
                    kelas_ids: this.filter.kelas_ids ?.length ? this.filter.kelas_ids : undefined,
                    metode_pembayaran: this.filter.metode_pembayaran || undefined,
                    status_pembayaran: this.filter.status_pembayaran || undefined,
                    status_cicilan: this.filter.status_cicilan || undefined,
                    tahun_awal: this.filter.tahun_ajaran_dari || undefined,
                    tahun_akhir: this.filter.tahun_ajaran_sampai || undefined
                };

                Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

                const response = await axios.get(endpoint, {
                    params
                });

                if (!response.data ?.data ?.length) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Data Kosong',
                        text: 'Tidak ada data pembayaran dengan filter saat ini'
                    });
                    return;
                }

                if (type === 'pdf') {
                    await this.exportToPDF(response.data.data);
                } else {
                    await this.exportToExcel(response.data.data);
                }

                Swal.fire('Sukses', 'Data berhasil diekspor', 'success');

            } catch (error) {
                console.error('Export error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengekspor',
                    text: error.response ?.data ?.message || 'Terjadi kesalahan saat mengekspor data'
                });
            } finally {
                this.exportLoading = false;
            }
        },
        async exportToPDF(data) {
            try {
                const {
                    jsPDF
                } = await import('jspdf');
                await import('jspdf-autotable');

                if (!data || data.length === 0) {
                    throw new Error('Tidak ada data untuk diekspor');
                }
               
                const allColumns = [
                    'nisn', 'nama_siswa', 'kelas_nama', 'tahun_ajaran',
                    'tanggal_bayar', 'jenis_pembayaran', 'metode_pembayaran',
                    'status_pembayaran', 'status_cicilan', 'status_rapor',
                    'status_atribut', 'nominal', 'total_cicilan', 'sisa_pembayaran',
                    'bukti_pembayaran_url'
                ];

                const headerMapping = {
                    'nisn': 'NISN',
                    'nama_siswa': 'Nama Siswa',
                    'kelas_nama': 'Kelas',
                    'tahun_ajaran': 'Tahun Ajaran',
                    'tanggal_bayar': 'Tanggal Bayar',
                    'jenis_pembayaran': 'Jenis Pembayaran',
                    'metode_pembayaran': 'Metode Pembayaran',
                    'status_pembayaran': 'Status Pembayaran',
                    'status_cicilan': 'Status Cicilan',
                    'status_rapor': 'Status Rapor',
                    'status_atribut': 'Status Atribut',
                    'nominal': 'Nominal (Rp)',
                    'total_cicilan': 'Total Cicilan (Rp)',
                    'sisa_pembayaran': 'Sisa Pembayaran (Rp)',
                };

                const formatRupiah = (value) => {
                    if (typeof value !== 'number') return value;
                    return new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                    }).format(value).replace('Rp', 'Rp ');
                };

                const processedData = data.map((item, index) => {
                    const row = {
                        no: index + 1
                    };

                    allColumns.forEach(col => {
                        if (col.includes('nominal') || col.includes('cicilan') || col.includes('sisa')) {
                            row[col] = formatRupiah(item[col] || 0);
                        } else if (col === 'tanggal_bayar') {
                            row[col] = item[col] ? new Date(item[col]).toLocaleDateString('id-ID') : '-';
                        } else {
                            row[col] = item[col] || '-';
                        }
                    });

                    return row;
                });

                const doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'mm'
                });

                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('LAPORAN PEMBAYARAN SPP LENGKAP', doc.internal.pageSize.width / 2, 15, {
                    align: 'center'
                });

                const date = new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                doc.setFontSize(10);
                doc.text(`Dicetak pada: ${date}`, 14, 25);

                const headers = ['No', ...allColumns.map(col => headerMapping[col])];
                const body = processedData.map(row => [row.no, ...allColumns.map(col => row[col])]);

                doc.autoTable({
                    head: [headers],
                    body: body,
                    startY: 30,
                    margin: {
                        left: 5,
                        right: 5
                    },
                    styles: {
                        fontSize: 7,
                        cellPadding: 2,
                        overflow: 'linebreak',
                        minCellHeight: 5
                    },
                    headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold',
                        fontSize: 8
                    },
                    columnStyles: {
                        0: {
                            cellWidth: 8
                        }, 
                        1: {
                            cellWidth: 15
                        }, 
                        2: {
                            cellWidth: 25
                        },
                        3: {
                            cellWidth: 15
                        }, 
                        4: {
                            cellWidth: 18
                        },
                        5: {
                            cellWidth: 18
                        }, 
                        6: {
                            cellWidth: 18
                        },
                        7: {
                            cellWidth: 18
                        }, 
                        8: {
                            cellWidth: 18
                        }, 
                        9: {
                            cellWidth: 18
                        }, 
                        10: {
                            cellWidth: 18
                        }, 
                        11: {
                            cellWidth: 18
                        }, 
                        12: {
                            cellWidth: 20
                        }, 
                        13: {
                            cellWidth: 20
                        }, 
                        14: {
                            cellWidth: 20
                        }, 
                    },
                    didDrawPage: (data) => {
                        const pageCount = doc.internal.getNumberOfPages();
                        doc.setFontSize(8);
                        doc.text(
                            `Halaman ${data.pageNumber} dari ${pageCount}`,
                            doc.internal.pageSize.width / 2,
                            doc.internal.pageSize.height - 10, {
                                align: 'center'
                            }
                        );
                    }
                });

                const fileName = `Laporan Pembayaran${new Date().toISOString().slice(0, 10)}.pdf`;
                doc.save(fileName);

            } catch (error) {
                console.error('PDF Export Error:', error);
                this.$notify({
                    title: 'Gagal Export PDF',
                    text: error.message || 'Terjadi kesalahan saat mengekspor PDF',
                    type: 'error'
                });
                throw error;
            }
        },
        async exportToExcel(data) {
            try {
                const XLSX = await import('xlsx');

                const excelData = data.map((item, index) => ({
                    'No': index + 1,
                    'NISN': item.nisn || '-',
                    'Nama Siswa': item.nama_siswa || '-',
                    'Kelas': item.kelas_nama || '-',
                    'Tahun Ajaran': item.tahun_ajaran || '-',
                    'Tanggal Pembayaran': item.tanggal_bayar || '-',
                    'Jenis Pembayaran': item.jenis_pembayaran || '-',
                    'Metode Pembayaran': item.metode_pembayaran || '-',
                    'Nominal (Rp)': item.nominal?.toLocaleString('id-ID') || '-',
                    'Total Cicilan (Rp)': item.total_cicilan?.toLocaleString('id-ID') || '-',
                    'Sisa Pembayaran (Rp)': item.sisa_pembayaran?.toLocaleString('id-ID') || '-',
                    'Status Cicilan': item.status_cicilan || '-',
                    'Status Pembayaran': item.status_pembayaran || '-',
                    'Status Rapor': item.status_rapor || '-',
                    'Status Atribut': item.status_atribut || '-',
                }));

                const worksheet = XLSX.utils.json_to_sheet(excelData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Pembayaran');

                // Optional: Set column width
                worksheet['!cols'] = Object.keys(excelData[0]).map(() => ({ wch: 25 }));

                XLSX.writeFile(workbook, `Data_Pembayaran_SPP_${new Date().toISOString().slice(0, 10)}.xlsx`);

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil diekspor ke Excel!',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error('Error saat ekspor Excel:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengekspor Excel',
                    text: 'Terjadi kesalahan saat membuat file Excel.'
                });
            }
        },

        getStatusCicilan(cicilan) {
            if (!cicilan || cicilan.length === 0) return 'Lunas';
            const paid = cicilan.filter(c => c.status === 'lunas').length;
            return `${paid}/${cicilan.length} Cicilan`;
        },

        getFilterInfo() {
            const info = [];

            if (this.tahunAwal && this.tahunAkhir) {
                if (this.tahunAwal === this.tahunAkhir) {
                    info.push(`Tahun Ajaran: ${this.tahunAwal}/${parseInt(this.tahunAwal) + 1}`);
                } else {
                    info.push(`Tahun Ajaran: ${this.tahunAwal} - ${this.tahunAkhir}`);
                }
            }

            if (this.filter.kelas_ids.length) {
                const kelasNames = this.filter.kelas_ids.map(id => {
                    const k = this.kelasList.find(k => k.id === id);
                    return k ? k.nama_kelas : '';
                }).filter(name => name);

                if (kelasNames.length) {
                    if (kelasNames.length <= 3) {
                        info.push(`Kelas: ${kelasNames.join(', ')}`);
                    } else {
                        info.push(`Kelas: ${kelasNames.length} kelas dipilih`);
                    }
                }
            }

            if (this.filter.metode_pembayaran) {
                info.push(`Metode: ${this.filter.metode_pembayaran === 'full' ? 'Cash' : 'Cicilan'}`);
            }

            if (this.filter.status_pembayaran) {
                info.push(`Status: ${this.filter.status_pembayaran}`);
            }

            if (this.filter.status_cicilan) {
                info.push(`Status Cicilan: ${this.filter.status_cicilan}`);
            }

            return info;
        },

        calculateDynamicColumnWidths(headers, data, availableWidth) {
            const columnWidths = {};
            const contentLengths = {};

            const defaultWidths = {
                'no': 10,
                'no_kk': 25,
                'nik_siswa': 20,
                'nama_siswa': 30,
                'kelas_id': 20,
                'tahun_ajaran_id': 20
            };

            headers.forEach(header => {
                let maxLength = defaultWidths[header] || 15; 

                const headerLength = header.length * 1.5; 
                if (headerLength > maxLength) maxLength = headerLength;

                data.forEach(row => {
                    const content = row[header] ?.toString() || '';
                    const contentLength = content.length * 1.2; 
                    if (contentLength > maxLength) maxLength = contentLength;
                });

                contentLengths[header] = Math.min(maxLength, 50); 
            });

            const totalNeededWidth = Object.values(contentLengths).reduce((a, b) => a + b, 0);

            if (totalNeededWidth < availableWidth) {
                const extraSpace = availableWidth - totalNeededWidth;
                const extraPerColumn = extraSpace / headers.length;

                headers.forEach(header => {
                    columnWidths[header] = contentLengths[header] + extraPerColumn;
                });
            } else {
                const scaleFactor = availableWidth / totalNeededWidth;

                headers.forEach(header => {
                    columnWidths[header] = contentLengths[header] * scaleFactor;
                });
            }

            return columnWidths;
        },
        getColumnAlignment(header, data) {
            if (!data || data.length === 0) return 'left';

            const sampleValue = data[0][header];

            if (typeof sampleValue === 'number') return 'right';

            if (sampleValue instanceof Date) return 'center';

            if (['no', 'anak_ke', 'jumlah_saudara', 'berat_badan', 'tinggi_badan'].includes(header)) {
                return 'right';
            }

            return 'left';
        },
        generateColumnStyles(columns, data) {
            const styles = {};
            const defaultWidth = 20;

            const specialWidths = {
                'No': 8,
                'Nomor KK': 25,
                'NIK': 20,
                'Nama Lengkap': 30,
                'Kelas Saat Ini': 20
            };

            columns.forEach((col, index) => {
                styles[index] = {
                    cellWidth: specialWidths[col] || defaultWidth,
                    halign: data && data[0] && typeof data[0][col] === 'number' ? 'right' : 'left'
                };
            });

            return styles;
        },
        getFilteredDataForExport() {
            const selectedColumnKeys = Object.keys(this.selectedFilters)
                .filter(key => this.selectedFilters[key]);

            if (selectedColumnKeys.length === 0) {
                return this.filteredSiswaList.map((siswa, index) => {
                    const {
                        id,
                        tahun_ajaran_id,
                        kelas_id,
                        ...rest
                    } = siswa;
                    return {
                        'No': index + 1,
                        ...rest,
                        'Kelas': this.getKelasNama(kelas_id),
                        'Tahun Ajaran': this.getTahunAjar(tahun_ajaran_id),
                        'Jenis Kelamin': siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'
                    };
                });
            }

            return this.filteredSiswaList.map((siswa, index) => {
                const filteredData = {
                    'No': index + 1
                };

                selectedColumnKeys.forEach(key => {
                    const backendKey = this.mapFrontendToBackendKey(key);

                    if (backendKey === 'kelas_id') {
                        filteredData['Kelas'] = this.getKelasNama(siswa[backendKey]);
                    } else if (backendKey === 'tahun_ajaran_id') {
                        filteredData['Tahun Ajaran'] = this.getTahunAjar(siswa[backendKey]);
                    } else if (key === 'jenisKelamin') {
                        filteredData['Jenis Kelamin'] = siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';
                    } else {
                        const label = this.getColumnLabel(key);
                        const value = siswa[backendKey];

                        if (backendKey === 'tanggal_lahir' && value) {
                            filteredData[label] = new Date(value).toLocaleDateString('id-ID');
                        } else {
                            filteredData[label] = value !== undefined ? value : '-';
                        }
                    }
                });

                return filteredData;
            });
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
            this.updateStatusPembayaran();
        },

        resetForm() {
            this.form = {
                id: null,
                siswa_id: '',
                nominal: '',
                jenis_pembayaran: '',
                tanggal_pembayaran: '',
                metode_pembayaran: '',
                bukti_pembayaran: null,
                bukti_pembayaran_url: null,
                bukti_pembayaran_url_from_backend: null,
                status_pembayaran: '',
                status_cicilan: '',
                status_rapor: '',
                status_atribut: ''
            };
            this.displayNominal = '';
            this.isEdit = false;
            this.errors = {};
            const fileInput = document.getElementById('bukti_pembayaran');
            if (fileInput) {
                fileInput.value = '';
            }
        },

        updateStatusPembayaran() {
            if (this.form.metode_pembayaran === 'full') {
                this.form.status_pembayaran = 'Lunas';
                this.form.status_cicilan = 'Lunas';
            } else if (this.form.metode_pembayaran === 'cicilan') {
                this.form.status_pembayaran = 'Belum Lunas';
                this.form.status_cicilan = 'Belum Lunas';
            } else {
                this.form.status_pembayaran = '';
                this.form.status_cicilan = '';
            }
        },
        shouldShowColumn(columnName) {
            const columnToFilterMap = {
                'Nomor KK': 'noKk',
                'Nama Lengkap': 'nama',
                'Kelas Saat Ini': 'rombel',
                'Jenis Kelamin': 'jenisKelamin',
                'Tanggal Lahir': 'tanggalLahir',
                'Alamat': 'alamat',
                'Agama': 'agama',
                'Status Siswa': 'statusSiswa',
                'Tempat Lahir': 'tempatLahir'
            };

            const filterKey = columnToFilterMap[columnName];
            if (filterKey) {
                return this.selectedFilters[filterKey] ||
                    this.displayedColumns.includes(columnName);
            }
            return this.displayedColumns.includes(columnName);
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
                        nominal: pembayaran.nominal ? pembayaran.nominal.toString() : '',
                        metode_pembayaran: pembayaran.metode_pembayaran || 'full',
                        bukti_pembayaran: null,
                        bukti_pembayaran_url: pembayaran.bukti_pembayaran,
                        bukti_pembayaran_url_from_backend: pembayaran.bukti_pembayaran_url,
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
            this.errors = {};

            const nominalValue = this.displayNominal ?
                parseInt(this.displayNominal.replace(/\./g, '')) :
                0;

            const formData = new FormData();
            formData.append('siswa_id', this.form.siswa_id);
            formData.append('tanggal_pembayaran', this.form.tanggal_pembayaran);
            formData.append('jenis_pembayaran', this.form.jenis_pembayaran);
            formData.append('nominal', nominalValue);
            formData.append('metode_pembayaran', this.form.metode_pembayaran);
            formData.append('status_rapor', this.form.status_rapor);
            formData.append('status_atribut', this.form.status_atribut);
            formData.append('status_pembayaran', this.form.status_pembayaran);
            formData.append('status_cicilan', this.form.status_cicilan);

            if (this.form.bukti_pembayaran instanceof File) {
                formData.append('bukti_pembayaran', this.form.bukti_pembayaran);
            } else if (this.isEdit && this.form.bukti_pembayaran_url_from_backend && !this.form.bukti_pembayaran_url) {
                formData.append('bukti_pembayaran', '');
            } else if (this.isEdit && this.form.bukti_pembayaran_url_from_backend) {
                formData.append('bukti_pembayaran_existing', this.form.bukti_pembayaran_url_from_backend);
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
                    showConfirmButton: true
                });

                this.closeModal();
                this.fetchPembayaranList();

                if (!this.isEdit && this.form.metode_pembayaran === 'cicilan') {
                    this.$router.push(`/adminmainsidebar/cicilan/${res.data.data.id}`);
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 422) {
                    this.errors = err.response.data.errors;
                    Swal.fire({
                        icon: 'error',
                        title: 'Validasi Gagal',
                        text: 'Silakan periksa kembali input Anda. ' + (err.response.data.message || ''),
                    });
                } else if (err.response && err.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Menyimpan Data',
                        text: err.response.data.message || 'Data pembayaran untuk siswa dan jenis pembayaran ini sudah ada.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal menyimpan data',
                        text: err.response ?.data ?.message || 'Terjadi kesalahan saat menyimpan data',
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
            const file = event.target.files[0];
            if (file) {
                this.form.bukti_pembayaran = file;

                this.form.bukti_pembayaran_url = URL.createObjectURL(file);
            } else {
                this.form.bukti_pembayaran = null;
                if (!this.isEdit || (this.isEdit && !this.form.bukti_pembayaran_url_from_backend)) {
                    this.form.bukti_pembayaran_url = null;
                }
            }
        },
        removeBuktiPembayaran() {
            this.form.bukti_pembayaran = '';
            this.form.bukti_pembayaran_url = null;
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
            this.dropdownIndex = null;
            this.errors = {};
            this.resetForm();
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
            this.dropdownIndex = null;
        },
        openImageModal(url) {
            this.currentImageUrl = url;
            this.showImageModal = true;
            document.body.style.overflow = 'hidden';
        },
        closeImageModal() {
            this.showImageModal = false;
            this.currentImageUrl = '';
            document.body.style.overflow = '';
        },
        handleClickOutside(event) {
            if (event.target.classList.contains('image-modal-backdrop')) {
                this.closeImageModal();
            }
        },
    },
    mounted() {
        this.fetchSiswaList();
        this.fetchKelasList();
        this.fetchPembayaranList();
        this.fetchTahunAjaranList();
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

        selectedKelasLabel() {
            if (!this.filter.kelas_ids || this.filter.kelas_ids.length === 0) {
                return '';
            }

            const selectedKelas = this.kelasList.filter(kelas =>
                this.filter.kelas_ids.includes(kelas.id)
            );

            if (selectedKelas.length === 0) return '';
            if (selectedKelas.length === 1) return selectedKelas[0].nama_kelas;
            if (selectedKelas.length <= 3) {
                return selectedKelas.map(k => k.nama_kelas).join(', ');
            }

            return `${selectedKelas.length} kelas dipilih`;
        },
        displayedColumns() {
            const selected = Object.keys(this.selectedFilters)
                .filter(key => this.selectedFilters[key]);

            if (selected.length === 0) {
                return [
                    'No', 'Nomor KK', 'NISN', 'NIK', 'Nama Lengkap', 'Jenis Kelamin',
                    'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Alamat', 'Anak Ke',
                    'Jumlah Saudara', 'Berat Badan', 'Tinggi Badan', 'Lingkar Kepala',
                    'Kelas Saat Ini', 'Status Siswa', 'Tahun Ajaran'
                ];
            }

            return selected.map(key => this.getColumnLabel(key));
        },
        filteredPembayaranList() {
            let result = this.pembayaranList;

            if (this.isFilterActive) {
                result = this.pembayaranList.filter(pembayaran => {
                    let isMatch = true;

                    if (this.tahunAwal && this.tahunAkhir) {
                        const tahunPembayaran = this.getTahunAjaranBySiswaId(pembayaran.siswa_id);

                        if (tahunPembayaran) {
                            let filterTahunAjaran;

                            if (this.tahunAwal.includes('/') && this.tahunAkhir.includes('/')) {
                                const tahunAjaranList = [];
                                const [startYear, startEndYear] = this.tahunAwal.split('/').map(Number);
                                const [endYear, endEndYear] = this.tahunAkhir.split('/').map(Number);

                                for (let year = startYear; year <= endYear; year++) {
                                    tahunAjaranList.push(`${year}/${year + 1}`);
                                }

                                isMatch = tahunAjaranList.includes(tahunPembayaran);
                            } else {
                                filterTahunAjaran = `${this.tahunAwal}/${this.tahunAkhir}`;
                                isMatch = tahunPembayaran === filterTahunAjaran;
                            }
                        } else {
                            isMatch = false;
                        }
                    }

                    if (this.filter.kelas_ids && this.filter.kelas_ids.length > 0) {

                        let siswaKelasId;

                        if (pembayaran.kelas_id) {
                            siswaKelasId = pembayaran.kelas_id;
                        } else if (pembayaran.siswa && pembayaran.siswa.kelas_id) {
                            siswaKelasId = pembayaran.siswa.kelas_id;
                        } else if (pembayaran.siswa_id) {
                            const siswa = this.siswaList.find(s => s.id === pembayaran.siswa_id);
                            siswaKelasId = siswa ? siswa.kelas_id : null;
                        }

                        ('Debug Kelas (FIXED):', {
                            siswa_id: pembayaran.siswa_id,
                            nama_siswa: pembayaran.siswa ?.nama_siswa || pembayaran.nama_siswa,
                            siswa_kelas_id: siswaKelasId,
                            filter_kelas_ids: this.filter.kelas_ids,
                            pembayaran_structure: Object.keys(pembayaran)
                        });

                        if (!siswaKelasId) {
                            isMatch = false;
                        } else {
                            const siswaKelasIdNum = Number(siswaKelasId);
                            const filterKelasIdsNum = this.filter.kelas_ids.map(id => Number(id));

                            if (!filterKelasIdsNum.includes(siswaKelasIdNum)) {
                                isMatch = false;
                            } else {}
                        }
                    }
                    if (this.filter.metode_pembayaran && this.filter.metode_pembayaran.trim() !== '') {
                        if (pembayaran.metode_pembayaran !== this.filter.metode_pembayaran) {
                            isMatch = false;
                        }
                    }
                    if (this.filter.status_pembayaran && this.filter.status_pembayaran.trim() !== '') {
                        if (pembayaran.status_pembayaran !== this.filter.status_pembayaran) {
                            isMatch = false;
                        }
                    }
                    if (this.filter.status_cicilan && this.filter.status_cicilan.trim() !== '') {
                        if (pembayaran.status_cicilan !== this.filter.status_cicilan) {
                            isMatch = false;
                        }
                    }
                    return isMatch;
                });
            }

            if (!this.searchQuery) {
                return result;
            }

            const query = this.searchQuery.toLowerCase();
            return result.filter(pembayaran => {
                const siswaName = pembayaran.siswa ?.nama_siswa ?.toLowerCase() || pembayaran.nama_siswa ?.toLowerCase() || '';
                const nisn = pembayaran.siswa ?.nisn ?.toLowerCase() || pembayaran.nisn ?.toLowerCase() || '';
                const kelasName = this.getNamaKelasBySiswaId(pembayaran.siswa_id) ?.toLowerCase() || '';
                const tahunAjaran = this.getTahunAjaranBySiswaId(pembayaran.siswa_id) ?.toLowerCase() || '';

                return (
                    siswaName.includes(query) ||
                    nisn.includes(query) ||
                    kelasName.includes(query) ||
                    tahunAjaran.includes(query) ||
                    (pembayaran.jenis_pembayaran && pembayaran.jenis_pembayaran.toLowerCase().includes(query)) ||
                    (pembayaran.tanggal_pembayaran && String(pembayaran.tanggal_pembayaran).toLowerCase().includes(query)) ||
                    (pembayaran.metode_pembayaran && pembayaran.metode_pembayaran.toLowerCase().includes(query)) ||
                    (pembayaran.nominal && String(pembayaran.nominal).toLowerCase().includes(query)) ||
                    (pembayaran.sisa_pembayaran && String(pembayaran.sisa_pembayaran).toLowerCase().includes(query)) ||
                    (pembayaran.status_pembayaran && pembayaran.status_pembayaran.toLowerCase().includes(query)) ||
                    (pembayaran.status_cicilan && pembayaran.status_cicilan.toLowerCase().includes(query)) ||
                    (pembayaran.status_rapor && pembayaran.status_rapor.toLowerCase().includes(query)) ||
                    (pembayaran.status_atribut && pembayaran.status_atribut.toLowerCase().includes(query))
                );
            });
        },
        paginatedPembayaranList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredPembayaranList.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.filteredPembayaranList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredPembayaranList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredPembayaranList.length} entries`;
        },
    },
};
</script>

<style scoped>
.readonly {
    color: #636364;
}

.text-danger {
    color: red;
    font-size: 0.85em;
    margin-top: 5px;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.form-group label {
    width: 100%;
    font-weight: 800;
    color: #336C2A;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}

.form-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
    cursor: pointer;
}

.form-group select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
}

.filter-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 15px;
}

.filter-form .form-group {
    margin-bottom: 15px;
    width: 100%;
}

.filter-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    gap: 10px;
}

.tahun-ajaran-dropdown {
    display: flex;
    gap: 10px;
    margin-top: 5px;
}

.btn-reset {
    background-color: #dc3545;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    margin-right: 8px;
    cursor: pointer;
}

.btn-apply {
    background: #274278;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.row {
    display: flex;
    gap: 10px;
}

.col {
    flex: 1;
}

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
    width: 90%;
    max-width: 700px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
}

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
    width: 100%;
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

.content-header {
    width: 100%;
}

.header-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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

.modal-content-kelas {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
}

.kelas-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 1rem 0;
}

.kelas-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.kelas-item input[type="checkbox"] {
    transform: scale(1.2);
    cursor: pointer;
}

.kelas-item label {
    font-size: 14px;
    cursor: pointer;
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

.btn-add-payment {
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

.btn-add-payment:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add-payment i {
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

.popup-menu-pembayaran {
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 8px;
    display: none;
    z-index: 1000;
    left: 74rem;
}

.popup-menu-pembayaran.show {
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

.image-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: auto;
}

.image-modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
    font-size: 2.5em;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    z-index: 10;
}

.image-modal-close:hover {
    color: #ff0000;
}

.full-image {
    max-width: 100%;
    max-height: calc(90vh - 40px);
    object-fit: contain;
    display: block;
}

.image-modal-backdrop.v-enter-active,
.image-modal-backdrop.v-leave-active {
    transition: opacity 0.3s ease;
}

.image-modal-backdrop.v-enter-from,
.image-modal-backdrop.v-leave-to {
    opacity: 0;
}

.img-thumbnail.cursor-pointer {
    cursor: pointer;
}

@media (max-width: 600px) {
    .modal-content-spp {
        width: 95%;
        max-width: 100%;
    }

    .filter-form {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 40vh;
  }

  .row-filter-wrapper {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .export-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .filter {
    width: 100%;
  }

  .tampil-baris {
    width: 100%;
  }

  .search-bar-container {
    margin-top: 1rem;
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .filter-btn,
  .btn {
    width: 100%;
  }

  .table-wrapper {
    width: 40vh;
  }
}
</style>
