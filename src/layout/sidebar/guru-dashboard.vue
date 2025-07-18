<template>
    <div class="main-content">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Beranda</li>
            </ol>
        </nav>
    
        <h4 style="font-weight: 800; color: #336C2A;">Selamat Datang, {{ userName || 'Guru' }}!</h4>
    
        <section class="content">
        <div class="class-info-section card-wrapper">
            <div class="class-info-card">
                <div class="class-header">
                    <i class="fas fa-school class-icon"></i>
                    <h3>Kelas {{ userClass.nama_kelas || 'Memuat...' }}</h3>
                </div>
                <div class="class-details">
                    <p><strong>Tahun Ajaran:</strong> {{ displayedTahunAjaran || '-' }}</p>
                    <p><strong>Jumlah Siswa:</strong> {{ studentCount }} Siswa</p>
                    <p><strong>Kehadiran Hari Ini:</strong> {{ attendancePercentage }}%</p>
                </div>
            </div>
        </div>
    
        <div class="card-container">
            <router-link to="#" class="card-dashboard">
                <img src="/src/assets/stud-green.png" alt="Student Icon" class="dashboard-icon" />
                <div class="text-content">
                    <h2>Siswa Saya</h2>
                    <h5>{{ studentCount }}</h5>
                </div>
            </router-link>
    
            <router-link to="#" class="card-dashboard">
                <i class="fas fa-clipboard-check dashboard-icon-fa"></i>
                <div class="text-content">
                    <h2>Absensi Hari Ini</h2>
                    <h5>{{ attendancePercentage }}% Hadir</h5>
                </div>
            </router-link>
    
            <router-link to="#" class="card-dashboard">
                <i class="fas fa-book-open dashboard-icon-fa"></i>
                <div class="text-content">
                    <h2>Jurnal Mengajar</h2>
                    <h5>Lihat & Catat</h5>
                </div>
            </router-link>
    
            <router-link to="#" class="card-dashboard">
                <i class="fas fa-folder-open dashboard-icon-fa"></i>
                <div class="text-content">
                    <h2>Materi Pembelajaran</h2>
                    <h5>Akses Materi</h5>
                </div>
            </router-link>
    
            <router-link to="#" class="card-dashboard">
                <i class="fas fa-comments dashboard-icon-fa"></i>
                <div class="text-content">
                    <h2>Komunikasi Ortu</h2>
                    <h5>Kirim Pengumuman</h5>
                </div>
            </router-link>
        </div>
    
        <div class="info-grid">
            <div class="schedule-card card-wrapper">
                <h3><i class="fas fa-calendar-alt"></i> Jadwal Hari Ini</h3>
                <ul v-if="dailySchedule.length > 0">
                    <li v-for="(item, index) in dailySchedule" :key="index">
                        <strong>{{ item.time }}</strong> - {{ item.activity }}
                    </li>
                </ul>
                <p v-else>Tidak ada jadwal untuk hari ini.</p>
            </div>
    
            <div class="announcement-card card-wrapper">
                <h3><i class="fas fa-bullhorn"></i> Pengumuman Penting</h3>
                <ul v-if="announcements.length > 0">
                    <li v-for="announcement in announcements" :key="announcement.id">
                        <strong>{{ announcement.title }}</strong> - {{ announcement.date }}
                        <p>{{ announcement.content.substring(0, 70) }}...</p>
                    </li>
                </ul>
                <p v-else>Tidak ada pengumuman terbaru.</p>
            </div>
        </div>
        </section>
    </div>
    </template>
    
   
<script>
import axios from "axios";

export default {
    data() {
        return {
            userName: "",
            kelasList: {},
            siswaList: [],
            tahunAjaranList: [], 
            attendanceData: [], 
            dailySchedule: [
                { time: '07:30 - 08:00', activity: 'Circle Time & Berdoa' },
                { time: '08:00 - 09:00', activity: 'Materi Utama: Mengenal Warna' },
                { time: '09:00 - 09:30', activity: 'Snack Time & Istirahat' },
                { time: '09:30 - 10:30', activity: 'Aktivitas Motorik Kasar (Bermain di luar)' },
                { time: '10:30 - 11:30', activity: 'Aktivitas Seni: Mewarnai Gambar' },
                { time: '11:30 - 12:00', activity: 'Persiapan Pulang & Lagu Penutup' },
            ],
            announcements: [
                { id: 1, title: 'Rapat Guru Mingguan', date: '15 Juni 2025', content: 'Rapat rutin guru akan dilaksanakan pada hari Jumat, 15 Juni 2025 pukul 13.00 di ruang guru.' },
                { id: 2, title: 'Kunjungan Edukasi ke Kebun Binatang', date: '20 Juni 2025', content: 'Diinformasikan kepada seluruh guru bahwa akan ada kunjungan edukasi ke Kebun Binatang pada tanggal 20 Juni 2025. Mohon persiapkan kebutuhan siswa.' },
                { id: 3, title: 'Penilaian Akhir Semester', date: '25 Juni 2025', content: 'Periode penilaian akhir semester akan dimulai pada tanggal 25 Juni 2025. Mohon lengkapi semua catatan perkembangan siswa.' },
            ],
            displayedTahunAjaran: '2024 / 2025'
        };
    },
    mounted() {
        this.fetchUserData();
        const idGuru = localStorage.getItem("user_id");

        // ('ID Guru dari localStorage:', idGuru);

        if (idGuru) {
            this.fetchKelasByGuruId(idGuru);
            this.fetchTahunAjaranList(); 
        } else {
            console.error("ID guru tidak ditemukan di localStorage. Pastikan guru sudah login.");
        }
    },
    methods: {
        async fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token tidak ditemukan');
                    return;
                }
                const response = await axios.get('/user', { // Sesuaikan endpoint API user data
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                this.userName = response.data.name;
            } catch (error) {
                console.error('Error fetching user data:', error.response || error);
            }
        },

        async fetchKelasByGuruId(idGuru) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/guru/${idGuru}/kelas`);
                // ("Response Guru Kelas:", response.data);

                if (!response.data || !response.data.data || !response.data.data.daftar_kelas) {
                    throw new Error('Response tidak valid dari server: Struktur data tidak sesuai');
                }

                if (response.data.data.daftar_kelas.length > 0) {
                    this.kelasList = response.data.data.daftar_kelas[0];
                    this.siswaList = response.data.data.daftar_kelas[0].siswa || [];

                    this.attendanceData = this.siswaList.map(siswa => {
                        const rand = Math.random();
                        let status;
                        if (rand < 0.9) { 
                            status = 'hadir';
                        } else if (rand < 0.95) {
                            status = 'sakit';
                        } else { 
                            status = 'izin';
                        }
                        return {
                            id: siswa.id,
                            status: status
                        };
                    });

                } else {
                    this.kelasList = {};
                    this.siswaList = [];
                    this.attendanceData = []; 
                    console.warn("Guru tidak mengampu kelas apapun.");
                }

            } catch (error) {
                console.error("Error fetching class data for guru:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                alert(`Gagal memuat data kelas: ${error.response?.data?.message || error.message}`);
                this.kelasList = {};
                this.siswaList = [];
                this.attendanceData = []; 
            }
        },

        async fetchTahunAjaranList() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tahunajaran`);
                //("Response Tahun Ajaran:", response.data); 
                if (response.data && Array.isArray(response.data.data)) {
                    this.tahunAjaranList = response.data.data;
                } else if (response.data && Array.isArray(response.data)) { 
                    this.tahunAjaranList = response.data;
                } else {
                    console.error("Format data tahun ajaran tidak sesuai", response.data);
                    this.tahunAjaranList = [];
                }
            } catch (error) {
                console.error('Gagal mengambil data tahun ajaran', error);
                this.tahunAjaranList = [];
            }
        },
    },
    computed: {
        userClass() {
            return this.kelasList;
        },
        studentCount() {
            return this.siswaList.length;
        },
        attendancePercentage() {
            if (this.siswaList.length === 0) return 0;
            const presentCount = this.attendanceData.filter(s => s.status === 'hadir').length;
            return ((presentCount / this.siswaList.length) * 100).toFixed(0);
        },
        // displayedTahunAjaran() {
        //     // Pastikan kelasList.tahun_ajaran_id ada dan tahunAjaranList sudah terisi
        //     if (this.kelasList && this.kelasList.tahun_ajaran_id && this.tahunAjaranList.length > 0) {
        //         const tahunAjarObj = this.tahunAjaranList.find(
        //             item => item.id === this.kelasList.tahun_ajaran_id
        //         );
        //         // Asumsi properti tahun di objek tahun ajaran adalah 'tahun'
        //         return tahunAjarObj ? tahunAjarObj.tahun : 'Tidak Ditemukan';
        //     }
        //     return 'Memuat...'; // Atau 'Belum Ada Data'
        // }
    },
};
</script>

<style scoped>
.main-content {
    margin-top: 6.5rem;
    display: flex;
    flex-direction: column;
}

h4 {
    margin-bottom: 25px; 
}

.class-info-section {
    margin-bottom: 30px;
    width: 94%;
}

.class-info-card {
    background-color: #fff;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.class-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.class-icon {
    font-size: 2.5rem;
    color: #336C2A;
    margin-right: 15px;
}

.class-header h3 {
    margin: 0;
    font-size: 1.8rem;
    color: #336C2A;
    font-weight: 800;
}

.class-details p {
    margin: 5px 0;
    font-size: 1.1rem;
    color: #555;
}

.card-container {
    display: flex;
    width: 94%;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 30px; 
}

.card-dashboard {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    min-width: 250px; 
    flex: 1;
    gap: 20px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); 
}

.card-dashboard:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(180, 180, 180, 0.3);
}

.dashboard-icon {
    width: 48px;
    height: 48px;
    transition: all 0.3s ease;
    margin-left: 0.5rem;
}

.dashboard-icon-fa { 
    font-size: 48px;
    color: #336C2A;
    margin-left: 0.5rem;
}

.material-symbols-outlined {
    font-size: 48px;
    color: #336C2A;
}

.text-content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: space-between;
    height: 100%;
}

.text-content h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #336C2A;
    align-self: flex-start;
}

.text-content h5 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 400;
    color: #336C2A;
    align-self: flex-start;
}

/* Bagian Jadwal & Pengumuman (Grid) */
.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    width: 94%;
    margin-top: 30px;
}

.card-wrapper {
    background-color: #fff;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.schedule-card h3, .announcement-card h3 {
    color: #336C2A;
    font-weight: 800;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.schedule-card ul, .announcement-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.schedule-card li, .announcement-card li {
    margin-bottom: 10px;
    line-height: 1.4;
    color: #666;
}

.schedule-card li strong, .announcement-card li strong {
    color: #333;
}

.announcement-card p {
    font-size: 0.9em;
    color: #888;
}

/* Media Queries untuk Responsif */
@media (max-width: 768px) {
    .card-dashboard {
        min-width: 100%; 
    }
    .info-grid {
        grid-template-columns: 1fr; 
    }
}
</style>
