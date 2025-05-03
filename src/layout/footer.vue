<template>
   <footer class="footer">
        <div class="container">
            <div class="footer-column">
                <h3>PAUD Al-Ummah</h3>
                <ul>
                    <li><p>Jl. Dieng Atas No.16, Sumberjo, Kalisongo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151</p></li>
                    <li><p><i class="fa-solid fa-phone" style="margin-right: 0.5rem;"></i>081335305234</p></li>
                    <li><a href="https://web.facebook.com/paud.alummah"><i class="fa-brands fa-facebook" style="margin-right: 0.5rem;"></i>PAUD Al Ummah</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Tentang Kami</h3>
                <ul>
                    <li><a href="http://localhost:5173/about">Tentang PAUD Al-Ummah</a></li>
                    <li><a href="http://localhost:5173/about">Visi dan Misi</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Informasi Kegiatan</h3>
                <ul>
                    <li><a href="http://localhost:5173/album">Galeri Kegiatan</a></li>
                    <li><a href="http://localhost:5173/agenda">Agenda Kegiatan</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Layanan</h3>
                <ul>
                    <li><a href="http://localhost:5173/information">FAQ</a></li>
                </ul>
            </div>
            <hr>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 PAUD AL UMMAH</p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            name: "Footer"
        }

    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin-left: 5rem;
}

.footer {
    background-color: #336C2A;
    color: white;
    padding: 20px 0;
}

.footer-column {
    flex: 2;
    justify-content: space-between;
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
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding-top: 10px;
    margin-top: 10px;
    font-size: 14px;
    max-width: 1070px;
    margin-left: auto;
    margin-right: auto;
}

.footer-bottom p {
    text-align: left;
}

@media (min-width: 361px) and (max-width: 480px) { 
    .container {
        margin: 0;
        display: flex;
        flex-direction: column;
    }
}
</style>