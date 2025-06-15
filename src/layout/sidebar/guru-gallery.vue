<template>
    <section class="content-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page" style="color: #A9A9A9;">Galeri</li>
            </ol>
        </nav>
        <div class="header-button">
            <h3 class="header-text">Galeri</h3>
            <button class="btn-add-class" @click="prepareTambahAlbum">Tambah Data
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
                                <h5 class="custom-modal-title">{{ isEditing ? 'Edit Data Album' : 'Tambah Data Album' }}</h5>
                                <button type="button" class="close-btn" @click="closeModal">&times;</button>
                            </div>
                            <form @submit.prevent="simpanAlbum">
                        <div class="custom-modal-body">
                          <div class="form-group-album">
                            <label for="pathFoto">Cover Album</label>
                            <input type="file" id="pathFoto" @change="handleFileChange" class="form-input" />
                          </div>
                                <div class="form-group-album">
                                <label for="pathFoto">Preview Foto</label>
                                <img v-if="form.photo_cover_preview" :src="form.photo_cover_preview" alt="Cover Album Preview" style="width: 100px; height: auto; margin-top: 10px;" />
                                </div>
                          <div class="form-group-album">
                            <label for="namaAlbum">Nama Album</label>
                            <input type="text" id="namaAlbum" v-model="form.nama_album" class="form-input" />
                          </div>
                          <div class="form-group-album">
                            <label for="deskripsi">Deskripsi</label>
                            <input type="text" id="deskripsi" v-model="form.deskripsi" class="form-input" />
                          </div>
                          <div class="form-group-album">
                            <label for="tanggalKegiatan">Tanggal Kegiatan</label>
                            <input type="date" id="tanggalKegiatan" v-model="form.tanggal_kegiatan" class="form-input" />
                          </div>
                          <div class="form-group-album">
                            <label for="lokasiKegiatan">Lokasi Kegiatan</label>
                            <input type="text" id="lokasiKegiatan" v-model="form.lokasi_kegiatan" class="form-input" />
                          </div>
                        </div>
                        <div class="custom-modal-footer">
                          <button type="button" class="btn-cancel" @click="closeModal">Batal</button>
                          <button type="submit" class="btn-save">{{ isEditing ? 'Simpan Perubahan' : 'Simpan Data' }}</button>
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
                            <th scope="col" class="table-head" v-if="selectedFilters.coverAlbum">Cover Album</th>
                            <th scope="col" class="table-head" v-if="selectedFilters.namaAlbum">Nama Album</th>
                            <th scope="col" class="table-head" v-if="selectedFilters.deskripsi">Deskripsi</th>
                            <th scope="col" class="table-head" v-if="selectedFilters.tanggalKegiatan">Tanggal Kegiatan</th>
                            <th scope="col" class="table-head" v-if="selectedFilters.lokasiKegiatan">Lokasi Kegiatan</th>
                            <th scope="col" class="table-head">Action</th>
                    </tr>
                </thead>
                <tbody>
                        <tr v-for="(album, index) in paginatedAlbumList" :key="album.id">
                        <td>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</td>
                        <td v-if="selectedFilters.coverAlbum">
                          <img :src="getCoverAlbumUrl(album.photo_cover)" alt="Foto Album" style="width: 100px; height: auto;" />
                        </td>
                        <td v-if="selectedFilters.namaAlbum">{{ album['nama_album'] }}</td>
                        <td v-if="selectedFilters.deskripsi">{{ album['deskripsi'] }}</td>
                        <td v-if="selectedFilters.tanggalKegiatan">{{ album['tanggal_kegiatan'] }}</td>
                        <td v-if="selectedFilters.lokasiKegiatan">{{ album['lokasi_kegiatan'] }}</td>
                        <td>
                          <div class="popup d-inline-block" ref="popup">
                            <button class="btn btn-sm" type="button" @click="toggleDropdown(index)" :aria-expanded="dropdownIndex === index">
                              <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <div class="popup-menu" :class="{ show: dropdownIndex === index }">
                              <button class="popup-item" @click="detailAlbum(album.id)" style="color: #274278">Detail</button>
                              <button class="popup-item" @click="prepareEditAlbum(album.id)" style="color: #274278">Edit</button>
                              <button class="popup-item" @click="deleteAlbum(album.id)" style="color: red">Hapus</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                        <tr v-if="AlbumList.length === 0" class="no-data">
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
</template>

    
<script>
import Swal from "sweetalert2";
import axios from 'axios';
import {
    ref,
    onMounted,
    computed
} from 'vue';

export default {
    data() {
        return {
        maxVisiblePages: 5,
        rowsPerPage: 5,
        currentPage: 1,
        openModal: false,
        isEditing: false,
        dropdownIndex: null,
        searchQuery: '',
        showModal: false,
        isFilterPopupVisible: false,
        selectedFilters: {
          coverAlbum: true,
          namaAlbum: true,
          deskripsi: true,
          tanggalKegiatan: true, // Tambahkan filter baru
          lokasiKegiatan: true // Tambahkan filter baru
        },
        form: {
          id: null,
          photo_cover: null,
          photo_cover_preview: '',
          nama_album: '',
          deskripsi: '',
          tanggal_kegiatan: '', // Tambahkan
          lokasi_kegiatan: '' // Tambahkan
        },
        errors: {},
        AlbumList: [], // Pastikan ini diinisialisasi
      };
    },
    methods: {
      prepareTambahAlbum() {
        this.form = {
          id: null,
          photo_cover: null,
          photo_cover_preview: '',
          nama_album: '',
          deskripsi: '',
          tanggal_kegiatan: '', // Reset
          lokasi_kegiatan: '' // Reset
        };
        this.isEditing = false;
        this.showModal = true;
      },
      detailAlbum(id) {
        this.dropdownIndex = null;
        this.$router.push(`/adminmainsidebar/detailGallery/${id}`);
      },
      async prepareEditAlbum(id) {
        this.dropdownIndex = null;
  
        try {
          const response = await axios.get(`/album/${id}`);
          const album = response.data.data; // Ambil data album dari response
  
          if (album) {
            this.form = {
              id: album.id,
              photo_cover: null, // Jangan langsung isi dengan path, hanya untuk file baru
              photo_cover_preview: album.photo_cover ? `http://localhost:8000/storage/${album.photo_cover}` : '', // Tampilkan preview
              nama_album: album.nama_album,
              deskripsi: album.deskripsi,
              tanggal_kegiatan: album.tanggal_kegiatan, // Isi data
              lokasi_kegiatan: album.lokasi_kegiatan // Isi data
            };
            this.isEditing = true;
            this.showModal = true;
          } else {
            Swal.fire('Error', 'Album tidak ditemukan.', 'error');
          }
        } catch (error) {
          console.error("Gagal mengambil data album untuk edit:", error);
          Swal.fire('Error', 'Gagal mengambil data album untuk diedit!', 'error');
        }
      },
      async simpanAlbum() {
        const formData = new FormData();
        formData.append('nama_album', this.form.nama_album);
        formData.append('deskripsi', this.form.deskripsi);
        formData.append('tanggal_kegiatan', this.form.tanggal_kegiatan || ''); // Tambahkan, kirim string kosong jika null/undefined
        formData.append('lokasi_kegiatan', this.form.lokasi_kegiatan || ''); // Tambahkan
  
        if (this.form.photo_cover) {
          formData.append('photo_cover', this.form.photo_cover);
        }
  
        try {
          if (this.isEditing) {
            formData.append('_method', 'PUT'); // Penting untuk update dengan FormData
            await axios.post(`/album/${this.form.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            Swal.fire('Berhasil', 'Data album berhasil diperbarui!', 'success');
          } else {
            await axios.post('/album', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            Swal.fire('Berhasil', 'Data album berhasil disimpan!', 'success');
          }
  
          this.closeModal();
          this.fetchAlbumList();
        } catch (error) {
          if (error.response && error.response.status === 422) {
            this.errors = error.response.data.errors;
            let errorMessage = 'Terjadi kesalahan validasi:\n';
            for (const key in this.errors) {
              errorMessage += `${this.errors[key].join(', ')}\n`;
            }
            Swal.fire('Error Validasi', errorMessage, 'error');
          } else {
            console.error("Error saving album:", error.response || error);
            Swal.fire('Error', 'Gagal menyimpan data album!', 'error');
          }
        }
      },
      async deleteAlbum(albumId) {
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
            await axios.delete(`/album/${albumId}`);
            Swal.fire('Terhapus!', 'Data album berhasil dihapus.', 'success');
            this.fetchAlbumList(); // Refresh list setelah delete
          }
        } catch (error) {
          console.error("Error deleting album:", error);
          Swal.fire('Error', 'Gagal menghapus data album!', 'error');
        }
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.form.photo_cover = file;
          this.form.photo_cover_preview = URL.createObjectURL(file);
        } else {
          this.form.photo_cover = null;
          this.form.photo_cover_preview = '';
        }
      },
      fetchAlbumList() {
        axios.get('/album')
          .then((res) => {
            console.log("Response dari backend:", res.data);
            if (res.data && Array.isArray(res.data.data)) {
              this.AlbumList = res.data.data; // Gunakan this.AlbumList
            } else {
              console.error("Data tidak sesuai:", res.data);
              this.AlbumList = [];
            }
          })
          .catch((error) => {
            console.error("Gagal mengambil data album:", error);
          });
      },
      getCoverAlbumUrl(path) {
        // Helper untuk mendapatkan URL gambar cover
        if (path) {
          return `http://localhost:8000/storage/${path}`;
        }
        return '/src/assets/images/placeholder.png'; // Placeholder jika tidak ada foto
      },
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      getFilteredData() {
        return this.AlbumList.map((album, index) => {
          const filteredAlbum = {
            No: index + 1,
          };
          Object.keys(this.selectedFilters).forEach((key) => {
            if (this.selectedFilters[key]) {
              // Sesuaikan key dengan nama kolom di objek album
              if (key === 'coverAlbum') {
                  filteredAlbum[key] = album['photo_cover'];
              } else if (key === 'namaAlbum') {
                  filteredAlbum[key] = album['nama_album'];
              } else if (key === 'deskripsi') {
                  filteredAlbum[key] = album['deskripsi'];
              } else if (key === 'tanggalKegiatan') {
                  filteredAlbum[key] = album['tanggal_kegiatan'];
              } else if (key === 'lokasiKegiatan') {
                  filteredAlbum[key] = album['lokasi_kegiatan'];
              }
            }
          });
          return filteredAlbum;
        });
      },
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      toggleDropdown(index) {
        this.dropdownIndex = this.dropdownIndex === index ? null : index;
      },
      resetForm() {
        this.form = { // Reset form kembali ke nilai default
          id: null,
          photo_cover: null,
          photo_cover_preview: '',
          nama_album: '',
          deskripsi: '',
          tanggal_kegiatan: '',
          lokasi_kegiatan: ''
        };
      },
      // Handler untuk klik di luar dropdown
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
      }
    },
    mounted() {
      this.fetchAlbumList(); // Panggil fetchAlbumList di mounted
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() { // Ganti beforeDestroy menjadi beforeUnmount untuk Vue 3
      document.removeEventListener('click', this.handleClickOutside);
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filteredAlbumList.length / this.rowsPerPage);
      },
      paginatedAlbumList() {
        let start = (this.currentPage - 1) * this.rowsPerPage;
        return this.filteredAlbumList.slice(start, start + this.rowsPerPage);
      },
      filteredAlbumList() {
        const query = this.searchQuery.toLowerCase();
        return this.AlbumList.filter(album => {
          return Object.keys(album).some(key => {
            // Hanya cari di kolom yang relevan dan bukan file
            if (['nama_album', 'deskripsi', 'tanggal_kegiatan', 'lokasi_kegiatan'].includes(key)) {
              return album[key] && String(album[key]).toLowerCase().includes(query);
            }
            return false;
          });
        });
      },
      pageInfo() {
        if (this.filteredAlbumList.length === 0) {
          return 'Tidak ada data';
        }
        const startRow = (this.currentPage - 1) * this.rowsPerPage + 1;
        const endRow = Math.min(this.currentPage * this.rowsPerPage, this.filteredAlbumList.length);
        return `Showing ${startRow} - ${endRow} of ${this.filteredAlbumList.length} entries`;
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
};
</script>

    
<style scoped>
.content-header {
    width: 100%;
}

.header-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
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
    justify-content: center;
    gap: 0.5rem;
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
    align-items: center;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 64rem;
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
    width: 64rem;
    max-width: 150rem;
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

/* Background overlay */
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
    max-width: 500px;
    box-shadow: none;
    overflow: hidden;
}

.custom-modal-content {
    display: flex;
    flex-direction: column;
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

.custom-modal-body {
    text-align: left;
    padding: 1rem;
    font-size: 1rem;
    color: #333;
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

.form-group-album {
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
