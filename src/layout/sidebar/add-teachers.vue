<template>
<div class="container">
    <section class="content-header-add">
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
                Data Username
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input v-model="form.username" type="text" id="username" placeholder="Tambahkan username" required :disabled="isEdit" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="form.password" type="text" id="password" placeholder="Tambahkan password" required :disabled="isEdit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white; background-color: #3c680a;">
                Data Guru
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="nip">NIP</label>
                            <input v-model="form.nip" type="number" id="nip" placeholder="Masukkan NIP" required :disabled="isEdit" />
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
                            <input v-model="form.tempat_lahir" type="text" id="tempatLahir" placeholder="Masukkan nomor hp" />
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
                nip: '',
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
            if (!this.form.nip) {
                Swal.fire("Peringatan", "Harap lengkapi semua data guru!", "warning");
                return;
            }
            try {
                const payload = {
                    ...this.form
                };
                let response;
                if (this.isEdit) {
                    response = await axios.put(`http://localhost:8000/api/guru/${this.$route.params.id}`, payload);
                } else {
                    response = await axios.post('http://localhost:8000/api/guru/', payload);

                    // Setelah berhasil buat guru, buat relasi guru-kelas
                    const guruId = response.data.data.id; // pastikan API kamu mengembalikan ID guru yang baru
                    await axios.post('http://localhost:8000/api/relasikelas', {
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
            console.log("Mencari guru dengan ID:", this.$route.params.id); // Debugging
            try {
                const response = await axios.get(`http://localhost:8000/api/guru/${this.$route.params.id}`);
                console.log('Data Guru:', response.data); // Debugging log

                this.form = response.data.data; // Isi data form dengan data guru yang ada
                this.isEdit = true; // Menandakan mode edit
            } catch (error) {
                this.isEdit = false;
                Swal.fire("Gagal", "Data guru tidak ditemukan.", "error");
            }
        },

        async getKelasList() {
            try {
                const response = await axios.get('http://localhost:8000/api/kelas');
                console.log("Response API Kelas:", response.data);

                this.kelasList = response.data.data;
            } catch (error) {
                console.error("Gagal mengambil daftar kelas:", error);
                this.kelasList = [];
            }
        },
        resetForm() {
            this.form = {
                nip: '',
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
            console.log('ID Guru:', this.$route.params.id); // Debugging log
            this.getGuruData();
        }

        this.jenisKelamin = "";
    },
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    .save-data-ortu {
        text-align: center;
        /* Tengah untuk layar kecil */
    }

    .info-card {
        width: 100%;
        /* Agar mengikuti ukuran layar */
    }
}
</style>
