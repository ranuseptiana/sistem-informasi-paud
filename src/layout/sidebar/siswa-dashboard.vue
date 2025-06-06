<template>
<div class="main-content">
    <div class="fluid-container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Beranda</li>
            </ol>
        </nav>

        <h4 class="welcome-text">Selamat Datang, {{ userName || 'Siswa' }}!</h4>

        <div class="card-container">
            <div class="card-information">
                <div class="card-dashboard">
                    <img src="/src/assets/images/class.png" alt="Student Icon" class="dashboard-icon" />
                    <div class="text-content">
                        <h2>Jumlah Siswa</h2>
                        <h5>120</h5>
                    </div>
                </div>

                <div class="card-dashboard">
                    <img src="/src/assets/images/teacher.png" alt="Teacher Icon" class="dashboard-icon" />
                    <div class="text-content">
                        <h2>Jumlah Guru</h2>
                        <h5>15</h5>
                    </div>
                </div>

                <div class="card-dashboard">
                    <img src="/src/assets/images/board.png" alt="Class Icon" class="dashboard-icon" />
                    <div class="text-content">
                        <h2>Jumlah Kelas</h2>
                        <h5>10</h5>
                    </div>
                </div>

                <div class="card-dashboard-1">
                    <img src="/src/assets/images/school.png" alt="SPP Icon" class="dashboard-icon" />
                    <div class="text-content">
                        <h2>Total Pembayaran SPP</h2>
                        <h5>Rp 250.000.000</h5>
                    </div>
                </div>
            </div>

            <div class="dashboard-grid">
                <!-- Chart Donat -->
                <section>
                    <div class="doughnut-container">
                        <p>Jumlah Siswa</p>
                        <Doughnut :data="newData" :options="chartDisplay" />
                        <div class="chart-labels">
                            <p>Laki-Laki: {{ newData.datasets[0].data[0] }}</p>
                            <p>Perempuan: {{ newData.datasets[0].data[1] }}</p>
                        </div>
                    </div>
                </section>

                <!-- Daftar Guru -->
                <section>
                    <div class="teacher-list">
                        <h3>Daftar Guru</h3>
                        <div class="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>NIP</th>
                                        <th>Nama Lengkap</th>
                                        <th>Jabatan</th>
                                        <th>Kelas Diampu</th>
                                        <th>Tugas Mengajar</th>
                                        <th>Hari Mengajar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="guru in guruWithKelas.slice(0, 5)" :key="guru.id">
                                        <td>{{ guru.nip }}</td>
                                        <td>{{ guru.nama_lengkap }}</td>
                                        <td>{{ guru.jabatan }}</td>
                                        <td>{{ guru.kelasDiampu }}</td>
                                        <td>{{ guru.tugas_mengajar }}</td>
                                        <td>{{ guru.jumlah_hari_mengajar }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- Bagian Grafik -->
        <section class="chart-menu">
            <div class="chart-container">
                <p>Jumlah Siswa</p>
                <Bar :data="chartData" :options="chartOptions" />
            </div>
            <div class="chart-container">
                <p>Jumlah Siswa</p>
                <Line :data="dataChart" :options="chartOptions" />
            </div>
        </section>
    </div>
</div>
</template>

    
<script lang="ts">
import axios from 'axios';

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        if (chart.config.type !== 'doughnut') return;

        const {
            width,
            height,
            ctx
        } = chart;
        ctx.save();
        ctx.font = 'bold 30px Nunito Sans';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Pastikan hanya angka yang diproses
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
    name: 'BarChart',
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
                    label: 'Total Siswa',
                    backgroundColor: ['#88db7c'],
                    data: [21, 25, 25, 18, 15, 14, 14, 30],
                    barPercentage: 0.5,
                    categoryPercentage: 0.6
                }]
            },
            chartDisplay: {
                responsive: true,
                cutout: '70%', // Ukuran lubang tengah donat
                plugins: {
                    centerText: true,
                    legend: {
                        display: true,
                        position: 'center' as const
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
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 10, // Menambah jarak antara judul dan legend
                        bottom: 5
                    }
                },
                plugins: {
                    legend: {
                        position: 'top' as const,
                        labels: {
                            boxWidth: 14, // Ukuran kotak warna lebih kecil
                            padding: 5, // Jarak antara teks dan kotak warna
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            },
            dataChart: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                datasets: [{
                    label: 'Jumlah Pembayaran SPP',
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    tension: 0.4,
                    data: [20, 20, 30, 25, 15, 20, 25, 30, 23, 25, 20, 29, 35] // Data SPP
                }]
            },
            newData: { // Struktur data diperbaiki
                labels: ['Laki-Laki', 'Perempuan'],
                datasets: [{
                    label: 'Jumlah Siswa',
                    backgroundColor: ['#88db7c', '#51a943'], // Warna untuk masing-masing kategori
                    data: [20, 30] // Data jumlah siswa
                }]
            },
        }
    },
    created() { 
        this.fetchUserData();
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

        const fetchGuruList = () => {
            axios.get("/guru")
                .then((res) => {
                    guruList.value = res.data.data;
                })
                .catch((error) => console.log(error.response.data));
        };

        const fetchKelasList = () => {
            axios.get("/kelas")
                .then((res) => {
                    kelasList.value = res.data.data || [];
                })
                .catch(error => console.error("Error fetching kelas:", error));
        };

        const fetchRelasiKelasList = () => {
            axios.get("/relasikelas")
                .then((res) => {
                    relasiKelasList.value = res.data.data || [];
                })
                .catch(error => console.error("Error fetching relasi kelas:", error));
        };

        const guruWithKelas = computed(() => {
            return guruList.value.map(guru => {
                // Filter hanya relasi yang sesuai dengan guru_id
                const kelasDiampu = relasiKelasList.value
                    .filter((relasi) => relasi ?.guru_id === guru.id)
                    .map((relasi) => {
                        // Cari kelas berdasarkan kelas_id
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

            // console.log("Relasi Kelas List:", JSON.stringify(relasiKelasList.value, null, 2));
            // console.log("Kelas List:", JSON.stringify(kelasList.value, null, 2));
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
}

.card-container,
.card-information {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.card-dashboard {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #D5D5D5;
    border-radius: 8px;
    width: 250px;
    gap: 20px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card-dashboard:hover,
.card-dashboard-1:hover,
.doughnut-container:hover,
.chart-menu:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(180, 180, 180, 0.3);
}

.card-dashboard-1 {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #d5d5d5;
    border-radius: 8px;
    width: 305px;
    gap: 20px;
    text-decoration: none;
    color: inherit;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.dashboard-icon {
    width: 48px;
    height: 48px;
    transition: all 0.3s ease;
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
    color: #5e5e5e;
    font-size: 1.2rem;
    font-weight: 700;
    align-self: flex-start;
}

.text-content h5 {
    margin: 0;
    font-size: 1.3rem;
    color: #313131;
    font-weight: 400;
    align-self: flex-start;
}

.welcome-text {
    font-weight: 800;
    color: #336c2a;
    margin-top: 1.2rem;
}

.chart-menu {
    display: flex;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    transition: transform 0.3s ease;
}

.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 49%;
    padding: 15px;
    height: 340px;
    border: 1px solid #d5d5d5;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
}

.doughnut-container {
    border: 1px solid #d5d5d5;
    background: #fff;
    padding: 20px;
    width: 250px;
    height: auto;
    flex: 1;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.chart-container p,
.doughnut-container p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.chart-content {
    width: 100%;
    height: 250px;
}

.chart-labels {
    display: flex;
    justify-content: space-between;
    /* Memisahkan teks ke dua sisi */
    margin-top: 10px;
}

.chart-labels p {
    font-size: 12px;
    font-weight: bold;
    margin: 0;
    color: #7c7c7c;
}

.dashboard-grid {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.teacher-list {
    flex: 2;
    background: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #d5d5d5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.teacher-list h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    font-weight: bold;
    background: #f6f6f6;
}

.table-container {
    max-height: 240px;
    overflow-y: auto;
}

th,
td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
}

@media (max-width: 768px) {
    .main-content {
        width: 100%;
        max-width: 100%;
    }

    .card-information {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
}

@media (min-width: 361px) and (max-width: 480px) {
    .main-content {
        width: 100%;
    }

    .card-information,
    .dashboard-grid {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: 10px;
    }

    .card-dashboard,
    .card-dashboard-1 {
        min-width: 220px;
        flex-shrink: 0;
    }

    .chart-menu {
        display: flex;
        flex-direction: column;
    }

    .chart-container {
        width: 100%;
        padding: 15px;
        height: 340px;
        border: 1px solid #d5d5d5;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        background: #fff;
    }
}
</style>
