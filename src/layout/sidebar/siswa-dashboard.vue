<template>
  <div class="main-content">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Beranda</li>
        </ol>
      </nav>

      <h4 class="welcome-text">Halo, {{ userName || 'Siswa' }}</h4>

      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <i class="fas fa-chalkboard-teacher fs-2 text-primary"></i>
                </div>
                <div>
                  <h5 class="card-title">Ruang Belajar</h5>
                  <p class="card-text mb-1">{{ assignedKelasNama }}</p>
                  <small class="text-muted">{{ assignedKelasJumlahSiswa }} Siswa</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <i class="fas fa-money-bill-wave fs-2 text-success"></i>
                </div>
                <div>
                  <h5 class="card-title">Total Pembayaran</h5>
                  <p class="card-text mb-0">Rp 4.000.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Daftar Guru</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Nama Guru</th>
                      <th>Mengajar Kelas</th>
                      <th>Hari Mengajar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="guru in guruWithKelas.slice(0, 5)" :key="guru.id">
                      <td>{{ guru.nama_lengkap }}</td>
                      <td>{{ guru.kelasDiampu }}</td>
                      <td>{{ guru.jumlah_hari_mengajar }} Hari</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Kegiatan Minggu Ini</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="(activity, index) in dummyActivities" :key="index" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <span>{{ activity.description }}</span>
                    <small class="text-muted">{{ activity.time }}</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header">
          <h5 class="card-title mb-0">Pengumuman</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div v-for="(announcement, index) in dummyAnnouncements" :key="index" class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">{{ announcement.date }}</h6>
                  <h5 class="card-title">{{ announcement.title }}</h5>
                  <p class="card-text">{{ announcement.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StudentDashboard',
  data() {
    return {
      userName: "",
      assignedKelasNama: 'Memuat...',
      assignedKelasJumlahSiswa: 0,
      guruWithKelas: [],
      dummyActivities: [
        { time: 'Senin, 08:00', description: 'Upacara Bendera & Senam Pagi' },
        { time: 'Selasa, 10:00', description: 'Mewarnai Gambar Buah-buahan' },
        { time: 'Rabu, 09:30', description: 'Cerita Dongeng: Si Kancil' },
        { time: 'Kamis, 14:00', description: 'Bermain Bola di Lapangan' },
        { time: 'Jumat, 08:30', description: 'Belajar Huruf dan Angka' },
      ],
      dummyAnnouncements: [
        {
          title: 'Libur Hari Raya Idul Fitri',
          date: '10 April - 17 April 2025',
          message: 'Sekolah akan libur dalam rangka Hari Raya Idul Fitri. Masuk kembali tanggal 18 April 2025.'
        },
        {
          title: 'Rapat Orang Tua Murid',
          date: 'Sabtu, 20 April 2025, 09:00 WIB',
          message: 'Diadakan rapat orang tua murid untuk membahas persiapan acara Pentas Seni.'
        },
        {
          title: 'Lomba Mewarnai Tingkat PAUD',
          date: 'Minggu, 28 April 2025, 10:00 WIB',
          message: 'Mari ikut serta dalam lomba mewarnai. Pendaftaran dibuka hingga 25 April 2025.'
        }
      ]
    }
  },
  created() {
    this.fetchUserData();
    this.fetchAssignedKelasData();
    this.fetchGuruData();
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token tidak ditemukan');
          return;
        }
        const response = await axios.get('/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.userName = response.data.name;
      } catch (error) {
        console.error('Error fetching user data:', error.response || error);
      }
    },
    async fetchAssignedKelasData() {
      const idSiswa = localStorage.getItem('user_id') || localStorage.getItem('id_siswa');
      if (!idSiswa) {
        this.assignedKelasNama = 'Tidak ada Kelas';
        this.assignedKelasJumlahSiswa = 0;
        return;
      }

      try {
        const response = await axios.get(`/siswa/${idSiswa}/kelas`);
        if (response.data && response.data.kelas) {
          this.assignedKelasNama = response.data.kelas.nama_kelas;
          this.assignedKelasJumlahSiswa = response.data.daftar_siswa ? response.data.daftar_siswa.length : 0;
        }
      } catch (error) {
        console.error('Error fetching assigned class data:', error.response || error);
      }
    },
    async fetchGuruData() {
      try {
        const response = await axios.get("/guru");
        this.guruWithKelas = response.data.data.map(guru => ({
          ...guru,
          kelasDiampu: "Kelas " + guru.jabatan,
          jumlah_hari_mengajar: 5
        }));
      } catch (error) {
        console.error("Error fetching guru data:", error);
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 56px);
}

.container {
  max-width: 1200px;
}

.welcome-text {
  margin: 20px 0;
  color: #343a40;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.table th {
  background-color: #f8f9fa;
}

.list-group-item {
  padding: 12px 20px;
  border-left: 0;
  border-right: 0;
}

.list-group-item:first-child {
  border-top: 0;
}

.list-group-item:last-child {
  border-bottom: 0;
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 1.5rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
</style>