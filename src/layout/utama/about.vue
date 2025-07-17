<template>
<Navbar />
<div class="tentang-kami">
    <div class="container">
        <h3 class="about-head">Tentang Kami</h3>
        <h1>PAUD AL-UMMAH</h1>
        <p>
            PAUD AL Ummah merupakan paud yang berbasis pesantren yang menekankan pembelajaran dan pengasuhan berpusat pada anak dengan pedoman keimanan yang kokoh. Paud Al Ummah memiliki visi untuk menciptakan generasi penerus yang berakhlak mulia, cerdas, dan mandiri melalui pembelajaran dan pengasuhan yang baik.
        </p>
    </div>
</div>

<div class="container">
    <!-- SEJARAH KAMI -->
    <section class="sejarah">
        <div class="text">
            <h2>SEJARAH KAMI</h2>
            <p>
                PAUD Al Ummah didirikan di Malang sebagai lembaga pendidikan anak usia dini yang berkomitmen dalam membentuk generasi muda yang cerdas, berakhlak, dan berdaya saing. Sejak awal berdirinya, PAUD ini hadir dengan visi untuk menciptakan lingkungan belajar yang menyenangkan, islami, dan penuh kasih sayang, sehingga anak-anak dapat berkembang secara optimal dalam aspek kognitif, sosial, emosional, dan spiritual.
            </p>
            <p>
                Dengan kurikulum yang menggabungkan pendidikan karakter, nilai-nilai Islam, serta metode pembelajaran aktif, PAUD Al Ummah telah menjadi pilihan bagi banyak orang tua yang menginginkan pendidikan berkualitas bagi anak-anak mereka. Berbekal tenaga pendidik yang profesional dan fasilitas yang mendukung, PAUD Al Ummah terus berinovasi untuk memberikan pengalaman belajar terbaik bagi para peserta didiknya.
            </p>
            <p>
                Seiring berjalannya waktu, PAUD Al Ummah terus berkembang, menjalin kerja sama dengan berbagai pihak, serta berkontribusi dalam membangun fondasi pendidikan yang kuat bagi generasi penerus. Dengan dukungan masyarakat dan semangat kebersamaan, PAUD Al Ummah berkomitmen untuk terus melahirkan anak-anak yang siap menghadapi masa depan dengan penuh percaya diri dan nilai-nilai kebaikan.
            </p>
        </div>
        <img class="image-placeholder" src="/src/assets/images/paud1.jpg">
    </section>

    <div class="container">
        <section class="visi-misi-section">
            <div class="visi-misi-title">
                <h2>VISI MISI KAMI</h2>
            </div>
            <div class="visi-misi">
                <div class="visi">
                    <h4>VISI</h4>
                    <p>Terwujudnya generasi sholeh, cemerlang, dan bermanfaat</p>
                </div>
                <div class="misi">
                    <h4>MISI</h4>
                    <ul>
                        <li>Melaksanakan pembelajaran dan pengasuhan yang berpusat pada anak dengan pedoman keimanan berbasis pesantren yang kokoh</li>
                        <li>Melakukan pembimbingan dan pengasuhan yang maksimal sebagai upaya pencapaian pembelajaran yang baik</li>
                        <li>Melaksanakan dan menjaga silaturahmi dengan lingkungan sekolah</li>
                    </ul>
                </div>
            </div>
            <!-- tentang kami -->
        </section>

        <section class="kurikulum-metode">
            <!-- Judul -->
            <h2 class="kurikulum-metode-title">KURIKULUM DAN METODE PEMBELAJARAN</h2>
            <p class="kurikulum-metode-subtitle">Kami menggunakan pendekatan inovatif untuk mendukung perkembangan anak.</p>

            <!-- Kurikulum -->
            <div class="kurikulum-container">
                <div v-for="(item, index) in kurikulum" :key="index" class="kurikulum-item">
                    <div class="icon">
                        <font-awesome-icon :icon="['fas', item.icon]" />
                    </div>
                    <h3 class="kurikulum-title">{{ item.title }}</h3>
                    <p class="kurikulum-description">{{ item.description }}</p>
                </div>
            </div>

            <!-- Metode Pembelajaran -->
            <div class="metode-section">
                <h3 class="metode-title">Metode Pembelajaran</h3>
                <ul class="metode-list">
                    <li v-for="(method, index) in metode" :key="index">{{ method }}</li>
                </ul>
            </div>
        </section>

    <!-- NILAI-NILAI KAMI -->
    <section class="nilai">
        <h2>NILAI-NILAI KAMI</h2>
        <p class="desc">PAUD Al-Ummah menjunjung tinggi nilai-nilai berikut untuk menciptakan lingkungan sekolah yang berkualitas</p>
        <div class="nilai-grid">
            <div class="card">
                <div class="circle blue"></div>
                <div class="content">
                    <h3>Keimanan yang kokoh</h3>
                    <p>Menekankan pada pengenalan dan penanaman nilai-nilai agama islam sejak dini dengan berlandaskan nilai kejujuran dan kasih sayang dalam setiap kegiatan.</p>
                </div>
            </div>
            <div class="card">
                <div class="circle green"></div>
                <div class="content">
                    <h3>Pembelajaran berpusat pada anak</h3>
                    <p>Pengembangan minat dan bakat anak menjadi prioritas dengan guru dan pengasuh yang berperan sebagai pembimbing.</p>
                </div>
            </div>
            <div class="card">
                <div class="circle yellow"></div>
                <div class="content">
                    <h3>Pengasuan maksimal</h3>
                    <p>Setiap anak mendapatkan perhatian yang sesuai dengan kebutuhan masing-masing secara optimal oleh tenaga pendidik.</p>
                </div>
            </div>
            <div class="card">
                <div class="circle purple"></div>
                <div class="content">
                    <h3>Silaturahmi dan kebersamaan</h3>
                    <p>Membangun lingkungan belajar yang kondusif dan menciptakan rasa kebersamaan yang kuat antara siswa dan guru.</p>
                </div>
            </div>
            <div class="card">
                <div class="circle red"></div>
                <div class="content">
                    <h3>Akhlak mulia</h3>
                    <p>Menanamkan nilai-nilai moral dan etika yang baik pada anak-anak dengan membentuk karakter anak yang sopan, santun, dan bertanggung jawab.</p>
                </div>
            </div>
            <div class="card">
                <div class="circle orange"></div>
                <div class="content">
                    <h3>Kemandirian</h3>
                    <p>Melatih anak untuk mengambil keputusan dan memecahkan masalah dengan menumbuhkan rasa percaya diri pada anak.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="map-paud">
        <h2>ALAMAT KAMI</h2>
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
    </section>
</div>
</div>
<Footer />
</template>

<script>
import Navbar from "../navbar.vue"
import Footer from "../footer.vue"

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
            activeMenu: '',
            kurikulum: [{
                    icon: 'gears',
                    title: 'Motorik & Sensorik',
                    description: 'Mengasah keterampilan fisik dan sensorik'
                },
                {
                    icon: 'child-reaching',
                    title: 'Sosial & Emosional',
                    description: ' Membantu anak memahami emosi dan berinteraksi.'
                },
                {
                    icon: 'lightbulb',
                    title: 'Kognitif & Kreatifitas',
                    description: 'Mengembangkan daya pikir dan imajinasi anak.'
                }
            ],
            metode: [
                "Belajar melalui bermain dan eksplorasi",
                "Pendekatan berbasis proyek",
                "Interaksi aktif dan kolaboratif",
                "Pembelajaran berbasis pengalaman"
            ]
        };
    },
};
</script>

<style scoped>
html {
    scroll-behavior: smooth;
}

p {
    text-align: left;
}

/* login */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.tentang-kami {
    background-color: #336C2A;
    color: white;
    width: 90rem;
    text-align: center;
    padding: 50px 0px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    max-width: 100%;
    margin: auto;
}

.tentang-kami h3 {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: normal;
}

.tentang-kami h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.tentang-kami p {
    font-size: 14px;
    line-height: 1.6;
    text-align: justify;
    max-width: 600px;
    margin: auto;
    color: #ffff;
}

.judul {
    color: #336C2A;
    font-weight: 400;
    font-size: 16px;
}

.visi-misi {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}

/* SEJARAH KAMI */
.sejarah {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
}

.text h2 {
    text-align: center;
    margin-bottom: 1rem;
}

.text p {
    text-align: justify;
}

.sejarah .text {
    flex: 1;
}

.sejarah h2,
.visi-misi-title h2,
.visi h4,
.misi h4 {
    font-size: 24px;
    font-weight: 800;
    color: #336C2A;
}

.sejarah p {
    font-size: 14px;
    line-height: 1.6;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    background-color: lightgray;
}

/* NILAI-NILAI KAMI */
.nilai {
    text-align: center;
    padding: 40px;
}

h2 {
    color: #336C2A;
    font-weight: 800;
}

.desc {
    margin-bottom: 30px;
    color: #555;
}

/* Grid Layout */
.nilai-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
}

/* Styling Kartu */
.card {
    border: none;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 15px;
    padding: 20px;
    position: relative;
    width: 90%;
    max-width: 400px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin: auto;
}

/* Lingkaran */
.circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.3);
}

/* Warna Lingkaran */
.blue {
    background-color: #223D88;
}

.green {
    background-color: #227D3E;
}

.yellow {
    background-color: #F2B705;
}

.purple {
    background-color: #822B87;
}

.red {
    background-color: #E34A4A;
}

.orange {
    background-color: #E59023;
}

/* Konten */
.content {
    margin-left: 60px;
    text-align: left;
}

h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

p {
    font-size: 14px;
    line-height: 1.5;
    color: #333;
}

/* Judul */
.kurikulum-metode {
    margin-top: 3rem;
}

.kurikulum-metode-title {
    font-size: 28px;
    font-weight: 800;
    color: #336C2A;
}

.kurikulum-metode-subtitle {
    font-size: 16px;
    color: #555;
    margin-top: 5px;
}

/* Kurikulum */
.kurikulum-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 20px;
}

.kurikulum-item {
    background: #e6f4e6;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.icon {
    font-size: 30px;
    color: #2a7f2a;
    margin-bottom: 10px;
}

.kurikulum-title {
    font-size: 18px;
    font-weight: bold;
    color: #1b5e20;
}

.kurikulum-description {
    font-size: 14px;
    color: #555;
}

/* Metode Pembelajaran */
.metode-section {
    margin-top: 30px;
    text-align: left;
}

.metode-title {
    font-size: 22px;
    font-weight: bold;
    color: #2a7f2a;
}

.metode-list {
    margin-top: 10px;
    padding-left: 20px;
}

.metode-list li {
    font-size: 14px;
    color: #444;
    margin-bottom: 5px;
}

.maps {
    height: 400px;
    width: 1080px;
    text-align: center;
    margin: 0 auto;   
  box-sizing: border-box;
}

.map-paud {
    text-align: center;
    margin-bottom: 3rem;
}

@media (max-width: 768px) {
    .sejarah {
        flex-direction: column;
        text-align: center;
    }

    .image-placeholder {
        width: 100%;
    }

    .nilai-grid {
        grid-template-columns: repeat(1, 1fr);
    }

    .maps {
        width: 70vh;
        height: 300px;
        max-width: 100%;
        margin: 0 auto;
        text-align: center;
        box-sizing: border-box;
    }

}

@media (min-width: 361px) and (max-width: 480px) {
    .tentang-kami p {
        font-size: 10px;
        text-align: center;
    }

    .tentang-kami h3 {
        font-size: 12px;
    }

    .kurikulum-metode {
        width: 100%;
        max-width: 100%;
    }

    .kurikulum-container {
        overflow-x: scroll;
    }

    .text p {
        text-align:justify;
    }

    /* .maps {
        height: 400px;
        margin-left: 21px;
        width: 380px;
        text-align: center;
    } */
    .maps {
        width: 40vh;
        height: 250px;
        max-width: 100%;
        margin: 0 auto;
        text-align: center;
    }
}

@media (min-width: 1024px) {
  .maps {
    max-width: 100%;
  }
}

</style>
