<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" class="breadcrumb-stu">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Siswa</li>
            </ol>
        </nav>
        <h4 class="header-text">Siswa</h4>
    </section>
    <section class="content">
        <div class="table-wrapper">
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
                    <!-- Show filter button -->
                    <div class="filter">
                        <button @click="toggleFilterPopup" class="filter-btn">
                            Filter
                            <i class="fa-solid fa-filter filter-icon"></i>
                        </button>
                        <!-- Filter Popup -->
                        <div v-if="isFilterPopupVisible" class="filter-popup">
                            <!-- first row -->
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.NIS" />
                                        NISN
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.nama" />
                                        Nama
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.jenisKelamin" />
                                        Jenis Kelamin
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.nik" />
                                        NIK
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.rombel" />
                                        Rombel
                                    </label>
                                </div>
                            </div>
                            <!-- second row -->
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.tempatLahir">
                                        Tempat Lahir
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.tanggalLahir" />
                                        Tanggal Lahir
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.agama" />
                                        Agama
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.alamat" />
                                        Alamat
                                    </label>
                                </div>
                            </div>
                            <!-- fourth row -->
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.orangtua" />
                                        Nama Ayah
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Export -->
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
                    <div>
                        <router-link to="/adminmainsidebar/addStudents">
                            <span class="material-symbols-outlined btn-add-ortu">
                                add_circle
                            </span>
                        </router-link>
                    </div>
                </div>
                <!-- Pencarian -->
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
                        <th scope="col" class="table-head" v-if="selectedFilters.NIS">NISN</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nama">Nama Lengkap</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jenisKelamin">Jenis Kelamin</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.rombel">Rombel Saat Ini</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tempatLahir">Tempat Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.tanggalLahir">Tanggal Lahir</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.nik">NIK</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.agama.length">Agama</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.alamat">Alamat</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.rt">RT</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.rw">RW</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.dusun">Dusun</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.kelurahan">Kelurahan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.kecamatan">Kecamatan</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.kodepos">Kode Pos</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.jenisTinggal">Jenis Tinggal</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.alatTransportasi">Alat Transportasi</th>
                        <th scope="col" class="table-head" v-if="selectedFilters.orangtua">Nama Ayah</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(siswa, index) in paginatedSiswaList" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td v-if="selectedFilters.NIS">{{ siswa.NIS }}</td>
                        <td v-if="selectedFilters.nama">{{ siswa.nama }}</td>
                        <td v-if="selectedFilters.jenisKelamin">{{ siswa.jenisKelamin }}</td>
                        <td v-if="selectedFilters.rombel">{{ siswa.rombel }}</td>
                        <td v-if="selectedFilters.tempatLahir">{{ siswa.tempatLahir }}</td>
                        <td v-if="selectedFilters.tanggalLahir">{{ siswa.tanggalLahir }}</td>
                        <td v-if="selectedFilters.nik">{{ siswa.nik }}</td>
                        <td v-if="selectedFilters.agama.length">{{ siswa.agama }}</td>
                        <td v-if="selectedFilters.alamat">{{ siswa.alamat }}</td>
                        <td v-if="selectedFilters.rt">{{ siswa.rt }}</td>
                        <td v-if="selectedFilters.rw">{{ siswa.rw }}</td>
                        <td v-if="selectedFilters.dusun">{{ siswa.dusun }}</td>
                        <td v-if="selectedFilters.kelurahan">{{ siswa.kelurahan }}</td>
                        <td v-if="selectedFilters.kecamatan">{{ siswa.kecamatan }}</td>
                        <td v-if="selectedFilters.kodepos">{{ siswa.kodepos }}</td>
                        <td v-if="selectedFilters.jenisTinggal">{{ siswa.jenisTinggal }}</td>
                        <td v-if="selectedFilters.alatTransportasi">{{ siswa.alatTransportasi }}</td>
                        <td v-if="selectedFilters.orangtua">{{ siswa.orangtua }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="prepareEditSiswa(siswa)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteSiswa(siswa.nomorInduk)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedSiswaList.length === 0">
                        <td colspan="7" style="text-align: center">Tidak ada data</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-info">
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
import Papa from "papaparse";

export default {
    data() {
        return {
            rowsPerPage: 5,
            currentPage: 1,
            dropdownIndex: null,
            searchQuery: '', // for filtering
            isFilterPopupVisible: false, // Show/Hide filter popup
            selectedFilters: {
                NIS: true,
                nama: true,
                jenisKelamin: true,
                agama: false,
                nik: true,
                rombel: true,
                tempatLahir: false,
                tanggalLahir: false,
                alamat: false,
                rt: false,
                rw: false,
                dusun: false,
                kelurahan: false,
                kecamatan: false,
                kodepos: false,
                jenisTinggal: false,
                alatTransportasi: false,
                orangtua: false,
            },
            // Mock data for testing
            siswaList: [{
                    NIS: '3198261671',
                    agama: 'Islam',
                    nama: 'ABIDAH FADIYAH',
                    jenisKelamin: 'Perempuan',
                    nik: '3507226112190001',
                    rombel: 'KELAS A1',
                    tempatLahir: 'MALANG',
                    tanggalLahir: '2019-12-21',
                    alamat: 'JALAN DIENG ATAS',
                    rt: '3',
                    rw: '1',
                    dusun: 'SUMBERJO',
                    kelurahan: 'Kalisongo',
                    kecamatan: 'Dau',
                    kodepos: '65151',
                    jenisTinggal: 'Bersama orang tua',
                    alatTransportasi: 'Sepeda motor',
                    orangtua: 'DARMAWAN'
                },
                {
                    NIS: '3194836415',
                    agama: 'Islam',
                    nama: 'ABIDZAR OTTAH JANUAREZA',
                    jenisKelamin: 'Laki-Laki',
                    nik: '3573050301190004',
                    rombel: 'KELAS B2',
                    tempatLahir: 'MALANG',
                    tanggalLahir: '2019-01-03',
                    alamat: 'JALAN KERTO SENTONO 45 A',
                    rt: '0',
                    rw: '0',
                    dusun: '',
                    kelurahan: 'Ketawanggede',
                    kecamatan: 'Kalisongo',
                    kodepos: '',
                    jenisTinggal: 'Bersama orang tua',
                    alatTransportasi: 'Sepeda motor',
                    orangtua: ''
                },
                {
                    NIS: '3201515568',
                    agama: 'Islam',
                    nama: 'AFIFAH ZAHRA RATIFAH',
                    jenisKelamin: 'Perempuan',
                    nik: '3507225706200002',
                    rombel: 'KELAS PG MENTARI',
                    tempatLahir: 'MALANG',
                    tanggalLahir: '2020-06-17',
                    alamat: 'DUSUN SUMBERJO',
                    rt: '3',
                    rw: '2',
                    dusun: 'SUMBERJO',
                    kelurahan: 'Kalisongo',
                    kecamatan: 'Dau',
                    kodepos: '65151',
                    jenisTinggal: 'Bersama orang tua',
                    alatTransportasi: 'Jalan Kaki',
                    orangtua: 'ALI MUSTOFA'
                },
                {
                    NIS: '',
                    agama: 'Islam',
                    nama: 'AFNAN HAMIM ALGIFARI',
                    jenisKelamin: 'Laki-Laki',
                    nik: '3507220603200003',
                    rombel: 'KELAS PG MATAHARI',
                    tempatLahir: 'MALANG',
                    tanggalLahir: '2020-03-16',
                    alamat: 'JALAN DIENG ATAS',
                    rt: '1',
                    rw: '3',
                    dusun: 'KUNCI',
                    kelurahan: 'Kalisongo',
                    kecamatan: 'Dau',
                    kodepos: '65151',
                    jenisTinggal: 'Bersama orang tua',
                    alatTransportasi: 'Sepeda Motor',
                    orangtua: 'EKY SANDIANA RIZAL'
                },
                {
                    NIS: '3201926120',
                    agama: 'Islam',
                    nama: 'AGHLAN DEVANKA KALANDRA',
                    jenisKelamin: 'Laki-Laki',
                    nik: '3573021703200003',
                    rombel: 'KELAS PG MATAHARI',
                    tempatLahir: 'MALANG',
                    tanggalLahir: '2020-03-17',
                    alamat: 'JL. EMBONG BRANTAS GG. SD / 1A',
                    rt: '6',
                    rw: '7',
                    dusun: '',
                    kelurahan: 'Kidul Dalem',
                    kecamatan: 'Klojen',
                    kodepos: '65119',
                    jenisTinggal: 'Bersama orang tua',
                    alatTransportasi: 'Sepeda Motor',
                    orangtua: 'AGUS SUPRIYANTO, ST',
                },
            ],
            headerMapping: {
                NIS: 'Nomor Induk Siswa',
                nama: 'Nama Lengkap',
                jenisKelamin: 'Jenis Kelamin',
                agama: 'Agama',
                nik: 'NIK',
                rombel: 'Rombel',
                tempatLahir: 'Tempat Lahir',
                tanggalLahir: 'Tanggal Lahir',
                alamat: 'Alamat',
            }
        };
    },
    methods: {
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        toggleFilterPopup() {
            this.isFilterPopupVisible = !this.isFilterPopupVisible;
        },
        applyFilters() {
            this.isFilterPopupVisible = false;
        },
        // Placeholder methods for edit and delete
        prepareEditSiswa(siswa) {
            console.log('Editing:', siswa);
        },
        deleteSiswa(nomorInduk) {
            console.log('Deleting:', nomorInduk);
            // Add delete logic here
        },
        handleClickOutside(event) {
            if (this.$refs.popup && !this.$refs.popup.contains(event.target)) {
                this.dropdownIndex = null;
            }
        },
        changePage(page) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Fungsi untuk mendapatkan data berdasarkan filter aktif
        getFilteredData() {
            return this.siswaList.map((siswa, index) => {
                const filteredSiswa = { No: index + 1 }; // Menambahkan nomor urut
                Object.keys(this.selectedFilters).forEach(key => {
                    if (this.selectedFilters[key]) {
                        filteredSiswa[key] = siswa[key];
                    }
                });
                return filteredSiswa;
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
                const data = filteredData.map(siswa => headers.map(key => siswa[key] || ''));

                doc.autoTable({
                    head: [headerLabels],
                    body: data,
                });

                doc.save('filtered_data.pdf');
            } else if (format === 'excel') {
                const data = [headerLabels, ...filteredData.map(siswa => headers.map(key => siswa[key] || ''))];
                const csv = Papa.unparse(data);

                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'filtered_data.csv';
                link.click();
            }
        },
    },
    computed: {
        // Filter siswa list based on search query
        filteredSiswaList() {
            return this.siswaList.filter((siswa) =>
                siswa.nama.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        // Paginate daftar siswa
        paginatedSiswaList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredSiswaList.slice(start, end);
        },
        // Total halaman berdasarkan jumlah siswa
        totalPages() {
            return Math.ceil(this.filteredSiswaList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredSiswaList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredSiswaList.length} entries`;
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style>
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
    position: relative;
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
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    /* Menghilangkan tampilan default */
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    background-color: white;
    /* Warna dasar putih */
}

.checkbox:checked {
    text-align: center;
    background-color: #007bff;
    /* Warna saat di-checked */
    border-color: #007bff;
    /* Border sesuai dengan warna utama */
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

.export-section {
    margin-left: 0.5rem;
}

.search-bar-container {
    display: flex;
    align-items: center;
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
    width: 65rem;
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
    border-collapse: collapse;
    min-width: 50rem;
    margin-top: 1rem;
}

.data-table th,
.data-table td {
    padding: 12px 8px;
    /* Added more padding for a cleaner look */
    text-align: left;
}

.data-table .table-head {
    font-weight: 800;
    color: #336C2A;
}

.data-table td:last-child {
    text-align: center;
    /* Align the 'Action' column */
}

.data-table th:last-child {
    text-align: center;
    /* Align the 'Action' column */
}

.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
    /* Light gray background for alternating rows */
}

.data-table tr:hover {
    background-color: #f1f1f1;
    /* Light hover effect */
}

.popup .btn {
    box-shadow: none;
    /* Remove the box shadow */
    border: none;
    /* Optionally, remove any border */
    background: transparent;
    /* If you want the background to be transparent */
    padding: 0;
    /* Adjust padding if necessary */
}

.popup-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    /* Bayangan abu-abu */
    padding: 10px;
    border-radius: 8px;
    display: none;
    /* Awalnya tidak terlihat */
    z-index: 1000;
}

.popup-menu.show {
    display: block;
    /* Tampilkan popup saat dropdownIndex === index */
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

.popup-item:hover {
    background-color: #f5f5f5;
}

.pagination-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
}

.page-info {
    margin: 0;
}

.pagination {
    margin: 0;
}
</style>
