<template>
<div class="container">
    <section class="content-header-add">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/student">Siswa</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Tambah Data</li>
            </ol>
        </nav>
        <h4 class="header-text">Tambah Data Siswa</h4>
    </section>

    <section class="content">
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white; background-color: #3c680a;">
                Data Diri Siswa
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="noKK">No KK</label>
                            <input type="text" v-model="form.no_kk" id="noKK" placeholder="Masukkan nomor KK" required/>
                        </div>
                        <div class="form-group">
                            <label for="nik">NIK</label>
                            <input type="text" v-model="form.nik_siswa" id="nik" placeholder="Masukkan NIK siswa" required/>
                        </div>
                        <div class="form-group">
                            <label for="nisn">NISN</label>
                            <input type="text" v-model="form.nisn" id="nisn" placeholder="Masukkan NISN siswa" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="nama">Nama Lengkap</label>
                            <input type="text" v-model="form.nama_siswa" id="nama" placeholder="Masukkan nama lengkpa siswa" />
                        </div>
                        <div class="form-group">
                            <label for="tempatLahir">Tempat Lahir</label>
                            <input type="text" v-model="form.tempat_lahir" id="tempatLahir" placeholder="Masukkan tempat lahir siswa" />
                        </div>
                        <div class="form-group">
                            <label for="tanggalLahir">Tanggal Lahir</label>
                            <input type="date" v-model="form.tanggal_lahir" id="tanggalLahir" placeholder="Masukkan tanggal lahir siswa" />
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="agama">Agama</label>
                            <input v-model="form.agama" type="text" id="agama" placeholder="Masukkan agama siswa" />
                        </div>
                        <div class="form-group">
                            <label for="alamat">Alamat</label>
                            <input v-model="form.alamat" type="text" id="alamat" placeholder="Masukkan alamat siswa" />
                        </div>
                        <div class="form-group">
                            <label for="jenisKelamin">Jenis Kelamin</label>
                            <select v-model="form.jenis_kelamin" name="jenisKelamin" id="jenisKelamin">
                                <option value="" disabled>Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                    background-color: #3c680a;">
                Informasi Tambahan Siswa
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="anakKe">Anak Ke-</label>
                            <select v-model="form.anak_ke" name="anakKe" id="anakKe">
                                <option value="" disabled></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Jumlah Saudara Kandung</label>
                            <select v-model="form.jumlah_saudara" name="jumlahSaudara" id="jumlahSaudara" >
                                <option value="" disabled></option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="beratBadan">Berat Badan</label>
                            <input type="number" v-model="form.berat_badan" id="beratBadan"/>
                        </div>
                        <div class="form-group">
                            <label for="tinggiBadan">Tinggi Badan</label>
                            <input type="number" v-model="form.tinggi_badan" id="tinggiBadan"/>
                        </div>
                        <div class="form-group">
                            <label for="lingkarKepala">Lingkar Kepala</label>
                            <input type="number" v-model="form.lingkar_kepala" id="tinggiBadan"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-siswa">
            <button @submit.prevent="simpanSiswa" type="submit" class="btn" @click="simpanSiswa">Simpan</button>
        </div>
    </section>
</div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
    name: "AddStudents",
    data() {
        return {
            form: {
                no_kk: '',
                nik_siswa: '',
                nisn: '',
                nama_siswa: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                jenis_kelamin: '',
                agama: '',
                alamat: '',
                anak_ke: '',
                jumlah_saudara: '',
                berat_badan: '',
                lingkar_kepala: ''
            },
            siswaList: [],
            jenisKelamin: "",
            anakKe: "",
            jumlahSaudara: ""
        }
    },
    methods: {
        async simpanSiswa() {
            if (!this.form.no_kk) {
                Swal.fire("Peringatan", "Harap lengkapi semua data siswa!", "Warning");
                return;
            }
            try {
                const payload = {
                    ...this.form
                };
                const response = await axios.post('http://localhost:8000/api/siswa', payload);
                Swal.fire("Sukses", "Data siswa berhasil disimpan!", "success");
                this.resetForm();
            }  catch (error) {
                Swal.fire("Gagal", error.response?.data?.message || "Terjadi kesalahan", "error");
                console.log("Error:",)
            }
        },

        resetForm() {
            this.form = {
                no_kk: '',
                nik_siswa: '',
                nisn: '',
                nama_siswa: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                jenis_kelamin: '',
                agama: '',
                alamat: '',
                anak_ke: '',
                jumlah_saudara: '',
                berat_badan: '',
                lingkar_kepala: ''
            };
        }
    },
    mounted() {
        this.jenisKelamin = "";
        this.anakKe = "";
        this.jumlahSaudara = "";
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
    margin-top: 4.3rem;
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
    font-weight: 800;
    color: #336C2A;
    margin-bottom: 1rem;
}

.info-card {
    width: 61.5rem;
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
    gap: 1px;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.form-group label {
    font-weight: 800;
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
}

.save-data-siswa {
    text-align: right;
    margin-top: 2rem;
}

.save-data-siswa .btn {
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
</style>
