<template>
<Navbar />
<div>
    <router-view></router-view>
    <!-- Main Content -->
    <div class="container">
        <div class="content">
            <h2>Berikan Pondasi <span class="highlight"> Terbaik</span> untuk Masa Depan Anak Anda</h2>
            <p>
                Temukan potensi luar biasa si kecil dalam lingkungan yang penuh kasih untu mengembangkan kreativitas, rasa peduli, dan semangat belajar yang besar.
            </p>
        </div>
        <img src="../assets/images/temp.png" alt="Education Image" class="foto-depan">
    </div>

    <!-- keunggulan -->
    <div class="keunggulan-wrapper" data-aos="fade-up">
        <div class="container">
            <div class="keunggulan">
                <img src="../assets/images/idea.png" alt="" class="icon">
                <div class="text">
                    <h3>Membentuk Generasi Cerdas Berakhlak Mulia</h3>
                    <p>Menanamkan nilai-nilai agama dalam setiap pembelajaran yang diterapkan setiap hari</p>
                </div>
            </div>
            <div class="keunggulan">
                <img src="../assets/images/puzzle.png" alt="" class="icon">
                <div class="text">
                    <h3>Pengembangan Potensi Bakat yang Maksimal</h3>
                    <p>Membimbing serta memberikan pengasuhan penuh kasih sayang untuk pengembangan potensi</p>
                </div>
            </div>
            <div class="keunggulan">
                <img src="../assets/images/sun.png" alt="" class="icon">
                <div class="text">
                    <h3>Lingkungan yang Nyaman dan Hangat</h3>
                    <p>Lingkungan islami yang nyaman dan hangat mendukung anak berkembang dengan bahagia</p>
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
                    <a href="http://localhost:5173/about" class="selengkapnya">
                        Selengkapnya <span class="material-symbols-outlined">chevron_right</span>
                    </a>
                </div>

                <div class="tentang-kami-title" data-aos="zoom-in">
                    <h3>PAUD AL-UMMAH</h3>
                    <h3>PP MAMBAUL IRSYAD</h3>
                </div>

                <p class="deskripsi" data-aos="fade-up">
                    PAUD AL Ummah merupakan paud yang berbasis pesantren yang menekankan pembelajaran dan pengasuhan berpusat pada anak dengan pedoman keimanan yang kokoh.
                </p>

                <div class="visi-misi">
                    <div class="visi" data-aos="fade-right">
                        <h4>VISI</h4>
                        <p>Terwujudnya generasi sholeh, cemerlang, dan bermanfaat</p>
                    </div>
                    <div class="misi" data-aos="fade-left">
                        <h4>MISI</h4>
                        <ul>
                            <li>Melaksanakan pembelajaran dan pengasuhan yang berpusat pada anak dengan pedoman keimanan berbasis pesantren yang kokoh</li>
                            <li>Melakukan pembimbingan dan pengasuhan yang maksimal sebagai upaya pencapaian pembelajaran yang baik</li>
                            <li>Melaksanakan dan menjaga silaturahmi dengan lingkungan sekolah</li>
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
                            <p class="usia">(usia 4-5 tahun)</p>
                            <p class="jumlah-anak">20</p>
                            <p class="anak">anak</p>
                        </div>
                        <div class="kelas" data-aos="flip-left" data-aos-delay="200">
                            <p class="nama-kelas">TK </p>
                            <p class="usia">(usia 6-7 tahun)</p>
                            <p class="jumlah-anak">5</p>
                            <p class="anak">anak</p>
                        </div>
                    </div>
                </div>
                <!-- bagian paud -->
            </div>
        </div>

    <!-- Agenda -->
    <div class="agenda-section">
        <div class="container">
            <div class="agenda-header" data-aos="fade-down">
                <h4 class="agenda-title">Galeri Kegiatan</h4>
                <a href="http://localhost:5173/album" class="selengkapnya-agenda">
                    Selengkapnya <span class="material-symbols-outlined">chevron_right</span>
                </a>
            </div>
        </div>
        <div class="container">
            <div class="agenda-list">
                <div class="agenda-item" data-aos="zoom-in">
                    <img src="/src/assets/images/milkindo.jpg" alt="Kegiatan" class="gambar" />
                    <p class="nama-agenda">Family Gathering Goes To Milkindo <br> MILKINDO, 24 02 2025</p>
                </div>
                <div class="agenda-item" data-aos="zoom-in" data-aos-delay="200">
                    <img src="/src/assets/images/macito.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-agenda">Outing Class "Keliling Kota Malang Naik MaCiTo" <br> Malang, 06 02 2025</p>
                </div>
                <div class="agenda-item" data-aos="zoom-in" data-aos-delay="400">
                    <img src="/src/assets/images/berbagi.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-agenda">Sebar 1000 Kebaikan Ramadhan Bersama Indomaret <br> Malang, 28 03 2024</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="sambutan-footer">
            <div>
                <div class="sambutan-header">
                    <h3>ALAMAT KAMI</h3>
                </div>
                <div class="maps">
                    <l-map ref="map" v-model:zoom="zoom" :center="center">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>

                        <l-marker :lat-lng="center">
                            <l-popup>
                                <strong>Lokasi Paud Al Ummah</strong><br />
                                Jl. Dieng Atas No.16, Sumberjo, Kalisongo, Kec. Dau, <br />
                                Kabupaten Malang, Jawa Timur 65151<br />
                                <a href="https://maps.app.goo.gl/CjiFaBooMdGzmSan6" target="_blank">
                                    Lihat peta lebih besar
                                </a>
                            </l-popup>
                        </l-marker>
                    </l-map>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Navbar from "./navbar.vue";
import Footer from "./footer.vue";

import "leaflet/dist/leaflet.css";
import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
} from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        Navbar,
        Footer
    },
    data() {
        return {
            zoom: 16,
            center: [-7.968347788109535, 112.59701987933059],
        };
    },
};
</script>

<style scoped>
html {
    scroll-behavior: smooth;
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

.content h2 {
    font-size: 36px;
    font-weight: bold;
    line-height: 1.3;
    color: #000;
    position: relative;
    display: inline-block;
}

.highlight {
    position: relative;
    display: inline-block;
    z-index: 1;
    padding: 0 5px;
}

.highlight::before {
    content: "";
    position: absolute;
    right: 0;
    left: 3;
    bottom: -6px;
    width: 110%;
    height: 10px;
    background-color: #bfff11;
    z-index: -1;
    border-radius: 50px;
    opacity: 0.5;
    transform: rotate(-5deg);
}

.highlight::after {
    content: "";
    position: absolute;
    right: 1;
    left: 0;
    bottom: 1px;
    width: 104%;
    height: 10px;
    background-color: #A4DE02;
    z-index: -1;
    border-radius: 10px;
    transform: rotate(-5deg);
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

/* section keunggulan */
.keunggulan-wrapper {
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
    text-align: center;
}

.jumlah-anak {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.anak {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
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
    flex-direction: row;
    justify-content: center;
    margin-left: 5rem;
    margin-top: 2rem;
    padding: 0;
}

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

.agenda-list,
.galeri {
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
    max-width: 300px;
    margin-left: 0rem;
    height: auto;
    background-color: transparent;
    /* Hilangkan warna abu-abu */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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
    gap: 50px;
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
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

.maps {
    height: 400px;
    margin-left: 21px;
    width: 1080px;
    text-align: center;
}

[data-aos] {
    transform: none !important;
    opacity: 1 !important;
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

@media (min-width: 361px) and (max-width: 480px) {
    .foto-depan {
        display: none;
    }

    .container {
        max-width: 480px;
    }

    .content h2 {
        margin-bottom: 2rem;
    }

    .keunggulan-wrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 10px;
    }

    .keunggulan-wrapper .container {
        display: flex;
        flex-wrap: nowrap;
        gap: 15px;
        margin-left: 1rem;
        flex-direction: row;
    }

    .keunggulan {
        flex: 0 0 auto;
        width: 300px;
        display: flex;
        align-items: center;
    }

    .visi-misi {
        display: flex;
        flex-direction: row;
    }

    .tentang-kami {
        padding: 20px;
        max-width: 390px;
    }

    .tentang-kami-head h4,
    .selengkapnya {
        font-size: 10px;
    }

    .tentang-kami-title h3{
        font-size: 15px;
    }

    .nama-kegiatan,
    .nama-agenda {
        margin-top: 8px;
        font-size: 8px;
        font-weight: bold;
        width: 100%; 
        max-width: 100%; 
        word-wrap: break-word; 
        white-space: normal;
        text-align: left; 
    }

    .list-kelas p {
        font-size: 8px;
    }

    .list-kelas {
        justify-content: center; 
        gap: 10px; 
        width: 100%; 
        max-width: 100%; 
        word-wrap: break-word; 
        white-space: normal;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .maps {
        height: 180px;
        margin-left: 21px;
        width: 350px;
        text-align: center;
    }
}
</style>
