<template>
  <div class="main-content">
    <section class="content-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">Pendaftaran Baru</li>
        </ol>
      </nav>
    </section>

    <div class="info-list" v-if="pembayaranData">
  <div class="info-item">
    <label>Tahun Ajaran</label>
    <div class="text-box">{{ pembayaranData.siswa.tahun_ajaran.tahun }}</div>
  </div>
  <div class="info-item">
    <label>Jumlah Pembayaran</label>
    <div class="text-box">Rp {{ pembayaranData.nominal.toLocaleString() }}</div>
  </div>
  <div class="info-item">
    <label>Tanggal Pembayaran</label>
    <div class="text-box">{{ pembayaranData.tanggal_pembayaran }}</div>
  </div>
  <div class="info-item">
    <label>Status Pembayaran</label>
    <div class="text-box">{{ pembayaranData.status_pembayaran }}</div>
  </div>
  <div class="info-item">
    <label>Status Penerimaan Rapor</label>
    <div class="text-box">{{ pembayaranData.status_rapor }}</div>
  </div>
  <div class="info-item">
    <label>Status Penerimaan Atribut</label>
    <div class="text-box">{{ pembayaranData.status_atribut }}</div>
  </div>
  <div class="info-item">
    <label>Status Cicilan</label>
    <div class="text-box">{{ pembayaranData.status_cicilan }}</div>
  </div>
  <div class="info-item">
    <label>Bukti Pembayaran</label>
    <div class="text-box">{{ pembayaranData.bukti_pembayaran || 'tidak ada'}}</div>
  </div>
</div>

    <hr />

    <div class="catatan">
      <p><strong>Catatan:</strong></p>
      <ul>
        <li>Pembayaran pendaftaran sudah termasuk uang perlengkapan sekolah, uang kegiatan, SPP, dan seragam.</li>
        <li>Uang perlengkapan sekolah digunakan untuk barang kreativitas serta portofolio siswa.</li>
        <li>Perlengkapan sekolah tidak dibawa pulang, hanya digunakan di sekolah.</li>
        <li>Rapor dapat diterima apabila seluruh pembayaran sudah lunas dan diterima ketika semesteran.</li>
        <li>Atribut yang diterima hanya berupa seragam kotak-kotak, lurik, dan olahraga.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pembayaranData: null,
      username: "",
      password: "",
    };
  },

  mounted() {
    const idSiswa = localStorage.getItem("user_id");
    if (idSiswa) {
      this.fetchPembayaranBySiswaId(idSiswa);
    } else {
      console.error("ID siswa tidak ditemukan di localStorage");
    }
  },

  methods: {
    // async login() {
    //   try {
    //     const response = await axios.post("/auth/login", {
    //       username: this.username,
    //       password: this.password
    //     });

    //     // Simpan semua data yang diperlukan
    //     localStorage.setItem("auth_token", response.data.token);
    //     localStorage.setItem("user_id", response.data.user.id);
    //     localStorage.setItem("siswa_id", response.data.siswa_id);
    //     localStorage.setItem("user_role", response.data.user.role);

    //     // Redirect atau load data
    //     this.fetchPembayaranBySiswaId(response.data.siswa_id);
    //   } catch (error) {
    //     console.error("Login error:", error.response?.data);
    //     this.error = error.response?.data?.message || "Login gagal";
    //   }
    // },
    async fetchPembayaranBySiswaId(idSiswa) {
  try {
    // Pastikan mengambil token dari key yang benar
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    
    if (!token) {
      throw new Error("Token autentikasi tidak ditemukan");
    }

    console.log("Token yang digunakan:", token);

    const response = await axios.get(
      `/siswa/pembayaran/${idSiswa}/pendaftaran_baru`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    this.pembayaranData = response.data.data[0];
      } catch (error) {
        console.error("Detail error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });

        if (error.response?.status === 403) {
          this.error = "Akses ditolak. Pastikan Anda memiliki izin atau token masih valid.";
        } else {
          this.error = error.message;
        }
      }
    },
  },
};
</script>

<style scoped>
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
</style>
