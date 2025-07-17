<template>
    <footer class="footer">
         <div class="container">
             <div class="footer-content">
                 <div class="footer-column">
                     <h3>PAUD Al-Ummah</h3>
                     <ul>
                         <li><p>Jl. Dieng Atas No.16, Sumberjo, Kalisongo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151</p></li>
                         <li><p><i class="fa-solid fa-phone" style="margin-right: 0.5rem;"></i>+62 813-3530-5234</p></li>
                         <li><p><i class="fa-solid fa-envelope" style="margin-right: 0.5rem;"></i>alummahk@gmail.com</p></li>
                     </ul>
                 </div>
                 <div class="footer-column">
                     <h3>Tentang Kami</h3>
                     <ul>
                         <li><router-link to="/about">Tentang PAUD Al-Ummah</router-link></li>
                         <li><router-link to="/about">Visi dan Misi</router-link></li>
                     </ul>
                 </div>
                 <div class="footer-column">
                     <h3>Informasi Kegiatan</h3>
                     <ul>
                         <li><router-link to="/album">Galeri Kegiatan</router-link></li>
                         <li><router-link to="/agenda">Agenda Kegiatan</router-link></li>
                     </ul>
                 </div>
                 <div class="footer-column">
                     <h3>Layanan</h3>
                     <ul>
                         <li><router-link to="/information">FAQ</router-link></li>
                     </ul>
                 </div>
                 <div class="footer-column">
                     <h3>Akun Sosial Media</h3>
                     <ul>
                         <li><a href="https://web.facebook.com/paud.alummah" target="_blank"><i class="fa-brands fa-facebook" style="margin-right: 0.5rem;"></i>PAUD Al Ummah</a></li>
                         <li><a href="https://www.instagram.com/paud_alummah_dieng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><i class="fa-brands fa-instagram" style="margin-right: 0.5rem;"></i>paud_alummah_dieng</a></li>
                         <li><a href="https://www.tiktok.com/@paud.al.ummahkb.a?_t=ZS-8wc41BoN333&_r=1" target="_blank"><i class="fa-brands fa-tiktok" style="margin-right: 0.5rem;"></i>Paud AL Ummah/KB Al Ummah</a></li>
                     </ul>
                 </div>
             </div>
             <hr>
         </div>
         <hr>
         <div class="footer-bottom">
             <p>&copy; 2024 PAUD AL UMMAH</p>
         </div>
     </footer>
</template>

<script>
export default {
  data() {
    return {

    };
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
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.footer {
    background-color: #336C2A;
    color: white;
    padding: 40px 0 20px;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
}

.footer-column {
    flex: 1;
    min-width: 200px;
    margin-bottom: 20px;
    padding: 0 10px;
}

.footer-column h3 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.footer-column p, 
.footer-column a {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
}

.footer-column ul {
    list-style: none;
    padding: 0;
}

.footer-column ul li {
    margin-bottom: 10px;
}

.footer-column ul li a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: opacity 0.3s;
}

.footer-column ul li a:hover {
    opacity: 0.8;
    text-decoration: underline;
}

hr {
    border: none;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 20px 0;
}

.footer-bottom {
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
}

/* Perbaikan khusus untuk spasi footer di mobile */
@media (max-width: 768px) {
    .footer {
        padding: 25px 0 10px; /* Mengurangi padding atas-bawah */
    }
    
    .footer-content {
        gap: 20px; /* Mengurangi jarak antar kolom */
    }
    
    .footer-column {
        margin-bottom: 15px; /* Mengurangi margin bawah tiap kolom */
    }
    
    hr {
        margin: 15px 0; /* Mengurangi margin garis pemisah */
    }
    
    .footer-bottom {
        padding: 10px 0; /* Mengurangi padding copyright */
    }
}

/* Untuk perangkat sangat kecil */
@media (max-width: 480px) {
    .footer {
        padding: 20px 0 5px; /* Lebih compact lagi */
    }
    
    .footer-content {
        gap: 15px;
    }
    
    .footer-column h3 {
        margin-bottom: 8px; /* Jarak judul ke konten lebih rapat */
    }
    
    .footer-column ul li {
        margin-bottom: 6px; /* Jarak antar item list lebih rapat */
    }
    
    hr {
        margin: 10px 0;
    }
    
    .footer-bottom {
        padding: 8px 0;
        font-size: 11px; /* Ukuran font copyright lebih kecil */
    }
}
</style>