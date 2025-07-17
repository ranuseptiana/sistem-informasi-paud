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
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal Upload -->
                <div v-if="tampilModal" class="modal-overlay" @click.self="tampilModal = false">
                    <div class="modal-content-ortu">
                        <div class="modal-header">
                        <h3>Import Data Orangtua</h3>
                        <button type="button" class="close-btn" @click="closeModal">&times;</button>
                        </div>

                        <form @submit.prevent="handleImport">
                        <input type="file" @change="handleFileChange" accept=".xlsx,.xls,.csv" required />
                        <div class="modal-actions">
                            <button type="submit" class="btn btn-success">Upload</button>
                            <button type="button" class="btn btn-secondary" @click="tampilModal = false">Batal</button>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="export-section">
                    <button class="btn btn-primary" @click="tampilModal = true">
                        <i class="fa-solid fa-upload"></i>
                        Import
                    </button>
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
                        <th scope="col" class="table-head" v-if="shouldShowColumn('No KK')">No KK</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('NIK Ayah')">NIK Ayah</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Nama Ayah')">Nama Ayah</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Tahun Lahir Ayah')">Tahun Lahir</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Pendidikan Ayah')">Jenjang Pendidikan</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Pekerjaan Ayah')">Pekerjaan</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Penghasilan Ayah')">Penghasilan</th>

                        <th scope="col" class="table-head" v-if="shouldShowColumn('NIK Ibu')">NIK Ibu</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Nama Ibu')">Nama Ibu</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Tahun Lahir Ibu')">Tahun Lahir</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Pendidikan Ibu')">Jenjang Pendidikan</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Pekerjaan Ibu')">Pekerjaan</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Penghasilan Ibu')">Penghasilan</th>
                        <th scope="col" class="table-head" v-if="shouldShowColumn('Nomor Telepon')">Nomor Hp</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ortu, index) in paginatedOrtuList" :key="ortu.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="shouldShowColumn('No KK')">{{ ortu.no_kk ? ortu.no_kk : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('NIK Ayah')">{{ ortu.nik_ayah ? ortu.nik_ayah : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('Nama Ayah')">{{ ortu.nama_ayah ? ortu.nama_ayah : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('Tahun Lahir Ayah')">{{ ortu.tahun_lahir_ayah }}</td>
                        <td v-if="shouldShowColumn('Pendidikan Ayah')">{{ ortu.pendidikan_ayah }}</td>
                        <td v-if="shouldShowColumn('Pekerjaan Ayah')">{{ ortu.pekerjaan_ayah }}</td>
                        <td v-if="shouldShowColumn('Penghasilan Ayah')">{{ ortu.penghasilan_ayah }}</td>
                        <td v-if="shouldShowColumn('NIK Ibu')">{{ ortu.nik_ibu ? ortu.nik_ibu : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('Nama Ibu')">{{ ortu.nama_ibu ? ortu.nama_ibu : 'Data tidak ditemukan' }}</td>
                        <td v-if="shouldShowColumn('Tahun Lahir Ibu')">{{ ortu.tahun_lahir_ibu }}</td>
                        <td v-if="shouldShowColumn('Pendidikan Ibu')">{{ ortu.pendidikan_ibu }}</td>
                        <td v-if="shouldShowColumn('Pekerjaan Ibu')">{{ ortu.pekerjaan_ibu }}</td>
                        <td v-if="shouldShowColumn('Penghasilan Ibu')">{{ ortu.penghasilan_ibu }}</td>
                        <td v-if="shouldShowColumn('Nomor Telepon')">{{ ortu.no_telp ? ortu.no_telp : 'Data tidak ditemukan'}}</td>
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
import "jspdf-autotable";
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ref,
    onMounted,
    computed
} from 'vue';

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
            maxVisiblePages: 5,
            rowsPerPage: 5,
            sortKey: '',
            sortAsc: true,
            currentPage: 1,
            showModal: false,
            tampilModal: false,
            dropdownIndex: null,
            searchQuery: '', // for filtering
            selectedFilters: {
                noKK: false,
                nikAyah: false,
                namaAyah: false,
                tahunLahirAyah: false,
                pendidikanAyah: false,
                pekerjaanAyah: false,
                penghasilanAyah: false,
                nikIbu: false,
                namaIbu: false,
                tahunLahirIbu: false,
                pendidikanIbu: false,
                pekerjaanIbu: false,
                penghasilanIbu: false,
                noTelp: false,
            },
            ortuList: [],
            firstRowFilters: [{
                    key: "noKK",
                    label: "No KK"
                },
                {
                    key: "nikAyah",
                    label: "NIK Ayah"
                },
                {
                    key: "namaAyah",
                    label: "Nama Ayah"
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
                }
            ],
            secondRowFilters: [{
                    key: "noTelp",
                    label: "Nomor Telepon"
                },
                {
                    key: "nikIbu",
                    label: "NIK Ibu"
                },
                {
                    key: "namaIbu",
                    label: "Nama Ibu"
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
            headerMapping: {
                no_kk: 'No KK',
                nik_ayah: 'NIK Ayah',
                nama_ayah: 'Nama Ayah',
                tahun_lahir_ayah: 'Tahun Lahir Ayah',
                pendidikan_ayah: 'Pendidikan Ayah',
                pekerjaan_ayah: 'Pekerjaan Ayah',
                penghasilan_ayah: 'Penghasilan Ayah',
                nik_ibu: 'NIK Ibu',
                nama_ibu: 'Nama Ibu',
                tahun_lahir_ibu: 'Tahun Lahir Ibu',
                pendidikan_ibu: 'Pendidikan Ibu',
                pekerjaan_ibu: 'Pekerjaan Ibu',
                penghasilan_ibu: 'Penghasilan Ibu',
                no_telp: 'No Telepon'
            }

        };
    },
    setup() {
        const ortuList = ref([]); 

        const fetchOrtuList = () => {
            axios
                .get('/orangtua')
                .then((res) => {
                    ortuList.value = res.data.data; 
                })
                .catch((error) => {
                    (error.response.data);
                });
        };

        onMounted(() => {
            fetchOrtuList();
        });

        return {
            ortuList,
            fetchOrtuList
        };
    },
    methods: {
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async handleImport() {
            if (!this.selectedFile) {
            alert("Silakan pilih file terlebih dahulu.");
            return;
            }

            const formData = new FormData();
            formData.append("file", this.selectedFile);

            try {
            const response = await axios.post("/orangtua/import", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });

            this.tampilModal = false;
            this.selectedFile = null;
            this.$nextTick(() => {
                Swal.fire("Sukses", "Data berhasil diimpor", "success");
            });
            await this.fetchOrtuList(); // kalau punya method refresh data
            } catch (error) {
            this.tampilModal = false;
            this.$nextTick(() => {
                Swal.fire("Gagal", "Terjadi kesalahan saat mengimpor data orangtua", "error");
            });
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
                this.dropdownIndex = null;
            }
        },
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortKey = key;
                this.sortAsc = true;
            }
        },
        getFilteredData() {
            return this.ortuList.map((ortu, index) => {
                const filteredOrtu = {
                    No: index + 1,
                };
                Object.keys(this.selectedFilters).forEach((key) => {
                    if (this.selectedFilters[key]) {
                        filteredOrtu[key] = ortu[key];
                    }
                });
                return filteredOrtu;
            });
        },
        getFilteredDataForExport() {
            const selectedColumnKeys = Object.keys(this.selectedFilters)
                .filter(key => this.selectedFilters[key]);

            // Jika tidak ada filter kolom yang dipilih, kembalikan semua kolom
            if (selectedColumnKeys.length === 0) {
                return this.filteredOrtuList.map((ortu, index) => {
                    const {
                        id,
                        no_kk,
                        nik_ayah,
                        nama_ayah,
                        pendidikan_ayah,
                        tahun_lahir_ayah,
                        pekerjaan_ayah,
                        penghasilan_ayah,
                        nik_ibu,
                        nama_ibu,
                        pendidikan_ibu,
                        tahun_lahir_ibu,
                        pekerjaan_ibu,
                        penghasilan_ibu,
                        no_telp
                    } = ortu;
                    return {
                        'No': index + 1,
                        ...rest,
                    };
                });
            }

            return this.ortuList.map((ortu, index) => {
                const filteredData = {
                    'No': index + 1
                };

                selectedColumnKeys.forEach(key => {
                    const backendKey = this.mapFrontendToBackendKey(key);
                    const label = this.getColumnLabel(key);
                    filteredData[label] = ortu[backendKey] ?? '-';
                });

                return filteredData;
            });
        },

        getColumnLabel(key) {
            const allFilters = [...this.firstRowFilters, ...this.secondRowFilters];
            const filter = allFilters.find(f => f.key === key);
            return filter ? filter.label : key;
        },

        async applyFilters() {
            try {
                // Map frontend keys to backend column names
                const columns = Object.keys(this.selectedFilters)
                    .filter(key => this.selectedFilters[key])
                    .map(key => this.mapFrontendToBackendKey(key));

                // If no columns selected, return all data
                if (columns.length === 0) {
                    return this.ortuList;
                }

                const response = await axios.get('/orangtua/export', {
                    params: {
                        columns
                    },
                    paramsSerializer: params => {
                        const searchParams = new URLSearchParams();
                        columns.forEach(col => searchParams.append('columns[]', col));
                        return searchParams.toString();
                    }
                });

                return response.data.data;
            } catch (error) {
                console.error('Error applying filters:', error);
                Swal.fire('Error', 'Gagal menerapkan filter', 'error');
                return this.ortuList; 
            }
        },

        mapFrontendToBackendKey(frontendKey) {
            const mapping = {
                noKK: 'no_kk',
                nikAyah: 'nik_ayah',
                namaAyah: 'nama_ayah',
                tahunLahirAyah: 'tahun_lahir_ayah',
                pendidikanAyah: 'pendidikan_ayah',
                pekerjaanAyah: 'pekerjaan_ayah',
                penghasilanAyah: 'penghasilan_ayah',
                noTelp: 'no_telp',
                nikIbu: 'nik_ibu',
                namaIbu: 'nama_ibu',
                tahunLahirIbu: 'tahun_lahir_ibu',
                pendidikanIbu: 'pendidikan_ibu',
                pekerjaanIbu: 'pekerjaan_ibu',
                penghasilanIbu: 'penghasilan_ibu',
            };
            return mapping[frontendKey] || frontendKey;
        },

        mapBackendToFrontendKey(backendKey) {
            const mapping = {
                'no_kk': 'noKK',
                'nik_ayah': 'nikAyah',
                'nama_ayah': 'namaAyah',
                'tahun_lahir_ayah': 'tahunLahirAyah',
                'pendidikan_ayah': 'pendidikanAyah',
                'pekerjaan_ayah': 'pekerjaanAyah',
                'penghasilan_ayah': 'penghasilanAyah',
                'no_telp': 'noTelp',
                'nik_ibu': 'nikIbu',
                'nama_ibu': 'namaIbu',
                'tahun_lahir_ibu': 'tahunLahirIbu',
                'pendidikan_ibu': 'pendidikanIbu',
                'pekerjaan_ibu': 'pekerjaanIbu',
                'penghasilan_ibu': 'penghasilanIbu',
            };
            return mapping[backendKey] || backendKey;
        },
        async exportData(format) {
            try {
                const filteredData = await this.applyFilters();

                if (format === 'pdf') {
                    await this.exportToPDF(filteredData);
                } else if (format === 'excel') {
                    await this.exportToExcel(filteredData);
                }
            } catch (error) {
                console.error("Export error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengekspor Data',
                    text: 'Terjadi kesalahan saat mengekspor data'
                });
            }
        },

        async exportToPDF(originalData) {
            try {
                const { jsPDF } = await import('jspdf');
                await import('jspdf-autotable');

                // Get selected columns
                const selectedColumns = Object.keys(this.selectedFilters)
                    .filter(key => this.selectedFilters[key])
                    .map(key => this.mapFrontendToBackendKey(key));

                // If no columns selected, use all columns
                const columnsToShow = selectedColumns.length > 0 ? selectedColumns : [
                    'no_kk', 'nik_ayah', 'nama_ayah', 'tahun_lahir_ayah', 'pendidikan_ayah',
                    'pekerjaan_ayah', 'penghasilan_ayah', 'nik_ibu', 'nama_ibu',
                    'tahun_lahir_ibu', 'pendidikan_ibu', 'pekerjaan_ibu', 'penghasilan_ibu', 'no_telp'
                ];

                const pdfColumnKeys = ['no', ...columnsToShow];
                const columnCount = pdfColumnKeys.length; 
            
                const data = originalData.map((item, index) => {
                    const row = { no: index + 1 };
                    columnsToShow.forEach(col => {
                        row[col] = item[col] ?? '-';
                    });
                    return row;
                });

                const orientation = columnsToShow.length > 5 ? 'landscape' : 'portrait';
                const doc = new jsPDF({ orientation, unit: 'mm' });

                doc.setFontSize(16);
                doc.setFont('times', 'bold');
                doc.text('LAPORAN DATA ORANGTUA SISWA PAUD AL UMMAH', doc.internal.pageSize.width / 2, 15, {
                    align: 'center'
                });

                doc.setFontSize(10);
                doc.setFont('times', 'normal');
                const date = new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                doc.text(`Dicetak pada: ${date}`, 14, 22);

                const headers = [
                    'No', 
                    ...columnsToShow.map(col => {
                        const headerMap = {
                            'no_kk': 'No KK',
                            'nik_ayah': 'NIK Ayah',
                            'nama_ayah': 'Nama Ayah',
                            'tahun_lahir_ayah': 'Tahun Lahir Ayah',
                            'pendidikan_ayah': 'Pendidikan Ayah',
                            'pekerjaan_ayah': 'Pekerjaan Ayah',
                            'penghasilan_ayah': 'Penghasilan Ayah',
                            'nik_ibu': 'NIK Ibu',
                            'nama_ibu': 'Nama Ibu',
                            'tahun_lahir_ibu': 'Tahun Lahir Ibu',
                            'pendidikan_ibu': 'Pendidikan Ibu',
                            'pekerjaan_ibu': 'Pekerjaan Ibu',
                            'penghasilan_ibu': 'Penghasilan Ibu',
                            'no_telp': 'No Telepon'
                        };
                        return headerMap[col] || col;
                    })
                ];

                const body = data.map(row => {
                    return [
                        row.no, 
                        ...columnsToShow.map(col => row[col] ?? '-')
                    ];
                });

                const pageWidth = doc.internal.pageSize.width;
                const margin = 14;
                const availableWidth = pageWidth - (margin * 2);

                const columnWidthsMap = this.calculateDynamicColumnWidths(headers, data, availableWidth);
                const scaledWidths = headers.map(header => columnWidthsMap[header]);

                const yPosition = 30; 

                doc.autoTable({
                    head: [headers],
                    body: body,
                    startY: yPosition + 10,
                    margin: {
                        left: margin,
                        right: margin
                    },
                    styles: {
                        fontSize: 8,
                        cellPadding: 2,
                        overflow: 'linebreak',
                        font: 'times',
                        textColor: [0, 0, 0],
                        minCellHeight: 6
                    },
                    headStyles: {
                        fillColor: [200, 200, 200], 
                        textColor: [0, 0, 0],
                        fontStyle: 'bold',
                        fontSize: 9,
                        halign: 'center'
                    },
                    columnStyles: headers.reduce((styles, header, index) => { 
                        styles[index] = {
                            cellWidth: scaledWidths[index],
                            halign: this.getColumnAlignment(header, data) 
                        };
                        return styles;
                    }, {}),
                    didDrawPage: (data) => {
                        // Footer
                        const pageCount = doc.internal.getNumberOfPages();
                        doc.setFontSize(8);
                        doc.setFont('times', 'normal');
                        doc.text(
                            `Halaman ${data.pageNumber} dari ${pageCount}`,
                            doc.internal.pageSize.width / 2,
                            doc.internal.pageSize.height - 10, {
                                align: 'center'
                            }
                        );
                    }
                });

                doc.save(`Data_Orangtua_${new Date().toISOString().slice(0, 10)}.pdf`);

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'PDF berhasil dibuat dan disimpan!',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire('Error', 'Gagal membuat PDF', 'error');
            }
        },
        calculateDynamicColumnWidths(headers, data, availableWidth) {
            const columnWidths = {};
            const contentLengths = {};

            const defaultWidths = {
                'no': 5,
                'no_kk': 25,
                'nik_ayah': 20,
                'nama_ayah': 30,
                'nik_ibu': 20,
                'nama_ibu': 30,
            };

            headers.forEach(header => {
                let maxLength = defaultWidths[header] || 15; // default minimum width

                const headerLength = header.length * 1.5; // approximate width in mm
                if (headerLength > maxLength) maxLength = headerLength;

                data.forEach(row => {
                    const content = row[header] ?.toString() || '';
                    const contentLength = content.length * 1.2; // approximate width in mm
                    if (contentLength > maxLength) maxLength = contentLength;
                });

                contentLengths[header] = Math.min(maxLength, 50); // cap at 50mm
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

            // Specific columns
            // if (['no', 'anak_ke', 'jumlah_saudara', 'berat_badan', 'tinggi_badan'].includes(header)) {
            //     return 'right';
            // }

            return 'left';
        },

        generateColumnStyles(columns, data) {
            const styles = {};
            const defaultWidth = 20;

            const specialWidths = {
                'No': 8,
                'No KK': 25,
                'NIK Ayah': 20,
                'Nama Ayah': 30,
                'NIK Ibu': 20,
                'Nama Ibu': 30,
            };

            columns.forEach((col, index) => {
                styles[index] = {
                    cellWidth: specialWidths[col] || defaultWidth,
                    halign: data && data[0] && typeof data[0][col] === 'number' ? 'right' : 'left'
                };
            });

            return styles;
        },

        async exportToExcel(data) {
            try {
                const XLSX = await import('xlsx');

                // Format data untuk Excel
                const excelData = data.map(row => {
                    const formattedRow = {};
                    Object.keys(row).forEach(key => {
                        if (key === 'id' || key === 'admin_id') return;

                        const headerLabel = this.headerMapping[key] || key;

                        // Handle null/undefined
                        if (row[key] === undefined || row[key] === null) {
                            formattedRow[headerLabel] = '-';
                            return;
                        }

                        // Format khusus untuk beberapa tipe data
                        switch (key) {
                            case 'tahun_lahir_ayah':
                            case 'tahun_lahir_ibu':
                                formattedRow[headerLabel] = row[key].toString();
                                break;
                            case 'penghasilan_ayah':
                            case 'penghasilan_ibu':
                                formattedRow[headerLabel] = typeof row[key] === 'number' ?
                                    row[key].toLocaleString('id-ID') :
                                    row[key];
                                break;
                            default:
                                formattedRow[headerLabel] = row[key];
                        }

                    });
                    return formattedRow;
                });

                // Buat worksheet
                const ws = XLSX.utils.json_to_sheet(excelData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Data Orangtua");

                // Set lebar kolom dinamis
                const columnWidths = {};
                excelData.forEach(row => {
                    Object.keys(row).forEach(key => {
                        const length = String(row[key]).length;
                        if (!columnWidths[key] || length > columnWidths[key]) {
                            columnWidths[key] = Math.min(Math.max(length, 10), 50); // Min 10, Max 50
                        }
                    });
                });

                ws['!cols'] = Object.keys(columnWidths).map(key => ({
                    wch: columnWidths[key]
                }));

                // Simpan file
                XLSX.writeFile(wb, `Data_Orangtua_${new Date().toISOString().slice(0, 10)}.xlsx`);

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Excel berhasil dibuat dan disimpan!',
                    timer: 2000,
                    showConfirmButton: false
                });

            } catch (error) {
                console.error('Error generating Excel:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengekspor Excel',
                    text: error.message
                });
                throw error;
            }
        },
        shouldShowColumn(columnName) {
            const columnToFilterMap = {
                'No KK': 'noKk',
                'Nama Ayah': 'namaAyah',
                'NIK Ayah': 'nikAyah',
                'Tahun Lahir Ayah': 'tahunLahirAyah',
                'Pekerjaan Ayah': 'pekerjaanAyah',
                'Pendidikan Ayah': 'pendidikanAyah',
                'Penghasilan Ayah': 'penghasilanAyah',
                'NIK Ibu': 'nikIbu',
                'Nama Ibu': 'namaIbu',
                'Pendidikan Ibu': 'pendidikanIbu',
                'Tahun Lahir Ibu': 'tahunLahirIbu',
                'Pekerjaan Ibu': 'pekerjaanIbu',
                'Penghasilan Ibu': 'penghasilanIbu',
                'Nomor Telepon': 'noTelp'
            };

            const filterKey = columnToFilterMap[columnName];
            if (filterKey) {
                return this.selectedFilters[filterKey] ||
                    this.displayedColumns.includes(columnName);
            }
            return this.displayedColumns.includes(columnName);
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

                    this.ortuList = this.ortuList.filter(ortu => ortu.id !== orangtuaId);
                    Swal.fire('Terhapus!', 'Data orangtua berhasil dihapus.', 'success');
                    this.dropdownIndex = null;
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data orangtua!', 'error');
            }
        },
        handleClickOutside(event) {
            const popups = this.$refs.popup;
            const clickedInside = Array.isArray(popups)
                ? popups.some(popup => popup.contains(event.target))
                : popups && popups.contains(event.target);

            if (!clickedInside) {
                this.dropdownIndex = null;
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    computed: {
        displayedColumns() {
            const selected = Object.keys(this.selectedFilters)
                .filter(key => this.selectedFilters[key]);

            if (selected.length === 0) {
                return [
                    'No', 'No KK', 'NIK Ayah', 'NIK Ibu', 'Nama Ayah', 'Nama Ibu', 'Tahun Lahir Ayah',
                    'Tahun Lahir Ibu', 'Pendidikan Ayah', 'Pendidikan Ibu', 'Pekerjaan Ayah', 'Pekerjaan Ibu',
                    'Penghasilan Ayah', 'Penghasilan Ibu', 'No Telp'
                ];
            }

            return selected.map(key => this.getColumnLabel(key));
        },
        
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
            return this.filteredOrtuList.slice(startIndex, endIndex); 
        },
        totalPages() {
            return Math.ceil(this.ortuList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredOrtuList.length);
            return `Showing ${startRow}-${endRow} of ${this.filteredOrtuList.length} entries`;
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);

        (this.ortuList);

        this.ortuList = this.ortuList.filter(
            (item, index, self) => index === self.findIndex((t) => t.id === item.id)
        );
    }
};
</script>

<style scoped>
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
.modal-content-ortu {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
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

/* Layout dua kolom */
.filter-container {
    display: flex;
    justify-content: space-between;
}

.column {
    width: 48%;
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
    margin-top: 4rem;
}

.breadcrumb {
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

.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
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

.popup .btn {
    box-shadow: none;
    border: none;
    background: transparent;
    padding: 0;
}

.popup {
    position: relative;
}

.popup-menu {
    position: absolute;
    top: 100%;
    transform: translateX(-30px);
    left: 0;
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

.no-data-text {
    font-size: 16px;
    color: #6c757d;
    /* Warna teks abu-abu */
}

.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
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

  .modal-content-ortu,
  .table-wrapper-ortu {
    width: 40vh;
  }
}
</style>
