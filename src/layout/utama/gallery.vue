<template>
<Navbar />
<section>
    <div class="title">
        <h3>GALERI KEGIATAN PAUD AL UMMAH</h3>
        <p>Dokumentasi kegiatan PAUD Al Ummah</p>
    </div>
</section>

<div class="container">
    <section class="galeri-koleksi">
        <!-- galeri -->
        <div class="galeri-container">
            <div class="galeri">
                <div class="item-galeri">
                    <img src="/src/assets/images/milkindo.jpg" alt="Kegiatan" class="gambar" />
                    <p class="nama-kegiatan">Family Gathering Goes To Milkindo</p>
                </div>
                <div class="item-galeri">
                    <img src="/src/assets/images/macito.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-kegiatan">Outing Class "Keliling Kota Malang Naik MaCiTo"</p>
                </div>
                <div class="item-galeri">
                    <img src="/src/assets/images/berbagi.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-kegiatan">Sebar 1000 Kebaikan Ramadhan</p>
                </div>
            </div>
        </div>
        <!-- galeri -->
        <!-- galeri -->
        <div class="galeri-container">
            <div class="galeri">
                <div class="item-galeri">
                    <img src="/src/assets/images/milkindo.jpg" alt="Kegiatan" class="gambar" />
                    <p class="nama-kegiatan">Family Gathering Goes To Milkindo</p>
                </div>
                <div class="item-galeri">
                    <img src="/src/assets/images/macito.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-kegiatan">Outing Class "Keliling Kota Malang Naik MaCiTo"</p>
                </div>
                <div class="item-galeri">
                    <img src="/src/assets/images/berbagi.jpg" alt="kegiatan" class="gambar">
                    <p class="nama-kegiatan">Sebar 1000 Kebaikan Ramadhan</p>
                </div>
            </div>
        </div>
        <!-- galeri -->
    </section>
</div>
<Footer />
</template>

<script>
import Navbar from "../navbar.vue"
import Footer from "../footer.vue"

export default {
    components: {
        Navbar,
        Footer
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 100%;
}

.judul-halaman {
    text-align: center;
    margin-left: 2rem;
}

.title h3 {
    color: #336c2a;
    font-weight: 800;
    text-align: center;
}

.title p {
    color: #555;
    text-align: center;
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
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.galeri-koleksi {
    margin-left: 10.5rem;
}

.nama-kegiatan,
.nama-agenda {
    margin-top: 8px;
    font-size: 14px;
    font-weight: bold;
}
/* galeri */

@media (min-width: 361px) and (max-width: 480px) {
    .title h3 {
        font-size: 16px;
    }
    .galeri-koleksi {
        margin-left: 0rem;
    }
}
</style>
