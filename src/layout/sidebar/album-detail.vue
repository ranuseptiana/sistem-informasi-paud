<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/gallery">Galeri</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Detail Galeri {{ albumName ? ' - ' + albumName : '' }}
                </li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Detail Galeri{{ albumName ? ' - ' + albumName : '' }}</h3> 
            <button class="btn-add-class" @click="prepareTambahFoto">Tambah Data
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
            </div>
            <!-- Modal -->
            <div class="custom-modal" v-if="showModal">
                <div class="custom-modal-dialog">
                    <div class="custom-modal-content">
                        <div class="custom-modal-header">
                            <h5 class="custom-modal-title">Tambah Foto</h5>
                            <button type="button" class="close-btn" @click="closeModal">&times;</button>
                        </div>
                        <form @submit.prevent="simpanFoto">
                            <div class="custom-modal-body">
                                <div class="form-group-kelas">
                                <label for="pathFoto">Foto</label>
                                <input type="file" id="pathFoto" @change="handleFileChange" class="form-input" multiple required />
                                </div>
                                <div class="form-group-kelas">
                                <label for="pathFoto">Preview Foto</label>
                                <div class="image-previews" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                                    <img v-for="(preview, index) in form.file_previews" :key="index" :src="preview" alt="Foto Preview" style="width: 100px; height: auto; border: 1px solid #ddd; padding: 5px;" />
                                </div>
                                <!-- <img v-if="form.file_preview" :src="form.file_preview" alt="Foto Preview" style="width: 100px; height: auto; margin-top: 10px;" /> -->
                                </div>
                                <div class="form-group-kelas">
                                <label for="caption">Caption</label>
                                <input type="text" id="caption" v-model="form.caption" class="form-input" />
                                </div>
                            </div>
                            <div class="custom-modal-footer">
                                <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
                                <button type="submit" class="btn-save">Tambah Data</button>
                            </div>
                        </form>
                    </div>
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
                        <th scope="col" class="table-head">Foto</th>
                        <th scope="col" class="table-head">Caption</th>
                        <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(foto, index) in paginatedFotoList" :key="foto.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td>
                            <img :src="getFotoUrl(foto.path_foto)" alt="Foto Album" style="width: 100px; height: auto;" />
                        </td>
                        <td>{{ foto['caption'] }}</td>
                        <td>
                            <!-- popup set -->
                            <div class="popup d-inline-block" ref="popup">
                                <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                                    <button class="popup-item" @click="deleteFoto(foto.id)" style="color: red">Hapus</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="FotoList.length === 0" class="no-data">
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
import Swal from "sweetalert2";
import axios from 'axios';

export default {
  data() {
    return {
      maxVisiblePages: 5,
      rowsPerPage: 5,
      currentPage: 1,
      openModal: false,
      dropdownIndex: null,
      searchQuery: '',
      showModal: false,
      albumId: null,
      albumName: '', 
      FotoList: [],
      isFilterPopupVisible: false,
      form: {
        id: null, 
        files: [], 
        file_previews: [], 
        caption: '',
      },
      errors: {},
    };
  },
    props: {
    foto: Object,
  },
  methods: {
    async fetchAlbumDetail() {
      try {
        const response = await axios.get(`/album/${this.albumId}`);
        this.albumName = response.data.data.nama_album;
      } catch (error) {
        console.error("Gagal mengambil detail album:", error);
        this.albumName = 'Tidak Ditemukan';
      }
    },
    async fetchFotoListByAlbum() {
      try {
        const response = await axios.get(`/album/${this.albumId}/foto`);
        if (response.data && Array.isArray(response.data.data)) {
          this.FotoList = response.data.data;
        } else {
          console.error("Data foto tidak sesuai:", response.data);
          this.FotoList = [];
        }
      } catch (error) {
        console.error("Gagal mengambil data foto:", error);
        this.FotoList = [];
      }
    },

    prepareTambahFoto() {
      this.resetForm();
      this.showModal = true;
    },
    
    handleFileChange(event) {
        this.form.files = []; 
        this.form.file_previews = []; 

        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                this.form.files.push(file);
                this.form.file_previews.push(URL.createObjectURL(file));
            }
        }
    },
    async simpanFoto() {
    try {
        if (this.form.files.length === 0) {
            Swal.fire('Peringatan', 'Pilih setidaknya satu foto untuk diunggah.', 'warning');
            return;
        }

        for (const file of this.form.files) {
            const formData = new FormData();
            formData.append('album_id', this.albumId);
            formData.append('file', file);
            formData.append('caption', this.form.caption); 

            if (this.isEditing) {
                formData.append('_method', 'PUT');
                await axios.post(`/foto/${this.form.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post('/foto', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
        }

        Swal.fire('Berhasil', 'Semua foto berhasil disimpan!', 'success');
        this.closeModal();
        this.fetchFotoListByAlbum();
    } catch (error) {
        console.error("Gagal menyimpan foto:", error);
        Swal.fire('Error', 'Gagal menyimpan foto!', 'error');
    }
},
resetForm() {
    this.form = {
        id: null,
        files: [], 
        file_previews: [], 
        caption: '',
    };
    this.errors = {};
},
    async deleteFoto(fotoId) {
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
          await axios.delete(`/foto/${fotoId}`);
          Swal.fire('Terhapus!', 'Data foto berhasil dihapus.', 'success');
          this.fetchFotoListByAlbum(); 
        }
      } catch (error) {
        console.error("Error deleting foto:", error);
        Swal.fire('Error', 'Gagal menghapus data foto!', 'error');
      }
    },
    getFotoUrl(path) {
  if (!path) {
    return new URL('@/assets/images/placeholder.png', import.meta.url).href;
  }

  // Jika path sudah lengkap
  if (path.startsWith('http')) {
    return path;
  }

  // Hanya bagian ini perlu disesuaikan
  return `https://otgjqjojuoozezaatbpt.supabase.co/storage/v1/object/public/${path}`;
},
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? null : index;
    },
    handleClickOutside(event) {
      if (this.dropdownIndex !== null) {
        let clickedOnDropdown = false;
        if (this.$refs.popup && this.$refs.popup[this.dropdownIndex]) {
          clickedOnDropdown = this.$refs.popup[this.dropdownIndex].contains(event.target);
        }
        if (!clickedOnDropdown) {
          this.dropdownIndex = null;
        }
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredFotoList.length / this.rowsPerPage);
    },
    paginatedFotoList() {
      let start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredFotoList.slice(start, start + this.rowsPerPage);
    },
    filteredFotoList() {
      const query = this.searchQuery.toLowerCase();
      return this.FotoList.filter(foto => {
        return (foto.caption && String(foto.caption).toLowerCase().includes(query));
      });
    },
    pageInfo() {
      if (this.filteredFotoList.length === 0) {
        return 'Tidak ada data';
      }
      const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
      const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredFotoList.length);
      return `Showing ${startRow} - ${endRow} of ${this.filteredFotoList.length} entries`;
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
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.albumId = parseInt(this.$route.params.id);
    if (isNaN(this.albumId)) {
        console.error("Invalid Album ID:", this.$route.params.id);
        Swal.fire('Error', 'Album ID tidak valid!', 'error');
        return;
    }
    ('Album ID:', this.albumId);

    this.fetchAlbumDetail();
    this.fetchFotoListByAlbum();
  },
  beforeUnmount() { 
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
    
<style>
.breadcrumb {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
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

.header-text {
    font-weight: 800;
    color: #336C2A;
}

.no-data-img {
    max-width: 100px;
    margin-bottom: 10px;
}

.btn-add-class {
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

.btn-add-class i {
    font-size: 1rem;
}

.btn-add-class:hover {
    color: white;
    background: #336C2A;
    transform: translateY(-2px);
    text-decoration: none;
}

.tampil-baris {
    color: #336C2A;
    font-weight: 600;
}

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

.material-symbols-outlined {
    font-size: 20px;
}

.export-section {
    margin-left: 0.5rem;
}

.filter-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

.row-filter-wrapper {
    display: flex;
    align-items: center;
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
    width: 100%;
    max-width: 100rem;
    overflow-x: auto;
    background-color: white;
    margin-top: 1rem;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table-hover>tbody>tr:hover {
    font-weight: 800;
    background-color: #6c757d;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 50rem;
    margin-top: 1rem;
    table-layout: auto;
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

.popup-item:hover {
    background-color: #f5f5f5;
}

.pagination-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140%;
    margin-top: 1rem;
}

.page-info,
.pagination {
    margin: 0;
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

.custom-modal-body {
    z-index: 9999;
    overflow-y: auto; 
    text-align: left;
    padding: 1rem;
    font-size: 1rem;
    color: #333;
    max-height: 70vh; 
}

.custom-modal-dialog {
    background: white;
    border: none;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: none;
    overflow: hidden; 
    display: flex; 
    flex-direction: column;
    max-height: 90vh; 
}

.custom-modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.custom-modal-header {
    background: #ffffff;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.custom-modal-title {
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
}

.custom-modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 1rem;
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

.btn-cancel:hover {
    background: #e4e3e3;
}

.form-group-kelas {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

label {
    font-weight: 700;
    width: 40%;
    text-align: left;
}

.form-input {
    color: black;
    width: 60%;
    padding: 10px;
    background-color: white;
    border: 1px solid #636364;
    border-radius: 20px;
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
</style>