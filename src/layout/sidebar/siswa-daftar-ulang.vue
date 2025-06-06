<template>
    <div class="main-content">
      <section class="content-header">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Daftar Ulang</li>
          </ol>
        </nav>
      </section>
  
      <div class="info-list">
        <div class="info-item">
          <label>Tahun Ajaran</label>
          <div class="text-box">2024/2025</div>
        </div>
        <div class="info-item">
          <label>Jumlah Pembayaran</label>
          <div class="text-box">Rp 3.500.000</div>
        </div>
        <div class="info-item">
          <label>Tanggal Pembayaran</label>
          <div class="text-box">10 Juni 2024</div>
        </div>
        <div class="info-item">
          <label>Status Pembayaran</label>
          <div class="text-box">Lunas</div>
        </div>
        <div class="info-item">
          <label>Status Penerimaan Rapor</label>
          <div class="text-box">Sudah Diterima</div>
        </div>
        <div class="info-item">
          <label>Status Penerimaan Atribut</label>
          <div class="text-box">Lengkap</div>
        </div>
        <div class="info-item">
          <label>Status Cicilan</label>
          <div class="text-box">Tidak Ada</div>
        </div>
        <div class="info-item">
          <label>Bukti Pembayaran</label>
          <div class="text-box">Tersimpan</div>
        </div>
      </div>
  
      <hr />
  
      <div class="catatan">
        <p><strong>Catatan:</strong></p>
        <ul>
          <li>Pembayaran pendaftaran sudah termasuk uang perlengkapan sekolah, uang kegiatan, SPP, dan seragam.</li>
          <li>Uang perlengkapan sekolah digunakan untuk barang kreativitas serta portofolio siswa.</li>
          <li>Perlengkapan sekolah tidak dibawa pulang, hanya digunakan di sekolah.</li>
          <li>Rapor dapat diterima apabila seluruh pembayaran sudah lunas dan diterima ketika semesteran.</li>
          <li>Atribut yang diterima hanya berupa seragam kotak-kotak, lurik, dan olahraga.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data (){

    }
  }
  </script>
  
  <style scoped>
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .info-item label {
    font-weight: 500;
    flex: 1;
    min-width: 200px;
  }
  
  .text-box {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px 12px;
    background-color: #f9f9f9;
    flex: 2;
    min-width: 200px;
  }
  
  .catatan {
    background-color: #f3f3f3;
    padding: 15px;
    border-radius: 8px;
  }
  
  .catatan ul {
    padding-left: 20px;
  }
  
  .catatan li {
    margin-bottom: 8px;
  }
  </style>
  