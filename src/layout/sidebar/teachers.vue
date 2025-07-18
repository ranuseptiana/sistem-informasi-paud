<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Guru</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Guru</h3>
            <router-link to="/adminmainsidebar/addTeachers" class="btn-add">
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
                        <th scope="col" class="table-head">NIP</th>
                        <th scope="col" class="table-head">Nama Lengkap</th>
                        <th scope="col" class="table-head">Jenis Kelamin</th>
                        <th scope="col" class="table-head">Tempat Lahir</th>
                        <th scope="col" class="table-head">Tanggal Lahir</th>
                        <th scope="col" class="table-head">Agama</th>
                        <th scope="col" class="table-head">Alamat</th>
                        <th scope="col" class="table-head">No Telp</th>
                        <th scope="col" class="table-head">Jabatan</th>
                        <th scope="col" class="table-head">Kelas Yang Diajar</th>
                        <th scope="col" class="table-head">Jumlah Hari Mengajar</th>
                        <th scope="col" class="table-head">Tugas Mengajar</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(guru, index) in paginatedGuruList" :key="guru.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td>{{ guru.nip }}</td>
                        <td>{{ guru.nama_lengkap }}</td>
                        <td>{{ guru.gender }}</td>
                        <td>{{ guru.tempat_lahir }}</td>
                        <td>{{ guru.tgl_lahir }}</td>
                        <td>{{ guru.agama }}</td>
                        <td>{{ guru.alamat }}</td>
                        <td>{{ guru.no_telp }}</td>
                        <td>{{ guru.jabatan }}</td>
                        <td>{{ guru.kelasDiampu }}</td>
                        <td>{{ guru.jumlah_hari_mengajar }}</td>
                        <td>{{ guru.tugas_mengajar }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu-guru" :class="{ show: dropdownIndex === index }" v-if="dropdownIndex === index">
                                    <button class="popup-item" @click="editGuru(guru.id)" style="color: #274278">Edit</button>
                                    <button class="popup-item" @click="deleteGuru(guru.id)" style="color: red">Hapus</button>
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
    computed,
    onMounted
} from 'vue';

export default {
    data() {
        return {
            rowsPerPage: 5,
            currentPage: 1,
            showModal: false,
            dropdownIndex: null,
            searchQuery: '', 
        };
    },
    setup() {
        const guruList = ref([]);
        const kelasList = ref([]);
        const relasiKelasList = ref([]);

        const fetchGuruList = () => {
            axios.get("/guru", {
                    withCredentials: true
                })
                .then((res) => {
                    guruList.value = res.data.data;
                })
                .catch((error) => (error.response.data));
        };

        const fetchKelasList = () => {
            axios.get("/kelas")
                .then((res) => {
                    if (res.data && Array.isArray(res.data.data)) {
                        kelasList.value = res.data.data;
                    } else {
                        console.error("Format data kelas tidak sesuai", res.data);
                        kelasList.value = [];
                    }
                })
                .catch(error => console.error("Error fetching kelas:", error));
        };

        const fetchRelasiKelasList = () => {
            axios.get("/relasikelas")
                .then((res) => {
                    relasiKelasList.value = res.data.data;
                })
                .catch(error => console.error("Error fetching relasi kelas:", error));
        };

        const guruWithKelas = computed(() => {
            return guruList.value.map(guru => {
                const kelasDiampu = relasiKelasList.value
                    .filter(relasi => relasi.guru_id === guru.id) 
                    .map(relasi => {
                        const kelas = kelasList.value.find(k => k.id === relasi.kelas_id);
                        return kelas ? kelas.nama_kelas : "Tidak Diketahui"; 
                    });

                return {
                    ...guru,
                    kelasDiampu: kelasDiampu.join(", ")
                };
            });
        });

        onMounted(() => {
            fetchGuruList();
            fetchKelasList();
            fetchRelasiKelasList();
        });

        return {
            guruWithKelas,
            fetchGuruList,
            kelasList,
            relasiKelasList,
        };
    },
    methods: {
        exportData(format) {
            const dataToExport = this.filteredGuruList; 

            if (format === 'pdf') {
                this.exportToPDF(dataToExport); 
            } else if (format === 'excel') {
                this.exportGuruToExcel(dataToExport); 
            } else if (format === 'json') {
                axios.get('/guru/export')
                    .then(response => {
                        const dataStr = JSON.stringify(response.data.data, null, 2);
                        const blob = new Blob([dataStr], { type: 'application/json' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'data_guru.json';
                        link.click();
                    })
                    .catch(err => {
                        console.error('Export failed:', err);
                    });
            }
        },

        async exportToPDF(originalData) {
            try {
                const { jsPDF } = await import('jspdf');
                await import('jspdf-autotable');

                const data = originalData;

                const doc = new jsPDF({ orientation: 'landscape', unit: 'mm' });

                doc.setFontSize(16);
                doc.setFont('times', 'bold');
                doc.text('LAPORAN DATA GURU PAUD AL UMMAH', doc.internal.pageSize.width / 2, 15, { align: 'center' });

                doc.setFontSize(10);
                doc.setFont('times', 'normal');
                const date = new Date().toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });
                doc.text(`Dicetak pada: ${date}`, 14, 22);

                const headers = [
                    'No', 'NIP', 'Nama Lengkap', 'Gender', 'Tempat Lahir', 'Tanggal Lahir',
                    'Agama', 'Alamat', 'No Telepon', 'Jabatan', 'Kelas Yang Diajar',
                    'Jumlah Hari Mengajar', 'Tugas Mengajar'
                ];

                const body = data.map((item, index) => [
                    index + 1,
                    item.nip || '-', item.nama_lengkap || '-', item.gender || '-',
                    item.tempat_lahir || '-', item.tgl_lahir || '-', item.agama || '-',
                    item.alamat || '-', item.no_telp || '-', item.jabatan || '-',
                    item.kelasDiampu || '-', item.jumlah_hari_mengajar || '-', item.tugas_mengajar || '-'
                ]);

                const margin = 14;
                const availableWidth = doc.internal.pageSize.width - margin * 2;
                const columnCount = headers.length;
                const defaultCellWidth = availableWidth / columnCount;

                doc.autoTable({
                    head: [headers],
                    body: body,
                    startY: 30,
                    margin: { left: margin, right: margin },
                    styles: {
                        font: 'times',
                        fontSize: 8,
                        textColor: [0, 0, 0],
                        cellPadding: 2,
                        minCellHeight: 6,
                        overflow: 'linebreak'
                    },
                    headStyles: {
                        fillColor: [200, 200, 200], 
                        textColor: [0, 0, 0],
                        fontStyle: 'bold',
                        halign: 'center',
                        fontSize: 9
                    },
                    columnStyles: headers.reduce((cols, _, i) => {
                        cols[i] = { cellWidth: defaultCellWidth, halign: 'left' };
                        return cols;
                    }, {}),
                    didDrawPage: (data) => {
                        const pageCount = doc.internal.getNumberOfPages();
                        doc.setFontSize(8);
                        doc.setFont('times', 'normal');
                        doc.text(`Halaman ${data.pageNumber} dari ${pageCount}`,
                            doc.internal.pageSize.width / 2,
                            doc.internal.pageSize.height - 10,
                            { align: 'center' });
                    }
                });

                doc.save(`Data_Guru_${new Date().toISOString().slice(0, 10)}.pdf`);
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
        async exportGuruToExcel() {
            try {
                const XLSX = await import('xlsx');
                const data = this.guruWithKelas;

                const formatted = data.map(item => ({
                    'NIP': item.nip || '-', 'Nama Lengkap': item.nama_lengkap || '-',
                    'Gender': item.gender || '-', 'Tempat Lahir': item.tempat_lahir || '-',
                    'Tanggal Lahir': item.tgl_lahir || '-', 'Agama': item.agama || '-',
                    'Alamat': item.alamat || '-', 'No Telepon': item.no_telp || '-',
                    'Jabatan': item.jabatan || '-', 'Kelas Yang Diajar': item.kelasDiampu || '-',
                    'Jumlah Hari Mengajar': item.jumlah_hari_mengajar || '-', 'Tugas Mengajar': item.tugas_mengajar || '-'
                }));

                const ws = XLSX.utils.json_to_sheet(formatted);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Data Guru');

                ws['!cols'] = Object.keys(formatted[0]).map(key => ({
                    wch: Math.min(Math.max(key.length, 15), 50)
                }));

                XLSX.writeFile(wb, `Data_Guru_${new Date().toISOString().slice(0, 10)}.xlsx`);
                Swal.fire('Berhasil', 'Excel berhasil dibuat dan disimpan!', 'success');
            } catch (error) {
                console.error('Excel Export Error:', error);
                Swal.fire('Error', 'Gagal membuat Excel', 'error');
            }
        },
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
            this.dropdownIndex = null;
        },
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
        editGuru(id) {
            this.dropdownIndex = null;

            this.$router.push(`/adminmainsidebar/addTeachers/${id}`);
        },
        async deleteGuru(guruId) {
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
                    const response = await axios.delete(`/guru/${guruId}`);

                    Swal.fire('Terhapus!', 'Data guru berhasil dihapus.', 'success');

                    this.fetchGuruList();
                }
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data guru!', 'error');
            }
        },
    },
    computed: {
        // guruWithKelas() {
        //     return this.guruList.map(guru => {
        //         const kelasDiampu = this.relasiKelasList
        //             .filter(relasi => relasi.guru_id === guru.id) 
        //             .map(relasi => {
        //                 const kelas = this.kelasList.find(k => k.id === relasi.kelas_id);
        //                 return kelas ? kelas.nama_kelas : "Tidak Diketahui";
        //             });

        //         return {
        //             ...guru,
        //             kelasDiampu: kelasDiampu.join(", ") 
        //         };
        //     });
        // },
        paginatedGuruList() {
            const startIndex = (this.currentPage - 1) * this.rowsPerPage;
            const endIndex = startIndex + this.rowsPerPage;
            return this.filteredGuruList.slice(startIndex, endIndex);
        },
        filteredGuruList() {
            const query = this.searchQuery.toLowerCase();
            return this.guruWithKelas.filter(guru => {
                return Object.keys(guru).some(key => {
                    return guru[key] && String(guru[key]).toLowerCase().includes(query);
                });
            });
        },
        totalPages() {
            return Math.ceil(this.guruWithKelas.length / this.rowsPerPage);
        },
        pageInfo() {
            const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
            const endRow = Math.min(this.currentPage * this.rowsPerPage, this.guruWithKelas.length);
            return `Showing ${startRow} - ${endRow} of ${this.guruWithKelas.length} entries`;
        },
    },
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

.btn-add {
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

.btn-add:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.btn-add i {
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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
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

.popup-menu-guru {
    position: absolute;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px;
    transform: translateX(-30px);    
    border-radius: 8px;
    display: none;
    z-index: 1000;
}

.popup-menu-guru.show {
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
  .table-wrapper {
    width: 40vh;
  }
}
</style>
