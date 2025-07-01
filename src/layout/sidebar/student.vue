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
                            <div class="form-group">
                                <label>
                                   
                                    Filter Tahun Ajaran (Rentang)
                                </label>
                                <div class="tahun-ajaran-dropdown">
                                    <select v-model="tahunAwal">
                                        <option value="">Pilih Tahun Awal</option>
                                        <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.tahun.split('/')[0]">{{ tahun.tahun }}</option>
                                    </select>
                                    <span>-</span>
                                    <select v-model="tahunAkhir">
                                        <option value="">Pilih Tahun Akhir</option>
                                        <option v-for="tahun in tahunAjaranList" :key="tahun.id" :value="tahun.tahun.split('/')[1]">{{ tahun.tahun }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Status Siswa</label>
                                <div class="status-dropdown">
                                    <select v-model="selectedStatus">
                                        <option value="">Semua Status</option>
                                        <option value="aktif">Aktif</option>
                                        <option value="tidak aktif">Lulus</option>
                                        <option value="Pindah">Pindah</option>
                                        <option value="drop out">Drop Out</option>
                                    </select>
                                </div>
                            </div> 

                             <!-- Kelas -->
                             <div class="form-group">
                                <label>Kelas</label>
                                <input
                                    type="text"
                                    class="form-input"
                                    :value="selectedKelasLabel"
                                    placeholder="Tap untuk memilih kelas"
                                    readonly
                                    @click="showKelasModal = true"
                                />
                            </div>

                                <!-- Modal Pilih Kelas -->
                            <div v-if="showKelasModal" class="modal-overlay" @click.self="showKelasModal = false">
                                <div class="modal-content">
                                    <h5>Pilih Kelas</h5>
                                    <div v-for="kelas in kelasList" :key="kelas.id">
                                    <input
                                        type="checkbox"
                                        :id="'kelas-' + kelas.id"
                                        :value="kelas.id"
                                        v-model="filter.kelas_ids"
                                    />
                                    <label :for="'kelas-' + kelas.id">{{ kelas.nama_kelas }}</label>
                                    </div>
                                    <button @click="showKelasModal = false">Simpan</button>
                                </div>
                            </div>
                            <!-- Tombol di bawah modal -->
                            <div class="modal-footer">
                            <button @click="resetFilters" class="btn-reset">
                                Reset
                            </button>
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
                        <th v-if="shouldShowColumn('Nomor KK')" scope="col" class="table-head">No KK</th>
                        <th v-if="shouldShowColumn('NIPD')" scope="col" class="table-head">NIPD</th>
                        <th v-if="shouldShowColumn('NISN')" scope="col" class="table-head">NISN</th>
                        <th v-if="shouldShowColumn('NIK')" scope="col" class="table-head">NIK</th>
                        <th v-if="shouldShowColumn('Nama Lengkap')" scope="col" class="table-head">Nama Lengkap</th>
                        <th v-if="shouldShowColumn('Jenis Kelamin')" scope="col" class="table-head">Jenis Kelamin</th>
                        <th v-if="shouldShowColumn('Tempat Lahir')" scope="col" class="table-head">Tempat Lahir</th>
                        <th v-if="shouldShowColumn('Tanggal Lahir')" scope="col" class="table-head">Tanggal Lahir</th>
                        <th v-if="shouldShowColumn('Agama')" scope="col" class="table-head">Agama</th>
                        <th v-if="shouldShowColumn('Alamat')" scope="col" class="table-head">Alamat</th>
                        <th v-if="shouldShowColumn('Anak Ke')" scope="col" class="table-head">Anak Ke</th>
                        <th v-if="shouldShowColumn('Jumlah Saudara')" scope="col" class="table-head">Jumlah Saudara</th>
                        <th v-if="shouldShowColumn('Berat Badan')" scope="col" class="table-head">Berat Badan</th>
                        <th v-if="shouldShowColumn('Tinggi Badan')" scope="col" class="table-head">Tinggi Badan</th>
                        <th v-if="shouldShowColumn('Lingkar Kepala')" scope="col" class="table-head">Lingkar Kepala</th>
                        <th v-if="shouldShowColumn('Kelas Saat Ini')" scope="col" class="table-head">Kelas Saat Ini</th>
                        <th v-if="shouldShowColumn('Status Siswa')" scope="col" class="table-head">Status Siswa</th>
                        <th v-if="shouldShowColumn('Tahun Ajaran')" scope="col" class="table-head">Tahun Ajaran</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id" class="row-hover">
                        <td>{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
                        <td v-if="shouldShowColumn('Nomor KK')">{{ siswa.no_kk ? siswa.no_kk : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('NIPD')">{{ siswa.nipd ? siswa.nipd : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('NISN')">{{ siswa.nisn ? siswa.nisn : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('NIK')">{{ siswa.nik_siswa }}</td>
                        <td v-if="shouldShowColumn('Nama Lengkap')">{{ siswa.nama_siswa }}</td>
                        <td v-if="shouldShowColumn('Jenis Kelamin')">{{ siswa.jenis_kelamin }}</td>
                        <td v-if="shouldShowColumn('Tempat Lahir')">{{ siswa.tempat_lahir }}</td>
                        <td v-if="shouldShowColumn('Tanggal Lahir')">{{ siswa.tanggal_lahir }}</td>
                        <td v-if="shouldShowColumn('Agama')">{{ siswa.agama }}</td>
                        <td v-if="shouldShowColumn('Alamat')">{{ siswa.alamat }}</td>
                        <td v-if="shouldShowColumn('Anak Ke')">{{ siswa.anak_ke }}</td>
                        <td v-if="shouldShowColumn('Jumlah Saudara')">{{ siswa.jumlah_saudara }}</td>
                        <td v-if="shouldShowColumn('Berat Badan')">{{ siswa.berat_badan }}</td>
                        <td v-if="shouldShowColumn('Tinggi Badan')">{{ siswa.tinggi_badan }}</td>
                        <td v-if="shouldShowColumn('Lingkar Kepala')">{{ siswa.lingkar_kepala }}</td>
                        <td v-if="shouldShowColumn('Kelas Saat Ini')">{{ getKelasNama(siswa.kelas_id) }}</td>
                        <td v-if="shouldShowColumn('Status Siswa')">{{ siswa.status ? siswa.status : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('Tahun Ajaran')">{{ getTahunAjar(siswa.tahun_ajaran_id) }}</td>
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

import 'jspdf-autotable';
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
            showKelasModal: false,
            dropdownIndex: null,
            showModal: false,
            searchQuery: '', // for filtering
            siswaList: [],
            kelasList: [],
            selectedStatus: '',
            tahunAwal: '',
            tahunAkhir: '',
            filter: {
                kelas_ids: [],
            },
            selectedFilters: {
                noKk: false,
                nipd: false,
                nisn: false,
                nik: false,
                nama: false,
                tempatLahir: false,
                tanggalLahir: false,
                jenisKelamin: false,
                agama: false,
                anakKe: false,
                jumlahSaudara: false,
                beratBadan: false,
                tinggiBadan: false,
                lingkarKepala: false,
                rombel: false,
                status: false,
                tahunAjar: false
            },
            firstRowFilters: [
                {
                    key: 'noKk',
                    label: 'Nomor KK'
                },
                {
                    key: 'nipd',
                    label: 'NIPD'
                },
                {
                    key: 'nisn',
                    label: 'NISN'
                },
                {
                    key: 'nik',
                    label: 'NIK'
                },
                {
                    key: 'nama',
                    label: 'Nama Lengkap'
                },
                {
                    key: 'tempatLahir',
                    label: 'Tempat Lahir'
                },
                {
                    key: 'tanggalLahir',
                    label: 'Tanggal Lahir'
                },
                {
                    key: 'jenisKelamin',
                    label: 'Jenis Kelamin'
                },
                {
                    key: 'rombel',
                    label: 'Kelas'
                },
            ],
            secondRowFilters: [
                {
                    key: 'agama',
                    label: 'Agama'
                },
                {
                    key: 'anakKe',
                    label: 'Anak Ke'
                },
                {
                    key: 'jumlahSaudara',
                    label: 'Jumlah Saudara'
                },
                {
                    key: 'beratBadan',
                    label: 'Berat Badan'
                },
                {
                    key: 'tinggiBadan',
                    label: 'Tinggi Badan'
                },
                {
                    key: 'lingkarKepala',
                    label: 'Lingkar Kepala'
                },
                {
                    key: 'status',
                    label: 'Status'
                },
                {
                    key: 'tahunAjar',
                    label: 'Tahun Ajaran'
                }
            ],
            showTahunAjaran: false,
            headerMapping: {
                no_kk: 'Nomor KK',
                nik_siswa: 'NIK',
                nipd: 'NIPD',
                nis: 'NIS',
                nama_siswa: 'Nama Lengkap',
                tempat_lahir: 'Tempat Lahir',
                tanggal_lahir: 'Tanggal Lahir',
                jenis_kelamin: 'Jenis Kelamin',
                agama: 'Agama',
                anak_ke: 'Anak Ke',
                jumlah_saudara: 'Jumlah Saudara',
                berat_badan: 'Berat Badan (kg)',
                tinggi_badan: 'Tinggi Badan (cm)',
                lingkar_kepala: 'Lingkar Kepala (cm)',
                status_siswa: 'Status Siswa',
                tahun_ajaran: 'Tahun Ajaran'
            }
        };
    },
    setup() {
        const siswaList = ref([]);
        const kelasList = ref([]);
        const tahunAjaranList = ref([]);

        const fetchSiswaList = () => {
            axios.get('/siswa')
                .then((res) => {
                    if (res.data && Array.isArray(res.data.data)) {
                        siswaList.value = res.data.data;
                        
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
                    if (res.data && Array.isArray(res.data.data)) {
                        kelasList.value = res.data.data;
                      
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
        toggleFilterPopup() {
            this.showModal = !this.showModal;
        },
      
mapFrontendToBackendKey(frontendKey) {
    const mapping = {
        noKk: 'no_kk',
        nipd: 'nipd',
        nisn: 'nisn',
        nik: 'nik_siswa',
        nama: 'nama_siswa',
        tempatLahir: 'tempat_lahir',
        tanggalLahir: 'tanggal_lahir',
        jenisKelamin: 'jenis_kelamin',
        agama: 'agama',
        anakKe: 'anak_ke',
        jumlahSaudara: 'jumlah_saudara',
        beratBadan: 'berat_badan',
        tinggiBadan: 'tinggi_badan',
        lingkarKepala: 'lingkar_kepala',
        rombel: 'kelas_nama',
        status: 'status',
        tahunAjar: 'tahun_ajaran_nama'
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

async applyFilters() {
    try {
        const kelasIds = Array.isArray(this.filter.kelas_ids) ? this.filter.kelas_ids : [this.filter.kelas_ids].filter(Boolean);
        console.log('Kelas yang dipilih:', kelasIds);

        const selectedKeys = Object.keys(this.selectedFilters).filter(key => this.selectedFilters[key]);
        console.log('Selected filter keys:', selectedKeys);

        const columnMapping = {
            'nipd': 'nipd',
            'nisn': 'nisn',
            'namaSiswa': 'nama_siswa',
            'nama': 'nama_siswa', 
            'nik': 'nik_siswa',
            'tempatLahir': 'tempat_lahir',
            'tanggalLahir': 'tanggal_lahir',
            'jenisKelamin': 'jenis_kelamin',
            'kelas': 'kelas_nama',
            'kelasId': 'kelas_nama', 
            'rombel': 'kelas_nama',
            'tahunAjaran': 'tahun_ajaran_nama',
            'status': 'status',
            'noKk': 'no_kk',
            'agama': 'agama'
        };

        const mappedColumns = selectedKeys.map(key => columnMapping[key] || key);
        console.log('Mapped columns for API:', mappedColumns);

        const params = {
            columns: mappedColumns.length > 0 ? mappedColumns : undefined,
            status: this.selectedStatus || undefined,
            kelas_ids: kelasIds.length ? kelasIds : undefined,
            tahun_awal: this.tahunAwal || undefined,
            tahun_akhir: this.tahunAkhir || undefined
        };

        Object.keys(params).forEach(key => {
            if (params[key] === undefined) {
                delete params[key];
            }
        });

        const response = await axios.get('/siswa/export', {
            params,
            paramsSerializer
        });
        return response.data.data;
    } catch (error) {
        console.error('Error applying filters:', error);
        console.error('Error details:', error.response?.data); 
        Swal.fire('Error', 'Gagal menerapkan filter: ' + (error.response?.data?.message || error.message), 'error');
        return [];
    }
},

async exportData(format) {
    try {
        Swal.fire({
            title: 'Memproses...',
            text: 'Sedang mengambil data untuk export',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const filteredData = await this.applyFilters();
        
        Swal.close();

        if (!filteredData || filteredData.length === 0) {
            Swal.fire('Info', 'Tidak ada data untuk diekspor', 'info');
            return;
        }

        if (format === 'pdf') {
            await this.exportToPDF(filteredData);
        } else if (format === 'excel') {
            await this.exportToExcel(filteredData);
        }

        Swal.fire('Sukses', 'Data berhasil diekspor', 'success');
    } catch (error) {
        console.error("Export error:", error);
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Gagal Mengekspor Data',
            text: 'Terjadi kesalahan saat mengekspor data: ' + error.message
        });
    }
},
async exportToExcel() {
    try {
        const XLSX = await import('xlsx');
        
        const response = await axios.get('/siswa/export');
        const data = response.data.data;

        const columns = [
            { key: 'no_kk', header: 'No KK' },
            { key: 'nipd', header: 'NIPD' },
            { key: 'nisn', header: 'NISN' },
            { key: 'nama_siswa', header: 'Nama Siswa' },
            { key: 'nik_siswa', header: 'NIK' },
            { key: 'kelas_nama', header: 'Kelas' },
            { key: 'tahun_ajaran_nama', header: 'Tahun Ajaran' },
            { key: 'tanggal_lahir', header: 'Tanggal Lahir' },
            { key: 'tempat_lahir', header: 'Tempat Lahir' },
            { key: 'jenis_kelamin', header: 'Jenis Kelamin' },
            { key: 'agama', header: 'Agama' },
            { key: 'status', header: 'Status' },
        ];

        const excelData = data.map((item, index) => {
            const row = { No: index + 1 };
            
            columns.forEach(col => {
                if (col.key === 'tanggal_lahir') {
                    if (item[col.key] && item[col.key] !== 'Invalid Date') {
                        try {
                            const date = new Date(item[col.key]);
                            if (!isNaN(date.getTime())) {
                                row[col.header] = date.toLocaleDateString('id-ID');
                            } else {
                                row[col.header] = '-';
                            }
                        } catch (e) {
                            row[col.header] = '-';
                        }
                    } else {
                        row[col.header] = '-';
                    }
                } 
                else if (col.key === 'jenis_kelamin') {
                    if (item[col.key]) {
                        row[col.header] = item[col.key] === 'L' ? 'Laki-laki' : 'Perempuan';
                    } else {
                        row[col.header] = '-';
                    }
                }
                else {
                    const value = item[col.key];
                    row[col.header] = (value !== null && value !== undefined && value !== '') ? value : '-';
                }
            });
            
            return row;
        });

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");

        const wscols = [
            { wch: 5 },  // No
            { wch: 10 }, // NISN
            { wch: 30 }, // Nama Siswa
            { wch: 20 }, // NIK
            { wch: 15 }, // Kelas
            { wch: 15 }, // Tahun Ajaran
            { wch: 15 }, // Tanggal Lahir
            { wch: 20 }, // Tempat Lahir
            { wch: 15 }, // Jenis Kelamin
            { wch: 10 }, // Agama
            { wch: 10 }, // Status
            { wch: 15 },
            { wch: 10 }
        ];
        ws['!cols'] = wscols;

        XLSX.writeFile(wb, `Data_Siswa_${new Date().toISOString().slice(0, 10)}.xlsx`);

        alert('Data berhasil diekspor ke Excel!');

    } catch (error) {
        console.error('Error generating Excel:', error);
        alert('Terjadi kesalahan saat mengekspor data: ' + error.message);
        throw error;
    }
},

async exportToPDF(data) {
    try {
        const { jsPDF } = await import('jspdf');
        await import('jspdf-autotable');

        if (!data || data.length === 0) {
            throw new Error('Tidak ada data untuk diekspor');
        }

        const columnsToShow = ['nama_siswa', 'kelas_nama'];
        const headerMapping = {
            'nama_siswa': 'Nama Siswa',
            'kelas_nama': 'Kelas'
        };

        const processedData = data.map((item, index) => {
            const row = { no: index + 1 };
            
            columnsToShow.forEach(col => {
                if (item[col] !== undefined) {
                    row[col] = item[col] || '-';
                }
            });
            
            return row;
        });

        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm' });

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('LAPORAN DATA SISWA', doc.internal.pageSize.width / 2, 20, { align: 'center' });

        // Print date
        const date = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.setFontSize(10);
        doc.text(`Dicetak pada: ${date}`, 14, 25);

        // Prepare headers and body
        const headers = ['No', ...columnsToShow.map(col => headerMapping[col])];
        const body = processedData.map(row => 
            [row.no, ...columnsToShow.map(col => row[col] || '-')]
        );

        // Create table
        doc.autoTable({
            head: [headers],
            body: body,
            startY: 30,
            styles: {
                fontSize: 8,
                cellPadding: 2
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            didDrawPage: (data) => {
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(8);
                doc.text(
                    `Halaman ${data.pageNumber} dari ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' }
                );
            }
        });

        doc.save(`Data_Siswa_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
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
                .filter(key => this.selectedFilters[key]
            );

            // Jika tidak ada filter kolom yang dipilih, kembalikan semua kolom
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

            // Jika ada filter, hanya ambil kolom yang dipilih
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

                        // Format khusus untuk beberapa tipe data
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
        editSiswa(id) {
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
        shouldShowColumn(columnName) {
            const columnToFilterMap = {
                'Nomor KK': 'noKk',
                'NIPD': 'nipd',
                'NISN': 'nisn',
                'NIK': 'nik',
                'Nama Lengkap': 'nama',
                'Jenis Kelamin': 'jenisKelamin',
                'Tempat Lahir': 'tempatLahir',
                'Tanggal Lahir': 'tanggalLahir',
                'Agama': 'agama',
                'Alamat': 'alamat',
                'Anak Ke': 'anakKe',
                'Jumlah Saudara': 'jumlahSaudara',
                'Berat Badan': 'beratBadan',
                'Tinggi Badan': 'tinggiBadan',
                'Lingkar Kepala': 'lingkarKepala',
                'Kelas Saat Ini': 'rombel',
                'Status Siswa': 'statusSiswa',
                'Tahun Ajaran': 'tahunAjaran'
            };

            const filterKey = columnToFilterMap[columnName];
            if (filterKey) {
                return this.selectedFilters[filterKey] ||
                    this.displayedColumns.includes(columnName);
            }
            return this.displayedColumns.includes(columnName);
        },
        resetFilters() {
            Object.keys(this.selectedFilters).forEach(key => {
            this.selectedFilters[key] = false;
            });

            this.showTahunAjaran = false;
            this.tahunAwal = '';
            this.tahunAkhir = '';

            this.selectedStatus = '';

            this.filter.kelas_ids = [];
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
        selectedKelasLabel() {
            if (!this.filter.kelas_ids.length) return '';
            const selected = this.kelasList.filter(k => this.filter.kelas_ids.includes(k.id));
            return selected.map(k => k.nama_kelas).join(', ');
        },
        filteredSiswaList() {
            let filtered = this.siswaList;

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(siswa =>
                    siswa.nama_siswa.toLowerCase().includes(query) ||
                    (siswa.nis && siswa.nis.toLowerCase().includes(query)) ||
                    (siswa.nik_siswa && siswa.nik_siswa.toLowerCase().includes(query))
                );
            }

            if (this.selectedStatus) {
                filtered = filtered.filter(siswa =>
                siswa.status && siswa.status.toLowerCase() === this.selectedStatus.toLowerCase()
                );
            }

            if (this.filter.kelas_ids.length) {
                filtered = filtered.filter(siswa =>
                this.filter.kelas_ids.includes(siswa.kelas_id)
                );
            }

            // Filter berdasarkan tahun ajaran
            if (this.tahunAwal && this.tahunAkhir) {
                filtered = filtered.filter(siswa => {
                    const tahunAjaran = this.getTahunAjar(siswa.tahun_ajaran_id);
                    if (!tahunAjaran) return false;

                    const [awal, akhir] = tahunAjaran.split('/');
                    return awal >= this.tahunAwal && akhir <= this.tahunAkhir;
                });
            }

            return filtered;
        },

        // Kolom yang ditampilkan di tabel
        displayedColumns() {
            const selected = Object.keys(this.selectedFilters)
                .filter(key => this.selectedFilters[key]);

            if (selected.length === 0) {
                return [
                    'No', 'Nomor KK', 'NIPD', 'NISN', 'NIK', 'Nama Lengkap', 'Jenis Kelamin',
                    'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Alamat', 'Anak Ke',
                    'Jumlah Saudara', 'Berat Badan', 'Tinggi Badan', 'Lingkar Kepala',
                    'Kelas Saat Ini', 'Status Siswa', 'Tahun Ajaran'
                ];
            }

            return selected.map(key => this.getColumnLabel(key));
        },
        paginatedSiswaList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            // Gunakan filteredSiswaList di sini
            return this.filteredSiswaList.slice(start, end);
        },
        totalPages() {
            // Total halaman dihitung berdasarkan filteredSiswaList
            return Math.ceil(this.filteredSiswaList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswaList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredSiswaList.length} entries`;
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

.multi-select-container {
    position: relative;
    width: 100%;
    /* Sesuaikan lebar */
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    box-sizing: border-box;
}

.selected-kelas-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
}

.kelas-tag {
    background-color: #e0e0e0;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.remove-tag {
    cursor: pointer;
    font-weight: bold;
    color: #555;
}

.multi-select-input {
    flex-grow: 1;
    /* Agar input mengisi sisa ruang */
    border: none;
    outline: none;
    padding: 5px;
    min-width: 100px;
    /* Lebar minimum untuk input */
}

.kelas-options-dropdown {
    position: absolute;
    top: 100%;
    /* Di bawah container */
    left: 0;
    right: 0;
    border: 1px solid #ccc;
    background-color: white;
    z-index: 1000;
    /* Pastikan di atas elemen lain */
    max-height: 200px;
    /* Batasi tinggi, tambahkan scroll */
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 4px 4px;
}

.kelas-option {
    padding: 8px 10px;
    cursor: pointer;
}

.kelas-option:hover {
    background-color: #f0f0f0;
}

.no-options-found {
    padding: 8px 10px;
    color: #888;
    text-align: center;
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

.btn-reset {
  background-color: #dc3545; /* Merah */
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
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
