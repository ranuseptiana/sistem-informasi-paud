<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" class="breadcrumb-stu">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Guru</li>
            </ol>
        </nav>
        <h4 class="header-text">Guru</h4>
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
                    <div class="filter">
                        <button @click="toggleFilterPopup" class="filter-btn">
                            Filter
                            <i class="fa-solid fa-filter filter-icon"></i>
                        </button>
                        <!-- Filter Popup -->
                        <div v-if="isFilterPopupVisible" class="filter-popup-ortu">
                            <!-- first row -->
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.noKK" />
                                        No KK
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.nikAyah" />
                                        NIK Ayah
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.tahunLahirAyah" />
                                        Tahun Lahir Ayah
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.pendidikanAyah" />
                                        Pendidikan Ayah
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.pekerjaanAyah" />
                                        Pekerjaan Ayah
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.penghasilanAyah" />
                                        Penghasilan Ayah
                                    </label>
                                </div>
                            </div>
                            <!-- second row -->
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.noHp" />
                                        No HP
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.nikIbu" />
                                        NIK Ibu
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.tahunLahirIbu" />
                                        Tahun Lahir Ibu
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.pendidikanIbu" />
                                        Pendidikan Ibu
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.pekerjaanIbu" />
                                        Pekerjaan Ibu
                                    </label>
                                </div>
                                <div class="col">
                                    <label>
                                        <input type="checkbox" class="checkbox" v-model="selectedFilters.penghasilanIbu" />
                                        Penghasilan Ibu
                                    </label>
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
                    <div>
                        <router-link to="/adminmainsidebar/addParents">
                            <span class="material-symbols-outlined btn-add-ortu">
                                add_circle
                            </span>
                        </router-link>
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
                    <tr v-for="(ortu, index) in paginatedOrtuList" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td v-if="selectedFilters.noKK">{{ ortu.noKK }}</td>
                        <td v-if="selectedFilters.nikAyah">{{ ortu.nikAyah }}</td>
                        <td v-if="selectedFilters.namaAyah">{{ ortu.namaAyah }}</td>
                        <td v-if="selectedFilters.tahunLahirAyah">{{ ortu.tahunLahirAyah }}</td>
                        <td v-if="selectedFilters.pendidikanAyah">{{ ortu.pendidikanAyah }}</td>
                        <td v-if="selectedFilters.pekerjaanAyah">{{ ortu.pekerjaanAyah }}</td>
                        <td v-if="selectedFilters.penghasilanAyah">{{ ortu.penghasilanAyah }}</td>
                        <td v-if="selectedFilters.nikIbu">{{ ortu.nikIbu }}</td>
                        <td v-if="selectedFilters.namaIbu">{{ ortu.namaIbu }}</td>
                        <td v-if="selectedFilters.tahunLahirIbu">{{ ortu.tahunLahirIbu }}</td>
                        <td v-if="selectedFilters.pendidikanIbu">{{ ortu.pendidikanIbu }}</td>
                        <td v-if="selectedFilters.pekerjaanIbu">{{ ortu.pekerjaanIbu }}</td>
                        <td v-if="selectedFilters.penghasilanIbu">{{ ortu.penghasilanIbu }}</td>
                        <td v-if="selectedFilters.noHp">{{ ortu.noHp }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="prepareEditOrtu(ortu)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteOrtu(ortu.noKK)" style="color: red">Hapus</button>
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
import Swal from "sweetalert2";
import Papa from "papaparse";

export default {
    data() {
        return {
            rowsPerPage: 5,
            currentPage: 1,
            openModal: false,
            errorNoKK: "",
            editOrtu: null,
            dropdownIndex: null,
            searchQuery: '', // for filtering
            isFilterPopupVisible: false, // Show/Hide filter popup
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
                noHp: true,
            },
            newOrtu: {
                noKK: "",
                nikAyah: "",
                namaAyah: "",
                tahunLahirAyah: "",
                pendidikanAyah: "",
                pekerjaanAyah: "",
                penghasilanAyah: "",
                nikIbu: "",
                namaIbu: "",
                tahunLahirIbu: "",
                pendidikanIbu: "",
                pekerjaanIbu: "",
                penghasilanIbu: "",
                noHp: "",
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
            }
        };
    },
    methods: {
        validateNumberInput() {
            const noKK = this.newOrtu.noKK;
            if (!/^\d*$/.test(noKK)) {
                this.errorNoKK = "Nomor KK hanya boleh berupa angka!";
                this.newOrtu.noKK = noKK.replace(/\D/g, ""); // Hapus karakter non-angka
            } else {
                this.errorNoKK = "";
            }
        },
        validatesOrtuForm() {
            const {
                noKK,
                nikAyah,
                namaAyah,
                tahunLahirAyah,
                pendidikanAyah,
                pekerjaanAyah,
                penghasilanAyah,
                nikIbu,
                namaIbu,
                tahunLahirIbu,
                pendidikanIbu,
                pekerjaanIbu,
                penghasilanIbu,
                noHp,
            } = this.newOrtu;

            if (!noKK ||
                !nikAyah ||
                !namaAyah ||
                !tahunLahirAyah ||
                !pendidikanAyah ||
                !pekerjaanAyah ||
                !penghasilanAyah ||
                !nikIbu ||
                !namaIbu ||
                !tahunLahirIbu ||
                !pendidikanIbu ||
                !pekerjaanIbu ||
                !penghasilanIbu ||
                !noHp) {
                Swal.fire({
                    title: "Peringatan!",
                    text: "Semua kolom harus diisi.",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return false;
            }
            return true;
        },
        addOrtu() {
            if (
                this.newOrtu.noKK &&
                this.newOrtu.nikAyah &&
                this.newOrtu.namaAyah &&
                this.newOrtu.tahunLahirAyah &&
                this.newOrtu.pendidikanAyah &&
                this.newOrtu.pekerjaanAyah &&
                this.newOrtu.penghasilanAyah &&
                this.newOrtu.nikIbu &&
                this.newOrtu.namaIbu &&
                this.newOrtu.tahunLahirIbu &&
                this.newOrtu.pendidikanIbu &&
                this.newOrtu.pekerjaanIbu &&
                this.newOrtu.penghasilanIbu &&
                this.newOrtu.noHp
            ) {
                if (this.isEditMode) {
                    // Jika dalam mode edit, update data
                    const index = this.ortuList.findIndex(ortu => ortu.noKK === this.editOrtu);
                    if (index !== -1) {
                        this.ortuList.splice(index, 1, {
                            ...this.newOrtu
                        });
                    }
                } else {
                    // Jika tidak, tambahkan data baru
                    this.ortuList.push({
                        ...this.newOrtu
                    });
                }

                Swal.fire({
                    title: "Sukses!",
                    text: this.isEditMode ?
                        "Data berhasil diperbarui!" : "Data berhasil ditambahkan!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                this.resetForm();
                this.closeModal();
            } else {
                Swal.fire({
                    title: "Peringatan!",
                    text: "Lengkapi semua data sebelum menyimpan!",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            }
        },
        saveEditOrtu() {
            const index = this.ortuList.findIndex(item => item.noKK === this.editOrtu);
            if (index !== -1) {
                this.ortuList.splice(index, 1, {
                    ...this.newOrtu
                }); // Update data di array lokal
                Swal.fire({
                    title: "Sukses!",
                    text: "Data berhasil diperbarui.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Data tidak ditemukan.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            this.closeModal();
            this.resetForm();
        },
        prepareEditOrtu(ortu) {
            this.newOrtu = {
                ...ortu
            }; // Salin data yang akan diedit
            this.editOrtu = ortu.noKK; // Simpan ID untuk identifikasi
            this.openModal = true; // Tampilkan modal edit
        },
        deleteOrtu(noKK) {
            Swal.fire({
                title: "Anda yakin?",
                text: "Data ini akan dihapus!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus!",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Cari index data di dalam array
                    const index = this.ortuList.findIndex((ortu) => ortu.noKK === noKK);
                    if (index !== -1) {
                        this.ortuList.splice(index, 1); // Hapus data dari array
                    }

                    Swal.fire({
                        title: "Terhapus!",
                        text: "Data berhasil dihapus.",
                        icon: "success",
                    });
                }
            });
        },
        closeModal() {
            this.openModal = false;
            this.resetForm();
        },
        resetForm() {
            this.newGuru = {
                noKK: "",
                nikAyah: "",
                namaAyah: "",
                tahunLahirAyah: "",
                pendidikanAyah: "",
                pekerjaanAyah: "",
                penghasilanAyah: "",
                nikIbu: "",
                namaIbu: "",
                tahunLahirIbu: "",
                pendidikanIbu: "",
                pekerjaanIbu: "",
                penghasilanIbu: "",
                noHp: "",
            };
            this.editOrtu = null;
        },
        toggleDropdown(index) {
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
        },
        toggleFilterPopup() {
            this.isFilterPopupVisible = !this.isFilterPopupVisible;
        },
        applyFilters() {
            this.isFilterPopupVisible = false;
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
        openModal() {
            this.openModal = true;
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
    },
    computed: {
        // Filter guru list based on search query
        filteredGuruList() {
            return this.ortuList.filter((ortu) =>
                ortu.namaAyah.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        isEditMode() {
            return this.editOrtu !== null;
        },
        // Paginate daftar guru
        paginatedGuruList() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.ortuList.slice(start, end);
        },
        // Total halaman berdasarkan jumlah siswa
        totalPages() {
            return Math.ceil(this.filteredGuruList.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredOrtuList.length);
            return `Showing ${startRow} - ${endRow} of ${this.filteredOrtuList.length} entries`;
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
