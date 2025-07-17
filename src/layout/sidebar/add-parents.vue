<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/parents">Orangtua</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ isEdit ? 'Edit Data' : 'Tambah Data' }}</li>
            </ol>
        </nav>
        <h4 class="header-text">{{ isEdit ? 'Edit Data Orangtua' : 'Tambah Data Orangtua' }}</h4>
    </section>

    <section class="content-1">
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                background-color: #3c680a;">
                Data Keluarga
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="noKK">No KK</label>
                            <input v-model="form.no_kk" type="number" id="noKK" placeholder="Masukkan nomor KK" required :readonly="isEdit"/>
                        </div>
                        <div class="form-group">
                            <label for="noHp">Nomor Hp</label>
                            <input v-model="form.no_telp" type="text" id="noHp" placeholder="Masukkan nomor hp" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                background-color: #3c680a;">
                Data Ayah
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="nikAyah">NIK</label>
                            <input v-model="form.nik_ayah" type="number" id="nikAyah" placeholder="Masukkan NIK ayah" :readonly="isEdit"/>
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Nama</label>
                            <input v-model="form.nama_ayah" type="text" id="namaAyah" placeholder="Masukkan nama ayah" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tahunLahirAyah">Tahun Lahir</label>
                            <input v-model="form.tahun_lahir_ayah" type="text" id="tahunLahirAyah" placeholder="Masukkan tahun lahir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanAyah">Pendidikan Akhir</label>
                            <select name="pendidikanAyah" id="pendidikanAyah" v-model="form.pendidikan_ayah">
                                <option value="" disabled>Pilih Pendidikan</option>
                                <option value="Tidak Bersekolah">Tidak Sekolah</option>
                                <option value="SD / sederajat">SD / sederajat</option>
                                <option value="SMP / sederajat">SMP / sederajat</option>
                                <option value="SMA / sederajat">SMA / sederajat</option>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                                <option value="D4">D4</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="pekerjaanAyah">Pekerjaan Saat Ini</label>
                            <input v-model="form.pekerjaan_ayah" type="text" id="pekerjaanAyah" placeholder="Masukkan pekerjaan ayah" />
                        </div>
                        <div class="form-group">
                            <label for="penghasilanAyah">Penghasilan</label>
                            <select name="penghasilanAyah" id="penghasilanAyah" v-model="form.penghasilan_ayah">
                                <option value="" disabled>Pilih Penghasilan</option>
                                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                                <option value="Rp. 500,000 - Rp. 999,999">Rp. 500,000 - Rp. 999,999</option>
                                <option value="Rp. 1,000,000 - Rp. 1,999,999">Rp. 1,000,000 - Rp. 1,999,999</option>
                                <option value="Rp. 2,000,000 - Rp. 4,999,999">Rp. 2,000,000 - Rp. 4,999,999</option>
                                <option value="Rp. 5,000,000 - Rp. 7,999,999">Rp. 5,000,000 - Rp. 7,999,999</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                background-color: #3c680a;">
                Data Ibu
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                            <label for="nikIbu">NIK</label>
                            <input v-model="form.nik_ibu" type="text" id="nikIbu" placeholder="Masukkan NIK ibu" :readonly="isEdit"/>
                        </div>
                        <div class="form-group">
                            <label for="namaIbu">Nama</label>
                            <input v-model="form.nama_ibu" type="text" id="namaIbu" placeholder="Masukkan nama ibu" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tahunLahirIbu">Tahun Lahir</label>
                            <input v-model="form.tahun_lahir_ibu" type="text" id="tahunLahirIbu" placeholder="Masukkan tahun lahir ibu" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanIbu">Pendidikan Akhir</label>
                            <select name="pendidikanIbu" id="pendidikanIbu" v-model="form.pendidikan_ibu">
                                <option value="" disabled>Pilih Pendidikan</option>
                                <option value="Tidak Bersekolah">Tidak Sekolah</option>
                                <option value="SD / sederajat">SD / sederajat</option>
                                <option value="SMP / sederajat">SMP / sederajat</option>
                                <option value="SMA / sederajat">SMA / sederajat</option>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                                <option value="D4">D4</option>
                                <option value="S1">S1</option>
                                <option value="S2">S2</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="pekerjaanIbu">Pekerjaan Saat Ini</label>
                            <input v-model="form.pekerjaan_ibu" type="text" id="pekerjaanIbu" placeholder="Masukkan pekerjaan ibu" />
                        </div>
                        <div class="form-group">
                            <label for="penghasilanIbu">Penghasilan</label>
                            <select name="penghasilanIbu" id="penghasilanIbu" v-model="form.penghasilan_ibu">
                                <option value="" disabled>Pilih Penghasilan</option>
                                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                                <option value="Rp. 500,000 - Rp. 999,999">Rp. 500,000 - Rp. 999,999</option>
                                <option value="Rp. 1,000,000 - Rp. 1,999,999">Rp. 1,000,000 - Rp. 1,999,999</option>
                                <option value="Rp. 2,000,000 - Rp. 4,999,999">Rp. 2,000,000 - Rp. 4,999,999</option>
                                <option value="Rp. 5,000,000 - Rp. 7,999,999">Rp. 5,000,000 - Rp. 7,999,999</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-ortu">
            <button type="submit" class="btn" @click="simpanOrtu">{{ isEdit ? 'Simpan Perubahan' : 'Tambah Data' }}</button>
        </div>
    </section>
</div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios';
// import {
//     ref,
//     onMounted
// } from 'vue';

export default {
    name: "AddParents",
    data() {
        return {
            form: {
                no_kk: '',
                nik_ayah: '',
                nama_ayah: '',
                tahun_lahir_ayah: '',
                pekerjaan_ayah: '',
                pendidikan_ayah: '',
                penghasilan_ayah: '',
                nik_ibu: '',
                nama_ibu: '',
                tahun_lahir_ibu: '',
                pekerjaan_ibu: '',
                pendidikan_ibu: '',
                penghasilan_ibu: '',
                no_telp: ''
            },
            ortuList: [], 
            pendidikanAyah: "",
            pendidikanIbu: "",
            penghasilanAyah: "",
            penghasilanIbu: "",
            isEdit: false,
        }
    },
    methods: {
        async simpanOrtu() {
            if (!this.form.no_kk) {
                Swal.fire("Peringatan", "Harap lengkapi semua data keluarga!", "warning");
                return;
            }
            try {
                const payload = {
                    ...this.form,
                    no_telp: this.form.no_telp?.toString() || null,
                };

                let response;
                if (this.isEdit) {
                    response = await axios.put(`${import.meta.env.VITE_API_URL}/api/orangtua/${this.$route.params.id}`, payload);
                } else {
                    response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orangtua/`, payload);
                }

                Swal.fire("Sukses", this.isEdit ? "Data orang tua berhasil diperbarui!" : "Data orang tua berhasil disimpan!", "success");
                this.resetForm();
                this.$router.push('/adminmainsidebar/parents'); 
            } catch (error) {
                Swal.fire("Gagal", error.response?.data?.message || "Terjadi kesalahan", "error");
            }
        },

        async getOrangtuaData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orangtua/${this.$route.params.id}`);
                ('Data Orangtua:', response.data); 
                this.form = response.data.data; 
                this.isEdit = true; 
            } catch (error) {
                Swal.fire("Gagal", "Data orang tua tidak ditemukan.", "error");
            }
        },

        resetForm() {
            this.form = {
                no_kk: '',
                nik_ayah: '',
                nama_ayah: '',
                tahun_lahir_ayah: '',
                pekerjaan_ayah: '',
                pendidikan_ayah: '',
                penghasilan_ayah: '',
                nik_ibu: '',
                nama_ibu: '',
                tahun_lahir_ibu: '',
                pekerjaan_ibu: '',
                pendidikan_ibu: '',
                penghasilan_ibu: '',
                no_telp: ''
            };
            this.isEdit = false; 
        }
    },
    mounted() {
        if (this.$route.params.id) {
        this.getOrangtuaData();  
    }
        this.pendidikanAyah = "";
        this.pendidikanIbu = "";
        this.penghasilanAyah = "";
        this.penghasilanIbu = "";
    },
};
</script>

<style scoped>
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

input[readonly] {
  background-color: #f5f5f5 !important; 
  cursor: not-allowed;
  color: #888;
  border: 1px solid #ccc;
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
    }

    .info-card {
        width: 100%;
    }
}
</style>
