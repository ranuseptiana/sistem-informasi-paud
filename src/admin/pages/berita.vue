<template>
    <d-container fluid class="berita">
      <d-row>
        <!-- Sidebar dan Navbar -->
        <Sidebar />
        <!-- Content -->
        <div class="content">
          <div class="container_all border border-2 p-3">
        <h2 class="nama_orangtua">Data Berita</h2>
    
        <div class="table_controls">
          <label for="rows_per_page">Tampilkan baris:</label>
          <select v-model="rowsPerPage" id="rows_per_page" class="form-select">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
    
        <div class="table-responsive">
          <table class="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">Nis</th>
                <th scope="col">Nama Siswa</th>
                <th scope="col">Gender</th>
                <th scope="col">Tanggal Lahir</th>
                <th scope="col">Jumlah Saudara</th>
                <th scope="col">Alamat</th>
                <th scope="col">Agama</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(siswa, index) in paginatedSiswa" :key="index">
                <td>{{ siswa.nis }}</td>
                <td>{{ siswa.nama_siswa }}</td>
                <td>{{ siswa.gender_siswa }}</td>
                <td>{{ siswa.tgl_lahir_siswa }}</td>
                <td>{{ siswa.jml_saudara }}</td>
                <td>{{ siswa.alamat_siswa }}</td>
                <td>{{ siswa.agama_siswa }}</td>
                <td>
                  <button class="btn_action btn_delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  <button class="btn_action btn_edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </d-row>
      <!-- Main Footer
      <Footer /> -->
    </d-container>
  </template>
    
  <script>
    import Sidebar from '../components/layout/sidebar.vue';
    import Footer from '../components/layout/footer.vue';
    export default {
      name: 'berita',
      components: {
        Sidebar,
        Footer,
      },
      data() {
        return {
          siswa: [
            { nis: 101, nama_siswa : 'Adi', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none", },
            { nis: 102, nama_siswa: 'Ali', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 103, nama_siswa: 'Baba', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 104, nama_siswa: 'Bobo', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 105, nama_siswa: 'Sasi', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 106, nama_siswa: 'Asa', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 107, nama_siswa: 'won', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 108, nama_siswa: 'han', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 109, nama_siswa: 'ji', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 110, nama_siswa: 'non', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 111, nama_siswa: 'chol', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
            { nis: 112, nama_siswa: 'joshua', gender_siswa : "Laki-laki", tgl_lahir_siswa : "10-1-/2010", jml_saudara : 1, alamat_siswa : "Surabaya", agama_siswa : "none",},
          ],
          currentPage: 1,
          rowsPerPage: 5
        };
      },
      computed: {
        paginatedSiswa() {
          const startIndex = (this.currentPage - 1) * this.rowsPerPage;
          const endIndex = startIndex + this.rowsPerPage;
          return this.siswa.slice(startIndex, endIndex);
        },
        totalPages() {
          return Math.ceil(this.siswa.length / this.rowsPerPage);
        }
      }
    };
    </script>
    
    <style scoped>
    .container_all {
      padding: 20px;
      border: 2px solid #000;
      margin-top: 50px;
    }
    
    .orangtua {
      font-family: "Poppins", sans-serif;
    }
    .name_category {
      font-family: "Poppins", sans-serif;
      margin-bottom: 20px;
    }
    
    .add_category_name {
      text-align: left;
      margin-bottom: 20px;
    }
    
    .btn_add_category {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: 16px;
      transition: background-color 0.3s ease;
      margin-bottom: 20px;
    }
    
    .btn_add_category i {
      margin-right: 8px;
    }
    
    .btn_add_category:hover {
      background-color: #0056b3;
    }
    
    .table_controls {
      margin-bottom: 20px;
    }
    
    .table-controls label {
      margin-right: 10px;
    }
    
    .form-select {
      padding: 5px;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      width: 50px;
    }
    
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .table th, .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .table th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
    
    .table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .btn_action {
      padding: 5px 10px;
      margin-right: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
    }
    
    .btn_delete {
      background-color: #dc3545;
      color: white;
    }
    
    .btn_edit {
      background-color: #ffc107;
      color: white;
    }
    
    .btn_delete:hover {
      background-color: #c82333;
    }
    
    .btn_edit:hover {
      background-color: #e0a800;
    }
  
    .table_controls {
    display: flex;
    align-items: center;
  }
  
    /* Additional mobile styles */
    @media (max-width: 576px) {
      .container_all {
        padding: 10px;
      }
      .btn_add_category {
        font-size: 14px;
      }
      .form-select {
        font-size: 12px;
      }
      .table th,
      .table td {
        font-size: 12px;
        padding: 8px;
      }
      .btn_action {
        font-size: 12px;
        padding: 3px 6px;
      }
    }
    </style>
    