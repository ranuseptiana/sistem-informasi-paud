<template>
  <div class="main-content">
    <div class="fluid-container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Beranda</li>
        </ol>
      </nav>

      <h4 class="welcome-text">Halo, {{ userName || 'Anak Hebat' }}! ✨</h4>

      <div class="card-container">
        <div class="card-information">
          <div class="card-dashboard card-yellow">
            <img src="/src/assets/images/board.png" alt="Ikon Kelas" class="dashboard-icon" />
            <div class="text-content">
              <h2>Ruang Belajar</h2>
              <h5>{{ assignedKelasNama }}</h5>
              <p class="small-text">{{ assignedKelasJumlahSiswa }} Siswa</p>
            </div>
          </div>

          <div class="card-dashboard card-purple">
            <img src="/src/assets/images/school.png" alt="Ikon Pembayaran" class="dashboard-icon" />
            <div class="text-content">
              <h2>Total Pembayaran</h2>
              <h5>Rp 4.000.000</h5>
            </div>
          </div>
        </div>

        <div class="dashboard-tables">
          <section class="chart-section teacher-section">
            <div class="teacher-list">
              <h3>Kenalan dengan Guru Kita! 👋</h3>
              <div class="table-container">
                <table>
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
          </section>

          <section class="chart-section activity-section">
            <div class="activity-list">
              <h3>Kegiatan Seru Minggu Ini! 🎨</h3>
              <ul>
                <li v-for="(activity, index) in dummyActivities" :key="index">
                  <span class="activity-time">{{ activity.time }}</span> - {{ activity.description }}
                </li>
              </ul>
            </div>
          </section>
        </div>

        <section class="chart-section announcement-section">
          <h3>Pengumuman Penting untuk Orang Tua! 🔔</h3>
          <div class="announcement-content">
            <div v-for="(announcement, index) in dummyAnnouncements" :key="index" class="announcement-item">
              <h4>{{ announcement.title }}</h4>
              <p>{{ announcement.date }}</p>
              <p>{{ announcement.message }}</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    if (chart.config.type !== 'doughnut') return;

    const { width, height, ctx } = chart;
    ctx.save();
    ctx.font = 'bold 36px Nunito Sans';
    ctx.fillStyle = '#336C2A';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const dataset = chart.data.datasets[0].data;
    const total = dataset.reduce((sum, value) => (typeof value === 'number' ? sum + value : sum), 0);

    ctx.fillText(`${total}`, width / 2, height / 2);
    ctx.restore();
  }
};

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

import {
  Bar,
  Doughnut,
  Line
} from 'vue-chartjs'

import {
  ref,
  computed,
  onMounted
} from 'vue';

ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, PointElement, ArcElement, Title, Tooltip, Legend)
ChartJS.register(centerTextPlugin);

export default {
  name: 'PaudDashboard',
  components: {
    Bar,
    Line,
    Doughnut
  },
  data() {
    return {
      userName: "",
      username: "",
      password: "",
      guruList: [],
      chartData: {
        labels: ['PG Matahari', 'PG Mentari', 'PG 1 Bintang', 'A1', 'A2', 'B1', 'B2'],
        datasets: [{
          label: 'Jumlah Anak',
          backgroundColor: ['#A0D9FF', '#FFB6C1', '#FFFACD', '#98FB98', '#FFDAB9', '#ADD8E6', '#E6E6FA'],
          data: [21, 25, 25, 18, 15, 14, 14],
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
        },
        assignedKelasNama: 'Memuat...', // Nama kelas yang di-assign ke siswa
      assignedKelasJumlahSiswa: 0, 
      chartDisplay: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          centerText: true,
          legend: {
            display: true,
            position: 'bottom' as const,
            labels: {
              font: {
                size: 14,
                family: 'Nunito Sans'
              },
              boxWidth: 20,
              padding: 15,
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                }
                return label;
              }
            },
            bodyFont: {
              size: 14,
              family: 'Nunito Sans'
            }
          }
        }
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5,
              font: {
                size: 12,
                family: 'Nunito Sans'
              },
              color: '#666'
            },
            grid: {
              color: '#f0f0f0'
            }
          },
          x: {
            ticks: {
              font: {
                size: 12,
                family: 'Nunito Sans'
              },
              color: '#666'
            },
            grid: {
              display: false
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            bottom: 10,
            left: 10,
            right: 10
          }
        },
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              boxWidth: 16,
              padding: 10,
              font: {
                size: 14,
                family: 'Nunito Sans'
              },
              color: '#333'
            }
          },
          tooltip: {
            enabled: true,
            bodyFont: {
              size: 14,
              family: 'Nunito Sans'
            }
          }
        }
      },
      dataChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [{
          label: 'SPP',
          borderColor: '#FF7F50',
          backgroundColor: 'rgba(255, 127, 80, 0.3)',
          fill: true,
          tension: 0.5,
          pointRadius: 5,
          pointBackgroundColor: '#FF7F50',
          pointBorderColor: '#fff',
          pointHoverRadius: 7,
          data: [20, 20, 30, 25, 15, 20, 25, 30, 23, 25, 20, 29]
        }]
      },
      newData: {
        labels: ['Anak Laki-Laki', 'Anak Perempuan'],
        datasets: [{
          label: 'Jumlah Anak',
          backgroundColor: ['#88db7c', '#51a943'],
          data: [20, 30]
        }]
      },
      // --- Data Dummy Baru ---
      dummyActivities: [
        { time: 'Senin, 08:00', description: 'Upacara Bendera & Senam Pagi' },
        { time: 'Selasa, 10:00', description: 'Mewarnai Gambar Buah-buahan' },
        { time: 'Rabu, 09:30', description: 'Cerita Dongeng: Si Kancil' },
        { time: 'Kamis, 14:00', description: 'Bermain Bola di Lapangan' },
        { time: 'Jumat, 08:30', description: 'Belajar Huruf dan Angka' },
        { time: 'Jumat, 10:00', description: 'Menyanyikan Lagu Anak-Anak' },
      ],
      dummyAnnouncements: [
        {
          title: 'Libur Hari Raya Idul Fitri',
          date: '10 April - 17 April 2025',
          message: 'Sekolah akan libur dalam rangka Hari Raya Idul Fitri. Masuk kembali tanggal 18 April 2025. Selamat liburan!'
        },
        {
          title: 'Rapat Orang Tua Murid',
          date: 'Sabtu, 20 April 2025, 09:00 WIB',
          message: 'Diadakan rapat orang tua murid untuk membahas persiapan acara Pentas Seni. Mohon kehadirannya.'
        },
        {
          title: 'Lomba Mewarnai Tingkat PAUD',
          date: 'Minggu, 28 April 2025, 10:00 WIB',
          message: 'Mari ikut serta dalam lomba mewarnai. Pendaftaran dibuka hingga 25 April 2025. Hadiah menarik menanti!'
        }
      ]
      // --- Akhir Data Dummy Baru ---
    }
  },
  created() {
      this.fetchUserData();
      this.fetchAssignedKelasData(); 
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/auth/login", {
          username: this.username,
          password: this.password
        });
        localStorage.setItem("auth_token", response.data.token);
        this.fetchUserData();
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
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
        const idSiswa = localStorage.getItem('user_id') || localStorage.getItem('id_siswa'); // Cek kedua kunci
        if (!idSiswa) {
            console.warn('ID siswa tidak ditemukan di localStorage. Tidak dapat mengambil data kelas.');
            this.assignedKelasNama = 'Tidak ada Kelas';
            this.assignedKelasJumlahSiswa = 0;
            return;
        }

        try {
            const response = await axios.get(`/siswa/${idSiswa}/kelas`);
            if (response.data && response.data.kelas) {
                this.assignedKelasNama = response.data.kelas.nama_kelas;
                this.assignedKelasJumlahSiswa = response.data.daftar_siswa ? response.data.daftar_siswa.length : 0;
            } else {
                this.assignedKelasNama = 'Tidak ada Kelas';
                this.assignedKelasJumlahSiswa = 0;
            }
        } catch (error) {
            console.error('Error fetching assigned class data:', error.response || error);
            this.assignedKelasNama = 'Error Memuat';
            this.assignedKelasJumlahSiswa = 0;
        }
    }
  },
  setup() {
    const relasiKelasList = ref < Array < {
      guru_id: number;kelas_id: number
    } >> ([]);
    const kelasList = ref < Array < {
      id: number;nama_kelas: string
    } >> ([]);
    const guruList = ref < Array < {
      id: number;
      nip: string;
      nama_lengkap: string;
      jabatan: string;
      tugas_mengajar: string;
      jumlah_hari_mengajar: number;
    } >> ([]);

    const fetchGuruList = async () => { // Mengubah menjadi async
      try {
        const res = await axios.get("/guru");
        guruList.value = res.data.data;
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const fetchKelasList = async () => { // Mengubah menjadi async
      try {
        const res = await axios.get("/kelas");
        kelasList.value = res.data.data || [];
      } catch (error) {
        console.error("Error fetching kelas:", error);
      }
    };

    const fetchRelasiKelasList = async () => { // Mengubah menjadi async
      try {
        const res = await axios.get("/relasikelas");
        relasiKelasList.value = res.data.data || [];
      } catch (error) {
        console.error("Error fetching relasi kelas:", error);
      }
    };

    const guruWithKelas = computed(() => {
      return guruList.value.map(guru => {
        const kelasDiampu = relasiKelasList.value
          .filter((relasi) => relasi ?.guru_id === guru.id)
          .map((relasi) => {
            const kelas = kelasList.value.find((k) => k ?.id === relasi ?.kelas_id);
            return kelas ?.nama_kelas || "Tidak Diketahui";
          });

        return {
          ...guru,
          kelasDiampu: kelasDiampu.length ? kelasDiampu.join(", ") : "Belum ada kelas"
        };
      });
    });

    onMounted(async () => {
      await fetchGuruList();
      await fetchKelasList();
      await fetchRelasiKelasList();
    });

    return {
      guruWithKelas
    };
  },
}
</script>
<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #F8F8F8;
  min-height: 100vh; /* Pastikan konten mengisi tinggi viewport */
}

.fluid-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 20px;
}

.welcome-text {
  font-weight: 800;
  color: #336c2a;
  margin-top: 1.5rem;
  margin-bottom: 35px; /* Jarak lebih jauh dari card */
  font-size: 2.5rem; /* Ukuran font lebih besar lagi */
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.15); /* Bayangan sedikit lebih kuat */
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 30px; /* Jarak antar bagian lebih besar */
}

.card-information {
  display: flex;
  gap: 25px; /* Jarak antar card */
  flex-wrap: wrap;
  justify-content: center;
}

.card-dashboard {
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 18px;
  width: auto;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease-out; /* Perubahan di sini */
  transform-style: preserve-3d; /* Penting untuk efek 3D */
}

.card-dashboard:hover {
  transform: translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.03); /* Efek 3D saat hover */
  box-shadow: 0 20px 40px rgba(180, 180, 180, 0.4), /* Bayangan lebih besar dan terang */
              0 0 0 5px rgba(255, 255, 255, 0.5); /* Efek highlight putih */
  z-index: 10; /* Pastikan card yang di-hover muncul di atas */
}

.card-blue { background-color: #E6F3FF; }
.card-pink { background-color: #FFF0F5; }
.card-yellow { background-color: #FFFDE7; }
.card-purple { background-color: #F3E5F5; }

.dashboard-icon {
  width: 65px; /* Ukuran ikon lebih besar */
  height: 65px;
  margin-right: 10px;
}

.text-content h2 {
  margin: 0;
  color: #4A4A4A;
  font-size: 1.6rem; /* Ukuran font lebih besar */
  font-weight: 700;
}

.text-content h5 {
  margin: 5px 0 0;
  font-size: 1.4rem; /* Ukuran font lebih besar lagi untuk angka */
  color: #2C3E50;
  font-weight: 600;
}

/* --- Tata Letak Chart dan Tabel Baru --- */
.dashboard-charts,
.dashboard-tables {
  display: flex;
  gap: 25px; /* Jarak antar bagian */
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 25px; /* Jarak dari section sebelumnya */
}

.chart-section {
    background: white;
    padding: 30px; /* Padding lebih besar */
    border-radius: 18px; /* Sudut lebih membulat */
    border: 1px solid #D0D0D0; /* Border sedikit lebih tebal */
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex-grow: 1; /* Memungkinkan elemen untuk tumbuh */
    flex-basis: 0; /* Fleksibilitas dasar */
}

.chart-section:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(180, 180, 180, 0.3);
}

.doughnut-section {
    min-width: 350px;
    max-width: 450px; /* Batasi lebar donat */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.doughnut-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.chart-container p,
.doughnut-container p,
.teacher-list h3,
.activity-list h3,
.announcement-section h3 {
  text-align: center;
  font-size: 1.5rem; /* Ukuran font judul chart/section lebih besar */
  font-weight: bold;
  margin-bottom: 20px; /* Jarak bawah lebih besar */
  color: #333;
}

.chart-labels {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px; /* Jarak atas dari chart */
}

.chart-labels p {
  font-size: 1.2rem; /* Ukuran font label donat lebih besar */
  font-weight: 600;
  margin: 0;
  color: #555;
  display: flex;
  align-items: center;
}

.chart-labels p::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 10px;
}
.chart-labels p:nth-child(1)::before { background-color: #88db7c; }
.chart-labels p:nth-child(2)::before { background-color: #51a943; }

.bar-line-charts {
    display: flex;
    flex-direction: column;
    gap: 25px;
    min-width: 550px; /* Lebar minimum untuk dua chart */
    flex-basis: auto; /* Agar tidak terlalu kaku */
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* Memenuhi container parent */
  padding: 0; /* Padding di handle oleh chart-section */
  height: 350px; /* Tinggi chart yang konsisten */
  border: none; /* Hilangkan border di chart-container */
  border-radius: 0; /* Hilangkan border-radius di chart-container */
  box-shadow: none; /* Hilangkan shadow di chart-container */
  background: none; /* Hilangkan background di chart-container */
}


.teacher-section {
    min-width: 450px; /* Minimum width untuk tabel guru */
}

.table-container {
  max-height: 320px; /* Ketinggian maksimal tabel, bisa di-scroll */
  overflow-y: auto;
  border-radius: 12px; /* Sudut tabel membulat */
  border: 1px solid #E0E0E0;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.05); /* Bayangan dalam untuk efek kedalaman */
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  font-weight: bold;
  background: #EBF7FF; /* Latar belakang header lebih cerah */
  color: #3B5F7F; /* Warna teks header lebih gelap */
  padding: 16px; /* Padding lebih besar */
  text-align: left;
  font-size: 1.15rem; /* Ukuran font header tabel */
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #DDEEFB; /* Garis bawah header lebih tebal */
}

td {
  padding: 14px 16px; /* Padding lebih besar */
  border-bottom: 1px solid #F0F0F0;
  text-align: left;
  font-size: 1.08rem; /* Ukuran font isi tabel */
  color: #555;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) {
    background-color: #F8F8F8; /* Latar belakang zebra striping lebih kontras */
}

/* --- Bagian Kegiatan --- */
.activity-section {
  min-width: 400px;
}

.activity-list ul {
  list-style: none; /* Hilangkan bullet default */
  padding: 0;
  max-height: 320px; /* Batasi tinggi daftar kegiatan */
  overflow-y: auto;
}

.activity-list li {
  background-color: #FDFDFD;
  border: 1px solid #EEE;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #444;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.activity-list li:last-child {
  margin-bottom: 0;
}

.activity-list li:hover {
  background-color: #F0F8FF; /* Latar belakang lebih cerah saat hover */
  transform: translateX(5px);
}

.activity-time {
  font-weight: bold;
  color: #51a943; /* Warna hijau cerah untuk waktu */
  flex-shrink: 0; /* Jangan menyusut */
  width: 120px; /* Lebar tetap untuk waktu */
}

/* --- Bagian Pengumuman --- */
.announcement-section {
  width: 100%; /* Memenuhi lebar container */
  margin-top: 25px;
}

.announcement-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsif grid */
  gap: 20px;
}

.announcement-item {
  background-color: #FDFEFF; /* Latar belakang lebih putih */
  border: 1px solid #E5F0FF; /* Border biru muda */
  border-left: 5px solid #64B5F6; /* Border kiri tebal biru */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.announcement-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
}

.announcement-item h4 {
  color: #3F51B5; /* Biru tua untuk judul */
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.announcement-item p {
  margin: 5px 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

.announcement-item p:first-of-type {
  font-style: italic;
  font-size: 0.95rem;
  color: #888;
}

/* --- Media Queries --- */
@media (max-width: 992px) {
  .welcome-text {
    font-size: 2.2rem;
  }
  .card-dashboard {
    width: 45%; /* Menyesuaikan agar 2 card per baris */
    min-width: 280px;
  }

  .dashboard-charts {
    flex-direction: column;
    align-items: center;
  }

  .bar-line-charts {
    min-width: unset;
    width: 100%;
  }

  .chart-container {
    height: 300px;
  }

  .dashboard-tables {
    flex-direction: column;
    align-items: center;
  }

  .teacher-section,
  .activity-section {
    min-width: unset;
    width: 100%;
  }

  .doughnut-section {
      width: 100%;
      max-width: 400px; /* Agar tidak terlalu lebar di tablet */
  }
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 1.8rem;
  }

  .card-information {
    flex-direction: column;
    align-items: center;
  }

  .card-dashboard {
    width: 90%; /* Ambil lebar penuh */
    max-width: 320px;
  }

  .chart-section {
    padding: 20px;
  }

  .doughnut-section,
  .teacher-section,
  .activity-section,
  .announcement-section {
    width: 95%; /* Margin sedikit dari sisi */
    max-width: 450px; /* Batasi lebar untuk tampilan ponsel */
  }

  .chart-container p,
  .doughnut-container p,
  .teacher-list h3,
  .activity-list h3,
  .announcement-section h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }

  th, td {
    font-size: 0.95rem;
    padding: 10px;
  }

  .activity-time {
    width: 100px;
    font-size: 0.95rem;
  }

  .activity-list li {
    font-size: 1rem;
    padding: 12px 15px;
  }

  .announcement-item h4 {
    font-size: 1.2rem;
  }
  .announcement-item p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .welcome-text {
    font-size: 1.5rem;
    margin-bottom: 25px;
  }

  .card-dashboard {
    width: 95%;
    padding: 20px;
    gap: 15px;
  }

  .dashboard-icon {
    width: 55px;
    height: 55px;
  }

  .text-content h2 {
    font-size: 1.3rem;
  }

  .text-content h5 {
    font-size: 1.6rem;
  }

  .chart-section {
    padding: 15px;
  }

  .chart-container {
    height: 250px;
  }

  .chart-container p,
  .doughnut-container p,
  .teacher-list h3,
  .activity-list h3,
  .announcement-section h3 {
    font-size: 1.1rem;
  }

  .chart-labels p {
    font-size: 1rem;
    gap: 20px;
  }

  th, td {
    font-size: 0.85rem;
    padding: 8px;
  }

  .activity-time {
    width: 80px;
    font-size: 0.85rem;
  }
}
</style>