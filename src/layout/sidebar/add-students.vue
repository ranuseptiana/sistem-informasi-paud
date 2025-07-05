<template>
<div class="container">
    <section class="content-header-add">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/student">Siswa</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ isEdit ? 'Edit Data' : 'Tambah Data' }}</li>
            </ol>
        </nav>
        <h4 class="header-text">{{ isEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa' }}</h4>
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
                            <select v-model="form.no_kk">
                                <option value="" disabled>No KK</option>
                                <option v-for="orangtua in nomorKartuList" :key="orangtua.id" :value="orangtua.no_kk" required :disabled="isEdit">
                                        {{ orangtua.no_kk }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="nik">NIK</label>
                            <input type="text" v-model="form.nik_siswa" id="nik" placeholder="Masukkan NIK siswa" required :disabled="isEdit" />
                        </div>
                        <div class="form-group">
                            <label for="nipd">NIPD</label>
                            <input type="text" v-model="form.nipd" id="nipd" placeholder="Masukkan NIPD siswa" :disabled="isEdit" />
                        </div>
                        <div class="form-group">
                            <label for="nisn">NISN</label>
                            <input type="text" v-model="form.nisn" id="nisn" placeholder="Masukkan NISN siswa" :disabled="isEdit" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="nama">Nama Lengkap</label>
                            <input type="text" v-model="form.nama_siswa" id="nama" placeholder="Masukkan nama lengkap siswa" />
                        </div>
                        <div class="form-group">
                            <label for="tempatLahir">Tempat Lahir</label>
                            <input type="text" v-model="form.tempat_lahir" id="tempatLahir" placeholder="Masukkan tempat lahir siswa" />
                        </div>
                        <div class="form-group">
                            <label for="tanggalLahir">Tanggal Lahir</label>
                            <input type="date" v-model="form.tanggal_lahir" id="tanggalLahir" />
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
                                <option value="Perempuan">Perempuan</option>
                                <option value="Laki-laki">Laki-Laki</option>
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
                            <select v-model="form.jumlah_saudara" name="jumlahSaudara" id="jumlahSaudara">
                                <option value="" disabled></option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="rombel">Rombel Saat Ini</label>
                            <select v-model="form.kelas_id">
                                <option value="" disabled>Pilih Kelas</option>
                                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                                    {{ kelas.nama_kelas }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="beratBadan">Berat Badan</label>
                            <input type="number" v-model="form.berat_badan" id="beratBadan" />
                        </div>
                        <div class="form-group">
                            <label for="tinggiBadan">Tinggi Badan</label>
                            <input type="number" v-model="form.tinggi_badan" id="tinggiBadan" />
                        </div>
                        <div class="form-group">
                            <label for="lingkarKepala">Lingkar Kepala</label>
                            <input type="number" v-model="form.lingkar_kepala" id="lingkarKepala" />
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="status">Status</label>
                            <input type="text" v-model="form.status" id="status" />
                        </div>
                        <div class="form-group">
                            <label for="tahunAjaran">Tahun Ajaran</label>
                            <select v-model="form.tahun_ajaran_id">
                                <option value="" disabled>Pilih Tahun Ajaran</option>
                                <option v-for="tahun_ajaran in tahunAjaranList" :key="tahun_ajaran.id" :value="tahun_ajaran.id">
                                    {{ tahun_ajaran.tahun }}
                                </option>
                            </select>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-siswa">
            <button type="submit" class="btn" @click="simpanSiswa">{{ isEdit ? 'Simpan Perubahan' : 'Tambah Data' }}</button>
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
            isEdit: false,
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
                lingkar_kepala: '',
                kelas_id: '',
                tahun_ajaran_id: '',
                status: '',
            },
            siswaList: [],
            nomorKartuList: [],
            kelasList: [],
            tahunAjaranList: [],
            jenisKelamin: "",
            anakKe: "",
            jumlahSaudara: "",
            selectedKelas: "",
        }
    },
    methods: {
        async getSiswaData() {
            try {
                const response = await axios.get(`import.meta.env.VITE_API_URL/api/siswa/${this.$route.params.id}`);
                console.log('Data Siswa:', response.data);

                let siswa = response.data.data;

                // Periksa apakah tanggal_lahir ada dan ubah formatnya ke yyyy-MM-dd
                if (siswa.tanggal_lahir) {
                    let tanggalLahirArray = siswa.tanggal_lahir.split('-'); // ["21", "12", "2019"]
                    siswa.tanggal_lahir = `${tanggalLahirArray[2]}-${tanggalLahirArray[1]}-${tanggalLahirArray[0]}`; // "2019-12-21"
                }

                this.form = siswa;
                this.isEdit = true;
            } catch (error) {
                this.isEdit = false;
                Swal.fire("Gagal", "Data siswa tidak ditemukan.", "error");
            }
        },
        async getNomorKartuList() {
            try {
                const response = await axios.get(`import.meta.env.VITE_API_URL/api/orangtua/${this.$route.params.id}`);
                console.log('Data No KK:', response.data);

                if (response.data && response.data.data) {
                    this.nomorKartuList = response.data.data;
                } else {
                    console.error("Data kk tidak ditemukan dalam respons API.");
                }
            } catch (error) {
                console.error("Gagal mengambil daftar kk:", error);
                this.nomorKartuList = [];
            }
        },
        async getKelasList() {
            try {
                const response = await axios.get('import.meta.env.VITE_API_URL/api/kelas');
                console.log("Response API Kelas:", response.data);

                this.kelasList = response.data.data;
            } catch (error) {
                console.error("Gagal mengambil daftar kelas:", error);
                this.kelasList = [];
            }
        },
        async getTahunAjaranList() {
            try {
                const response = await axios.get('import.meta.env.VITE_API_URL/api/tahunajaran');
                console.log("Response API Tahun Ajaran:", response.data);

                if (response.data && response.data) {
                    this.tahunAjaranList = response.data;
                } else {
                    console.error("Data tahun ajaran tidak ditemukan dalam respons API.");
                }
            } catch (error) {
                console.error("Gagal mengambil daftar tahun ajaran:", error);
                this.tahunAjaranList = [];
            }
        },
        async simpanSiswa() {
            if (!this.form.no_kk) {
                Swal.fire("Peringatan", "Harap lengkapi semua data siswa!", "Warning");
                return;
            }
            try {
                const payload = {
                    ...this.form,
                    anak_ke: Number(this.form.anak_ke),
                    jumlah_saudara: Number(this.form.jumlah_saudara),
                    berat_badan: Number(this.form.berat_badan),
                    lingkar_kepala: Number(this.form.lingkar_kepala),
                    kelas_id: Number(this.form.kelas_id),
                };
                console.log("Payload yang dikirim:", payload);

                let response;

                if (this.isEdit) {
                    response = await axios.put(`import.meta.env.VITE_API_URL/api/siswa/${this.$route.params.id}`, payload);
                } else {
                    response = await axios.post('import.meta.env.VITE_API_URL/api/siswa', payload);
                }

                Swal.fire("Sukses", this.isEdit ? "Data siswa berhasil diperbarui!" : "Data siswa berhasil disimpan!", "success");

                this.resetForm();
                this.$router.push('/adminmainsidebar/student');
            } catch (error) {
                Swal.fire("Gagal", error.response ?.data ?.message || "Terjadi kesalahan", "error");
                console.log("Error:", error.response ?.data);
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
                lingkar_kepala: '',
                kelas_id: '',
                tahun_ajaran_id: '', // ini tambahan
                status: '',
            };
        }
    },
    mounted() {
        this.getKelasList();
        this.getTahunAjaranList();
        this.getNomorKartuList();

        if (this.$route.params.id) {
            console.log('ID Siswa:', this.$route.params.id);
            this.getSiswaData();
        }

        this.jenisKelamin = "";
        this.anakKe = "";
        this.jumlahSaudara = "";
    },
};
</script>

<style>
input:disabled {
    background-color: #f5f5f5 !important;
    color: #888 !important;
    border: 1px solid #ccc !important;
    cursor: not-allowed !important;
}

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
    cursor: pointer;
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
