<template>
  <div class="main-content">
    <section class="content-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Pendaftaran Baru
          </li>
        </ol>
      </nav>
    </section>

    <div v-if="Object.keys(userData).length > 0" class="payment-details">
      <div class="info-list">
        <div class="info-item">
          <label>Tahun Ajaran</label>
          <div class="text-box">{{ userData.siswa?.tahun_ajaran?.tahun }}</div>
        </div>
        <div class="info-item">
          <label>Jumlah Pembayaran</label>
          <div class="text-box">Rp {{ userData.nominal?.toLocaleString('id-ID') }}</div>
        </div>
        <div class="info-item">
          <label>Tanggal Pembayaran</label>
          <div class="text-box">{{ formatDate(userData.tanggal_pembayaran) }}</div>
        </div>
        <div class="info-item">
          <label>Metode Pembayaran</label>
          <div class="text-box">{{ userData.metode_pembayaran }}</div>
        </div>
        <div class="info-item">
          <label>Status Pembayaran</label>
          <div class="text-box">{{ userData.status_pembayaran }}</div>
        </div>
        <div class="info-item">
          <label>Status Penerimaan Rapor</label>
          <div class="text-box">{{ userData.status_rapor }}</div>
        </div>
        <div class="info-item">
          <label>Status Penerimaan Atribut</label>
          <div class="text-box">{{ userData.status_atribut }}</div>
        </div>
        <div class="info-item">
          <label>Status Cicilan</label>
          <div class="text-box">
            {{ userData.status_cicilan }} 
            <button 
              v-if="userData.status_cicilan === 'Belum Lunas' || userData.status_cicilan === 'Lunas'" 
              @click="lihatCicilan(userData.id_pembayaran)" 
              class="btn-link">
              Lihat Detail
            </button>
          </div>
        </div>
        <div class="info-item">
          <label>Bukti Pembayaran</label>
          <div class="text-box">
            <img :src="getProofImageUrl(userData.bukti_pembayaran)" alt="Bukti Pembayaran" class="img-setting" v-if="userData.bukti_pembayaran" />
            <span v-else>Tidak ada bukti pembayaran</span>
          </div>
        </div>
      </div>

      <hr />

      <div class="catatan">
        <p><strong>Catatan:</strong></p>
        <ul>
          <li>
            Pembayaran pendaftaran sudah termasuk uang perlengkapan sekolah, uang
            kegiatan, SPP, dan seragam.
          </li>
          <li>
            Uang perlengkapan sekolah digunakan untuk barang kreativitas serta
            portofolio siswa.
          </li>
          <li>
            Perlengkapan sekolah tidak dibawa pulang, hanya digunakan di sekolah.
          </li>
          <li>
            Rapor dapat diterima apabila seluruh pembayaran sudah lunas dan
            diterima ketika semesteran.
          </li>
          <li>
            Atribut yang diterima hanya berupa seragam kotak-kotak, lurik, dan
            olahraga.
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="empty-payment-state">
      <div class="empty-payment-card">
        <i class="fas fa-exclamation-circle empty-icon"></i>
        <h2>Anda belum memiliki data pembayaran ini.</h2>
        <p>Harap konfirmasi kembali dengan admin terkait.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
      baseServerUrl: 'import.meta.env.VITE_API_URL/', // Sesuaikan dengan URL server Laravel Anda
    };
  },

  methods: {
    lihatCicilan(id) {
      if (id) {
        this.$router.push({ 
          path: `/siswamainsidebar/siswa/cicilan/${id}`,
          query: { type: 'pendaftaran_baru' } // Tambahkan query parameter ini
        });
      } else {
        console.error("Payment ID is undefined. Cannot navigate to cicilan detail.");
      }
    },
    async fetchUserData() {
      const userId = localStorage.getItem("user_id");
      const jb = "pendaftaran_baru";
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/siswa/pembayaran/${userId}/${jb}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && response.data.data.length > 0) {
          // Hanya set userData jika ada data yang diterima
          this.userData = response.data.data[0];
          console.log(this.userData);
        } else {
          // Jika tidak ada data atau respons kosong, set userData menjadi objek kosong
          this.userData = {};
          console.log("Tidak ada data pembayaran ditemukan.");
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data pembayaran:",
          error.response ? error.response.data : error.message
        );
        // Jika ada error, pastikan userData juga kosong agar pesan ditampilkan
        this.userData = {};
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },
    getProofImageUrl(relativePath) {
      if (relativePath) {
        return `${this.baseServerUrl}storage/${relativePath}`;
      }
      return '';
    }
  },

  mounted() {
    this.fetchUserData();
  },
};
</script>

<style scoped>
/* Gaya CSS yang sudah ada */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.info-item label {
  font-weight: 500;
  flex: 1;
  min-width: 200px;
}

.text-box {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  background-color: #f9f9f9;
  flex: 2;
  min-width: 200px;
}
.img-setting {
  width: 100px;
  height: auto;
}

.catatan {
  background-color: #f3f3f3;
  padding: 15px;
  border-radius: 8px;
}

.catatan ul {
  padding-left: 20px;
}

.catatan li {
  margin-bottom: 8px;
}

/* --- Gaya CSS Baru untuk Empty State --- */
.empty-payment-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* Memberikan tinggi minimal untuk tampilan yang baik */
  text-align: center;
  padding: 20px;
}

.empty-payment-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
}

.empty-icon {
  font-size: 60px;
  color: #ffc107; /* Warna kuning untuk ikon peringatan */
  margin-bottom: 20px;
}

.empty-payment-card h2 {
  color: #343a40;
  margin-bottom: 15px;
  font-weight: 600;
}

.empty-payment-card p {
  color: #6c757d;
  margin-bottom: 25px;
  font-size: 1.1em;
  line-height: 1.6;
}

.btn-action {
  background-color: #007bff; /* Warna biru untuk tombol */
  border-color: #007bff;
  color: white;
  padding: 12px 25px;
  font-size: 1.05em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-action:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>