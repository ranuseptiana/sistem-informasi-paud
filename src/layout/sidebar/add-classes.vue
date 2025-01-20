<template>
<div class="container">
    <section class="content-header">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/adminmainsidebar/classes">Kelas</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Tambah Data</li>
            </ol>
        </nav>
        <h4 class="header-text">Tambah Data Kelas</h4>
    </section>

    <section class="content">
        <div class="card info-card" style="border-radius: 20px;">
            <div class="card-header" style="color: white;
                background-color: #3c680a;">
                Data Kelas
            </div>
            <div class="card-body">
                <form @submit.prevent="saveOrtu">
                    <div class="row">
                        <div class="form-group">
                            <label for="namaKelas">Nama Kelas</label>
                            <input v-model="newOrtu.noKK" type="number" id="noKK" placeholder="Masukkan nomor KK" required />
                        </div>
                        <div class="form-group">
                            <label for="noHp">Nomor Hp</label>
                            <input v-model="newOrtu.noHp" type="number" id="noHp" placeholder="Masukkan nomor hp" required />
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
                <form @submit.prevent="saveOrtu">
                    <div class="row">
                        <div class="form-group">
                            <label for="nikAyah">NIK</label>
                            <input v-model="newOrtu.nikAyah" type="number" id="nikAyah" placeholder="Masukkan NIK ayah" />
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Nama</label>
                            <input v-model="newOrtu.namaAyah" type="text" id="namaAyah" placeholder="Masukkan nama ayah" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tahunLahirAyah">Tahun Lahir</label>
                            <input v-model="newOrtu.tahunLahirAyah" type="text" id="tahunLahirAyah" placeholder="Masukkan tahun lahir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanAyah">Pendidikan Akhir</label>
                            <select name="pendidikanAyah" id="pendidikanAyah" v-model="pendidikanAyah">
                                <option value="" disabled>Pilih Pendidikan</option>
                                <option value="tidakAda">Tidak Sekolah</option>
                                <option value="sd">SD / sederajat</option>
                                <option value="smp">SMP / sederajat</option>
                                <option value="sma">SMA / sederajat</option>
                                <option value="d1">D1</option>
                                <option value="d2">D2</option>
                                <option value="d3">D3</option>
                                <option value="d4">D4</option>
                                <option value="s1">S1</option>
                                <option value="s2">S2</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="pekerjaanAyah">Pekerjaan Saat Ini</label>
                            <input v-model="newOrtu.pekerjaanAyah" type="text" id="pekerjaanAyah" placeholder="Masukkan pekerjaan ayah" />
                        </div>
                        <div class="form-group">
                            <label for="penghasilanAyah">Penghasilan</label>
                            <select name="penghasilanAyah" id="penghasilanAyah" v-model="penghasilanAyah">
                                <option value="" disabled>Pilih Penghasilan</option>
                                <option value="tidakAda">Tidak Berpenghasilan</option>
                                <option value="500000 - 999999">Rp. 500,000 - Rp. 999,999</option>
                                <option value="1000000 - 1999999">Rp. 1,000,000 - Rp. 1,999,999</option>
                                <option value="2000000 - 4999999">Rp. 2,000,000 - Rp. 4,999,999</option>
                                <option value="5000000 - 7999999">Rp. 5,000,000 - Rp. 7,999,999</option>
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
                <form @submit.prevent="saveOrtu">
                    <div class="row">
                        <div class="form-group">
                            <label for="nikIbu">NIK</label>
                            <input v-model="newOrtu.nikIbu" type="text" id="nikIbu" placeholder="Masukkan NIK ibu" />
                        </div>
                        <div class="form-group">
                            <label for="namaIbu">Nama</label>
                            <input v-model="newOrtu.namaIbu" type="text" id="namaIbu" placeholder="Masukkan nama ibu" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tahunLahirIbu">Tahun Lahir</label>
                            <input v-model="newOrtu.tahunLahirIbu" type="text" id="tahunLahirIbu" placeholder="Masukkan tahun lahir ibu" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanIbu">Pendidikan Akhir</label>
                            <select name="pendidikanIbu" id="pendidikanIbu" v-model="pendidikanIbu">
                                <option value="" disabled>Pilih Pendidikan</option>
                                <option value="tidakAda">Tidak Sekolah</option>
                                <option value="sd">SD / sederajat</option>
                                <option value="smp">SMP / sederajat</option>
                                <option value="sma">SMA / sederajat</option>
                                <option value="d1">D1</option>
                                <option value="d2">D2</option>
                                <option value="d3">D3</option>
                                <option value="d4">D4</option>
                                <option value="s1">S1</option>
                                <option value="s2">S2</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="pekerjaanIbu">Pekerjaan Saat Ini</label>
                            <input v-model="newOrtu.pekerjaanIbu" type="text" id="pekerjaanIbu" placeholder="Masukkan pekerjaan ibu" />
                        </div>
                        <div class="form-group">
                            <label for="penghasilanIbu">Penghasilan</label>
                            <select name="penghasilanIbu" id="penghasilanIbu" v-model="penghasilanIbu">
                                <option value="" disabled>Pilih Penghasilan</option>
                                <option value="tidakAda">Tidak Berpenghasilan</option>
                                <option value="500000 - 999999">Rp. 500,000 - Rp. 999,999</option>
                                <option value="1000000 - 1999999">Rp. 1,000,000 - Rp. 1,999,999</option>
                                <option value="2000000 - 4999999">Rp. 2,000,000 - Rp. 4,999,999</option>
                                <option value="5000000 - 7999999">Rp. 5,000,000 - Rp. 7,999,999</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-ortu">
            <button type="submit" class="btn" onclick="saveOrtu()">Simpan</button>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: "AddParents",
    data() {
        return {
            newOrtu: {
                noKK: "",
                nikAyah: "",
                namaAyah: "",
                tahunLahirAyah: "",
                pendidikanAyah: "",
                pekerjaanAyah: "",
                penghasilanAyah: "",
                nikIbu: "",
                namaIbu: "",
                tahunLahirIbu: "",
                pendidikanIbu: "",
                pekerjaanIbu: "",
                penghasilanIbu: "",
                noHp: ""
            },
            ortuList: [], // Daftar data ortu
            pendidikanAyah: "",
            pendidikanIbu: "",
            penghasilanAyah: "",
            penghasilanIbu: "",
        }
    },
    methods: {
        saveOrtu() {
            // Simpan data
            this.ortuList.push({
                ...this.newOrtu
            });
           
            // Reset form
            this.newOrtu = {
                noKK: "",
                nikAyah: "",
                namaAyah: "",
                tahunLahirAyah: "",
                pendidikanAyah: "",
                pekerjaanAyah: "",
                penghasilanAyah: "",
                nikIbu: "",
                namaIbu: "",
                tahunLahirIbu: "",
                pendidikanIbu: "",
                pekerjaanIbu: "",
                penghasilanIbu: "",
                noHp: ""
            };
            // Navigasi ke halaman Data Ortu
            this.$router.push('/adminmainsidebar/parents');
        }
    },
    mounted() {
        this.pendidikanAyah = "";
        this.pendidikanIbu = "";
        this.penghasilanAyah = "";
        this.penghasilanIbu = "";
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
    /* Tetap di kanan */
    margin-top: 2rem;
    /* Jarak lebih besar */
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
