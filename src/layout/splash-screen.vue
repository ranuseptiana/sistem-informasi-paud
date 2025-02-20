<template>
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <!-- Brand -->
            <a class="navbar-brand" href="#">
                <img src="/src/assets/paud.png" alt="Logo" class="main-logo">
                <span class="main-brand-text">PAUD Al Ummah</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- navbar content -->
            <div class="collapse navbar-collapse" id="navbarContent">
                <!-- navbar links -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-menu">
                    <!-- <router-link to="/adminmainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
                        Beranda
                    </router-link> -->
                    <router-link to="/adminmainsidebar/student" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'student' }" @click="setActive('student')">
                        Tentang Kami
                    </router-link>
                    <router-link to="/adminmainsidebar/parents" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'parents' }" @click="setActive('parents')">
                        Galeri Kegiatan
                    </router-link>
                    <router-link to="/adminmainsidebar/parents" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'parents' }" @click="setActive('parents')">
                        Agenda
                    </router-link>
                    <router-link to="/adminmainsidebar/teachers" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'teacher' }" @click="setActive('teacher')">
                        Informasi
                    </router-link>
                    <router-link to="/adminmainsidebar/classes" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
                        Kontak
                    </router-link>
                </ul>
                <!-- Profile icon -->
                <div class="navbar-nav ms-auto">
                    <button type="button" class="login-button" @click="showModal = true">Login</button>
                </div>
            </div>
        </div>
    </nav>
</header>
<div>
    <!-- Main Content -->
    <div class="container">
        <div class="content">
            <h2>Provide the best Foundation for the future of Your child</h2>
            <p>Unlock your child's potential with our nurturing environment, fostering creativity, critical thinking, and a lifelong love of learning.</p>
            <!-- <div class="button-group">
                <p class="contact-us">Hubungi kami</p>
            </div> -->
        </div>
        <img src="../assets/images/temp.png" alt="Education Image">
    </div>

    <!-- modal login -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h5>Login sebagai</h5>
            <p style="margin-bottom: 0.5rem; font-size: 1.12rem;">Pilih salah satu untuk melanjutkan</p>
            <div class="user-buttons">
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Admin'}" @click="selectedUser = 'Admin'">
                    Admin
                </button>
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Guru' }" @click="selectedUser = 'Guru'">
                    Guru
                </button>
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Orangtua' }" @click="selectedUser = 'Orangtua'">Orangtua</button>
            </div>
            <input type="text" class="input-login" placeholder="Email" />
            <input type="passwordFieldType" style="margin-bottom: 2.5rem;" class="input-login" placeholder="Password" />
            <i class="passwordFieldIcon" @click="togglePasswordVisibility">
            </i>
            <button type="button" class="login-button-2" @click="navigateToDashboard">Login</button>
        </div>
    </div>
    <!-- modal login -->

    <!-- keunggulan -->
    <div class="keunggulan-container" data-aos="fade-up">
        <div class="container">
            <div class="keunggulan">
                <div class="icon"></div>
                <div class="text">
                    <h3>KEUNGGULAN 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div class="keunggulan">
                <div class="icon"></div>
                <div class="text">
                    <h3>KEUNGGULAN 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div class="keunggulan">
                <div class="icon"></div>
                <div class="text">
                    <h3>KEUNGGULAN 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- keunggulan -->

    <div class="container">
        <div class="tentang-kami">
            <!-- tentang kami -->
            <div class="tentang-kami-head" data-aos="fade-down">
                <h4 class="judul">TENTANG KAMI</h4>
                <a href="#" class="selengkapnya">
                    Selengkapnya <span class="material-symbols-outlined">chevron_right</span>
                </a>
            </div>

            <div class="tentang-kami-title" data-aos="zoom-in">
                <h3>PAUD AL-UMMAH</h3>
                <h3>PP MAMBAUL IRSYAD</h3>
            </div>

            <p data-aos="fade-up">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div class="visi-misi">
                <div class="visi" data-aos="fade-right">
                    <h4>VISI</h4>
                    <ul>
                        <li>Lorem ipsum dolor sit amet,</li>
                        <li>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    </ul>
                </div>
                <div class="misi" data-aos="fade-left">
                    <h4>MISI</h4>
                    <ul>
                        <li>Lorem ipsum dolor sit amet,</li>
                        <li>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                        <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                    </ul>
                </div>
            </div>
            <!-- tentang kami -->

            <!-- bagian paud -->
            <div class="bagian" data-aos="fade-up">
                <h3>MENJADI BAGIAN DARI PAUD AL UMMAH</h3>
                <div class="list-kelas">
                    <div class="kelas" data-aos="flip-left">
                        <p class="nama-kelas">Playground / PG</p>
                        <p class="usia">(usia 4 tahun)</p>
                        <p class="jumlah-anak">20</p>
                        <p class="anak">anak</p>
                    </div>
                    <div class="kelas" data-aos="flip-left" data-aos-delay="200">
                        <p class="nama-kelas">TK A</p>
                        <p class="usia">(usia 4-6 tahun)</p>
                        <p class="jumlah-anak">5</p>
                        <p class="anak">anak</p>
                    </div>
                    <div class="kelas" data-aos="flip-left" data-aos-delay="400">
                        <p class="nama-kelas">TK B</p>
                        <p class="usia">(usia 5-7 tahun)</p>
                        <p class="jumlah-anak">5</p>
                        <p class="anak">anak</p>
                    </div>
                </div>
            </div>
            <!-- bagian paud -->

            <!-- galeri -->
            <div class="galeri-container">
                <div class="galeri-header" data-aos="fade-down">
                    <h4 class="judul-galeri">GALERI KEGIATAN</h4>
                    <a href="#" class="selengkapnya">
                        Selengkapnya <span class="material-symbols-outlined">chevron_right</span>
                    </a>
                </div>
                <div class="galeri">
                    <div class="item-galeri" data-aos="zoom-in">
                        <div class="gambar"></div>
                        <p class="nama-kegiatan">Nama Kegiatan</p>
                    </div>
                    <div class="item-galeri" data-aos="zoom-in" data-aos-delay="200">
                        <div class="gambar"></div>
                        <p class="nama-kegiatan">Nama Kegiatan</p>
                    </div>
                    <div class="item-galeri" data-aos="zoom-in" data-aos-delay="400">
                        <div class="gambar"></div>
                        <p class="nama-kegiatan">Nama Kegiatan</p>
                    </div>
                </div>
            </div>
            <!-- galeri -->
        </div>
    </div>

    <!-- Agenda -->
    <div class="agenda-section">
        <div class="container">
            <div class="agenda-header" data-aos="fade-down">
                <h4 class="agenda-title">AGENDA</h4>
                <a href="#" class="selengkapnya-agenda">
                    Selengkapnya <span class="material-symbols-outlined">chevron_right</span>
                </a>
            </div>
        </div>
        <div class="container">
            <div class="agenda-list">
                <div class="agenda-item" data-aos="zoom-in">
                    <div class="gambar-agenda"></div>
                    <p class="nama-agenda">Nama Kegiatan <br> Tempat kegiatan, dd mm yyyy</p>
                </div>
                <div class="agenda-item" data-aos="zoom-in" data-aos-delay="200">
                    <div class="gambar-agenda"></div>
                    <p class="nama-agenda">Nama Kegiatan <br> Tempat kegiatan, dd mm yyyy</p>
                </div>
                <div class="agenda-item" data-aos="zoom-in" data-aos-delay="400">
                    <div class="gambar-agenda"></div>
                    <p class="nama-agenda">Nama Kegiatan <br> Tempat kegiatan, dd mm yyyy</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="sambutan-footer">
            <div class="sambutan-section">
                <div class="sambutan-header" data-aos="fade-down">
                    <h3>VIDEO SAMBUTAN KEPALA PAUD AL-UMMAH</h3>
                </div>
                <div class="video-sambutan"></div>
            </div>
            <div class="maps">
                <div id="mapid" style="width: 100%; height: 400px;"></div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-column">
                <h3>PAUD Al-Ummah</h3>
                <p>Jl. Dieng Atas No.16, Sumberjo, Kalisongo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151</p>
                <p>081335305234</p>
                <p>paudalmummah.x9dau@gmail.com</p>
            </div>
            <div class="footer-column">
                <h3>Tentang Kami</h3>
                <ul>
                    <li><a href="#">Tentang PAUD Al-Ummah</a></li>
                    <li><a href="#">Visi dan Misi</a></li>
                    <li><a href="#">Rencana Pembelajaran</a></li>
                    <li><a href="#">Fasilitas</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Layanan</h3>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Pendaftaran</a></li>
                    <li><a href="#">Informasi Program</a></li>
                    <li><a href="#">Pengumuman</a></li>
                </ul>
            </div>
            <hr>
        </div>
        <div class="footer-bottom">
            <p>© 2024 PAUD Al-Ummah</p>
        </div>
    </footer>

</div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    onMounted
} from "vue";

export default {
    data() {
        return {
            showModal: false,
            isClosing: false,
            map: null,
            selectedUser: 'Admin',
            passwordFieldType: 'password',
            passwordFieldIcon: 'fas fa-eye',
        };
    },
    methods: {
        openModal() {
            this.selectedUser = 'Admin';
            this.showModal = true;
        },
        closeModal() {
            this.isClosing = true;
            setTimeout(() => {
                this.showModal = false;
                this.isClosing = false;
            }, 300);
        },
        togglePasswordVisibility() {
            if (this.passwordFieldType === 'password') {
                this.passwordFieldType = 'text';
                this.passwordFieldIcon = 'fas fa-eye-slash';
            } else {
                this.passwordFieldType = 'password';
                this.passwordFieldIcon = 'fas fa-eye';
            }
        },
        navigateToDashboard() {
            let route = '/';
            if (this.selectedUser === 'Admin') {
                route = '/adminmainsidebar/dashboard';
            } else if (this.selectedUser === 'Guru') {
                route = '/gurumainsidebar/dashboard';
            } else if (this.selectedUser === 'Orangtua') {
                route = '/parents/dashboard'; // Ubah rute ini sesuai kebutuhan Anda.
            }
            this.$router.push(route); // Menggunakan Vue Router untuk navigasi.
        },
        initializeMap() {
            if (this.map) return; // Cegah inisialisasi ulang

            this.map = L.map('mapid').setView([-7.968443564062927, 112.59706529324475], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(this.map);

            L.marker([-7.968443564062927, 112.59706529324475]).addTo(this.map)
                .bindPopup("<b>PAUD AL-UMMAH</b><br>Deskripsi lokasi")
                .openPopup();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initializeMap();
        });

        console.log(document.getElementById('mapid')); // Cek apakah elemen ditemukan

        // Pastikan elemen dengan ID "mapid" sudah ada di dalam DOM
        this.map = L.map('mapid').setView([-7.250445, 112.768845], 15); // Sesuaikan koordinatnya

        // Tambahkan tile layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        // Tambahkan marker
        L.marker([-7.250445, 112.768845]).addTo(this.map)
            .bindPopup('<b>PAUD AL-UMMAH</b><br>Deskripsi lokasi')
            .openPopup();

        onMounted(() => {
            setTimeout(() => {
                map.invalidateSize();
            }, 500);
        });
    },

};
</script>

<style scoped>
#mapid {
    width: 100%;
    height: 400px;
    /* Sesuaikan sesuai kebutuhan */
}

html {
    scroll-behavior: smooth;
}

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
    z-index: 1000;
    backdrop-filter: blur(2px);
    /* Blur effect */
}

.user-buttons {
    display: flex;
    gap: 8px;
    margin-right: auto;
    margin-bottom: 1rem;
}

.modal-content {
    background-color: white;
    padding: 60px;
    border-radius: 6px;
    width: 585px;
    height: 480px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #336C2A;
}

/* Navbar styling */
.navbar {
    background-color: white !important;
    z-index: 1000;
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    box-shadow: none;
    align-items: center;
}

.navbar-brand {
    margin-left: 3.8rem;
}

.container-fluid {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-nav {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-right: 3.5rem;
    gap: 15px;
}

.nav-menu {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 8rem;
    gap: 15px;
}

.main-logo {
    width: auto;
}

.main-brand-text {
    font-size: 1.2rem;
    font-weight: 700;
    color: #336C2A;
}

.nav-link {
    color: black;
}

.nav-link:hover {
    color: green;
}

/* Styling for menu items */
.w3-bar-item {
    display: flex;
    padding: 10px;
    color: #6c757d !important;
    font-size: 18px !important;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 15px;
    transition: color 0.3s ease;
    font-size: 24px;
    color: #336C2A;
}

/* Active menu item */
.w3-bar-item.active,
.w3-bar-item:hover {
    color: #336C2A;
    font-weight: 800;
    background: none !important;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 30px;
    text-align: left;
}

h2 {
    color: black;
    font-size: 64px;
    font-weight: 600;
}

p {
    margin-right: 100px;
}

img {
    width: auto;
    height: auto;
    max-width: 100%;
    margin-left: 0;
}

h5 {
    font-weight: 700;
    font-size: 1.8rem;
}

h5,
p {
    text-align: left;
}

.button-user {
    background-color: white;
    width: 5rem;
    height: 2rem;
    font-weight: 400;
    font-size: 0.9rem;
    border-radius: 100px;
    border: 1px solid black;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.button-user.active-user {
    background-color: #C3EAA3;
    color: #336C2A;
    transform: translateY(-3px);
    border: #C3EAA3;
}

.button-user:hover {
    background-color: #C3EAA3;
    color: #336C2A;
    transform: translateY(-3px);
    border: #C3EAA3;
}

/* login */
.input-login {
    border: 1px solid #C3EAA3;
    background-color: white;
    height: 4rem;
    width: 29rem;
    color: #000000;
    padding: 0.7rem;
    border-radius: 10px;
    margin-top: 0.5rem;
    padding-left: 2rem;
}

.login-button-2 {
    color: #336C2A;
    font-weight: 600;
    background: #C3EAA3;
    border-radius: 10px;
    width: 18rem;
    border: #C3EAA3;
    height: 4rem;
    display: block;
    margin: 0 auto;
}

.login-button-2:hover {
    border: #C3EAA3;
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

/* login */

/* section keunggulan */
.keunggulan-container {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #4b8b3b;
    padding: 20px;
}

.keunggulan {
    display: flex;
    align-items: center;
    color: white;
    width: 30%;
}

.icon {
    width: 60px;
    height: 60px;
    background-color: lightgray;
    border-radius: 50%;
    margin-right: 15px;
}

.text {
    display: flex;
    flex-direction: column;
}

.text h3 {
    margin: 0;
    font-size: 18px;
}

.text p {
    margin: 0;
    font-size: 14px;
}

/* section keunggulan */

/* section tentang kami */
.tentang-kami {
    padding: 20px;
    margin-top: 1rem;
}

.tentang-kami-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
}

.selengkapnya {
    text-decoration: none;
    color: #336C2A;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 0;
}

.selengkapnya span {
    margin-left: 2px;
    font-size: 18px;
}

.tentang-kami-title {
    display: flex;
    gap: 20px;
    /* justify-content: space-between; */
    align-items: center;
    font-weight: 800;
    margin-top: 10px;
}

.judul {
    color: #336C2A;
    font-weight: 400;
    font-size: 16px;
}

.visi-misi {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.visi,
.misi {
    width: 48%;
}

.visi h4,
.misi h4 {
    font-weight: bold;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}

.bagian {
    text-align: center;
    margin-bottom: 1rem;
}

.nama-kelas {
    font-weight: bold;
    text-align: center;
}

.usia {
    font-size: 14px;
    color: #555;
    text-align: center
}

.jumlah-anak {
    font-size: 24px;
    font-weight: bold;
    text-align: center
}

.anak {
    font-size: 16px;
    font-weight: bold;
    text-align: center
}

.bagian h3 {
    color: #336C2A;
    text-align: center;
    margin-top: 1rem;
    font-weight: 700;
    text-transform: uppercase;
}

.list-kelas {
    display: flex;
    justify-content: center;
    gap: 10rem;
    margin-top: 2rem;
    padding: 0;
}

/* galeri */
.galeri-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.judul-galeri {
    color: #336C2A;
    font-weight: 700;
    font-size: 20px;
}

.galeri,
.agenda-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
}

.item-galeri,
.agenda-item {
    text-align: center;
    width: 30%;
}

.gambar {
    width: 100%;
    height: 120px;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
}

.nama-kegiatan,
.nama-agenda {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
}

/* galeri */
.container-agenda {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 7rem;
}

.agenda-section {
    background-color: #336C2A;
    padding: 20px 0;
}

.container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: auto;
}

.agenda-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: auto;
    gap: 59rem;
}

.agenda-title {
    color: white;
    font-weight: bold;
    font-size: 20px;
}

.selengkapnya-agenda {
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.selengkapnya-agenda span {
    color: white;
    margin-left: 4px;
    font-size: 16px;
}

.agenda-list {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.gambar-agenda {
    background: #d3d3d3;
    height: 100px;
    margin-bottom: 10px;
}

.nama-agenda {
    font-weight: bold;
    color: white;
    font-size: 14px;
}

.lokasi-tanggal {
    font-size: 12px;
    color: white;
}

.sambutan-footer {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
}

.sambutan-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
}

.sambutan-header {
    margin-bottom: 1.5rem;
}

.sambutan-header h3 {
    font-weight: 700;
    color: #336C2A;
    text-align: center;
    font-size: 30px;
}

.video-sambutan {
    width: 80%;
    max-width: 700px;
    height: 200px;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    /* Memastikan elemen tetap di tengah */
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .content {
        align-items: flex-start;
        text-align: left;
        max-width: 50%;
    }

    img {
        max-width: 50%;
        margin-left: auto;
    }
}

@media (min-width: 1024px) {
    h2 {
        font-size: 48px;
    }

    img {
        width: 600px;
    }
}

.login-button {
    padding: 10px 20px;
    width: 120px;
    height: 40px;
    font-size: 16px;
    font-weight: 800;
    font-family: "Nunito Sans", sans-serif;
    color: #336C2A;
    background-color: #C3EAA3;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    line-height: 10px;
}

.button-group {
    display: flex;
    align-items: center;
}

.contact-us {
    margin-left: 25px;
    font-size: 16px;
    font-weight: 800;
    color: #000000;
    cursor: pointer;
    font-family: "Nunito Sans", sans-serif;
    padding-top: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  background-color: #336C2A;
  color: white;
  padding: 20px 0;
}

.footer-column {
  flex: 2;
  margin: 0 0px 0 25px;
}

.footer-column h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-column p {
  font-size: 14px;
  line-height: 1.5;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 8px;
}

.footer-column ul li a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5); /* Garis abu-abu */
  padding-top: 10px;
  margin-top: 10px;
  font-size: 14px;
  max-width: 1070px; /* Sesuai container */
  margin-left: auto;
  margin-right: auto;
}

.footer-bottom p {
    text-align: right;
}
</style>
