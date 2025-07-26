<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/teachers">Guru</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ isEdit ? 'Edit Data' : 'Tambah Data' }}</li>
            </ol>
        </nav>
        <h4 class="header-text">{{ isEdit ? 'Edit Data Guru' : 'Tambah Data Guru' }}</h4>
    </section>

    <section class="content-1">
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white; background-color: #3c680a;">
                Data Guru
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="niy">NIY</label>
                            <input v-model="form.niy" type="number" id="niy" placeholder="Masukkan NIY" required />
                        </div>
                        <div class="form-group">
                            <label for="nama">Nama</label>
                            <input v-model="form.nama_lengkap" type="text" id="nama" placeholder="Masukkan nama lengkap" />
                        </div>
                        <div class="form-group">
                            <label for="jenisKelamin">Jenis Kelamin</label>
                            <select v-model="form.gender" name="jenisKelamin" id="jenisKelamin">
                                <option value="" disabled>Pilih Jenis Kelamin</option>
                                <option value="Perempuan">Perempuan</option>
                                <option value="Laki-laki">Laki-Laki</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="agama">Agama</label>
                            <input v-model="form.agama" type="text" id="agama" placeholder="Masukkan agama" required />
                        </div>

                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tempatLahir">Tempat Tanggal Lahir</label>
                            <input v-model="form.tempat_lahir" type="text" id="tempatLahir" placeholder="Masukkan tempat tanggal lahir" />
                        </div>
                        <div class="form-group">
                            <label for="tgl_lahir">Tanggal Lahir</label>
                            <input v-model="form.tgl_lahir" type="date" id="tgl_lahir" />
                        </div>
                        <div class="form-group">
                            <label for="noHp">No Telepon</label>
                            <input v-model="form.no_telp" type="text" id="noHp" placeholder="Masukkan nomor hp" />
                        </div>
                        <div class="form-group">
                            <label for="alamat">Alamat</label>
                            <input v-model="form.alamat" type="text" id="alamat" placeholder="Masukkan alamat lengkap" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                    background-color: #3c680a;">
                Data Mengajar
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="jabatan">Jabatan</label>
                            <input v-model="form.jabatan" type="text" id="jabatan" placeholder="Masukkan jabatan guru" required />
                        </div>
                        <div class="form-group">
                            <label for="tugasMengajar">Tugas Mengajar dan Tambahan</label>
                            <input v-model="form.tugas_mengajar" type="text" id="tugasMengajar" placeholder="Masukkan tugas mengajar dan tambahan" />
                        </div>
                        <div class="form-group">
                            <label for="jumlahHari">Jumlah Hari Mengajar</label>
                            <input v-model="form.jumlah_hari_mengajar" type="number" id="jumlahHari" placeholder="Masukkan jumlah hari mengajar" />
                        </div>
                        <div class="form-group">
                            <label for="tugasMengajar">Kelas yang Diajar</label>
                            <select v-model="form.kelas_id">
                                <option value="" disabled>Pilih Kelas</option>
                                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                                    {{ kelas.nama_kelas }}
                                </option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-ortu">
            <button type="submit" class="btn" @click="simpanGuru">{{ isEdit ? 'Simpan Perubahan' : 'Tambah Data' }}</button>
        </div>
    </section>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';

export default {
    name: "AddTeachers",
    data() {
        return {
            isEdit: false,
            form: {
                niy: '',
                nama_lengkap: '',
                gender: '',
                agama: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                no_telp: '',
                alamat: '',
                jabatan: '',
                jumlah_hari_mengajar: '',
                tugas_mengajar: '',
                kelas_id: ''
            },
            guruList: [],
            kelasList: [],
            jenisKelamin: "",
        }
    },
    methods: {
        async simpanGuru() {
            if (!this.form.niy) {
                Swal.fire("Peringatan", "Harap lengkapi semua data guru!", "warning");
                return;
            }
            try {
                const payload = {
                    ...this.form
                };
                let response;
                if (this.isEdit) {
                    response = await axios.put(`${import.meta.env.VITE_API_URL}/api/guru/${this.$route.params.id}`, payload);
                } else {
                    response = await axios.post(`${import.meta.env.VITE_API_URL}/api/guru/`, payload);

                    const guruId = response.data.data.id;
                    await axios.post(`${import.meta.env.VITE_API_URL}/api/relasikelas`, {
                        guru_id: guruId,
                        kelas_id: this.form.kelas_id
                    });
                }

                Swal.fire("Sukses", this.isEdit ? "Data guru berhasil diperbarui!" : "Data guru berhasil disimpan!", "success");
                this.resetForm();
                this.$router.push('/adminmainsidebar/teachers');
            } catch (error) {
                Swal.fire("Gagal", error.response ?.data ?.message || "Terjadi kesalahan", "error");
            }
        },

        async getGuruData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/guru/${this.$route.params.id}`);
                this.form = response.data.data;
                this.isEdit = true; 
            } catch (error) {
                this.isEdit = false;
                Swal.fire("Gagal", "Data guru tidak ditemukan.", "error");
            }
        },

        async getKelasList() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/kelas`);
                ("Response API Kelas:", response.data);

                this.kelasList = response.data.data;
            } catch (error) {
                console.error("Gagal mengambil daftar kelas:", error);
                this.kelasList = [];
            }
        },
        resetForm() {
            this.form = {
                niy: '',
                nama_lengkap: '',
                gender: '',
                agama: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                no_telp: '',
                alamat: '',
                jabatan: '',
                jumlah_hari_mengajar: '',
                tugas_mengajar: '',
                nama_kelas: ''
            };
            this.isEdit = false;
        }
    },
    mounted() {
        this.getKelasList();

        if (this.$route.params.id) {
            ('ID Guru:', this.$route.params.id); 
            this.getGuruData();
        }

        this.jenisKelamin = "";
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 6.5rem;
}

.breadcrumb-item {
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
    margin-bottom: 1rem;
}

.content-1 {
    width: 100%;
    max-width: 1000rem;
}

.info-card {
    width: 73rem !important;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-header {
    font-weight: 800;
    font-size: 16px;
    padding: 1rem;
}

.card-body {
    padding: 1rem;
    background-color: #fff;
}

.card-header,
.card-body {
    text-align: left;
}

.row {
    display: flex;
    gap: 1rem;
}

input[readonly] {
  background-color: #f5f5f5 !important;  
  cursor: not-allowed !important;
  color: #555 !important;
  border: 1px solid #ccc !important;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.form-group label {
    font-weight: 800;
    width: 100%;
    color: #336C2A;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}

.form-group input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
}

.form-group select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    color: black;
}

.save-data-ortu {
    text-align: right;
    margin-top: 2rem;
}

.save-data-ortu .btn {
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
    background-color: #336C2A;
    color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group {
    width: 100%;
  }

  .form-group input,
  .form-group select {
    width: 100%;
  }

  .info-card {
    width: 100% !important;
    max-width: 100%;
  }

  .content-1 {
    width: 100%;
    max-width: 100%;
  }

  .save-data-ortu {
    text-align: center;
  }

  .save-data-ortu .btn {
    width: 100%;
  }

  .header-text {
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
