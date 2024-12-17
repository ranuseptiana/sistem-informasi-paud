<template>
<div class="container">
    <section class="content-header">
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
            <div class="card-header" style="color: white;
                    background-color: #3c680a;">
                Data Diri Siswa
            </div>
            <div class="card-body">
                <form>
                    <div class="row">
                        <div class="form-group">
                        <label for="noKK">NIK</label>
                        <input type="text" id="noKK" placeholder="Masukkan nomor KK" />
                    </div>
                        <div class="form-group">
                            <label for="nikAyah">NISN</label>
                            <input type="text" id="nikAyah" placeholder="Masukkan NIK ayah" />
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Nama Lengkap</label>
                            <input type="text" id="namaAyah" placeholder="Masukkan nama ayah" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="tahunLahirAyah">Tempat Lahir</label>
                            <input type="text" id="tahunLahirAyah" placeholder="Masukkan tahun lahir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="tahunLahirAyah">Tanggal Lahir</label>
                            <input type="text" id="tahunLahirAyah" placeholder="Masukkan tahun lahir ayah" />
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="pendidikanAkhirAyah">Agama</label>
                            <input type="text" id="pendidikanAkhirAyah" placeholder="Masukkan pendidikan akhir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanAkhirAyah">Jenis Kelamin</label>
                            <input type="text" id="pendidikanAkhirAyah" placeholder="Masukkan pendidikan akhir ayah" />
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
                            <label for="nikAyah">Nama Ayah</label>
                            <input type="text" id="nikAyah" placeholder="Masukkan nama ayah" />
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Rombel Saat Ini</label>
                            <input type="text" id="namaAyah" placeholder="Pilih rombel" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <label for="nikAyah">Anak Ke-</label>
                            <select name="anakKe" id="">
                                <option value="" disabled></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="namaAyah">Jumlah Saudara Kandung</label>
                            <input type="text" id="namaAyah" placeholder="Masukkan nama ayah" />
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 1rem;">
                        <div class="form-group">
                            <label for="tahunLahirAyah">Berat Badan</label>
                            <input type="text" id="tahunLahirAyah" placeholder="Masukkan tahun lahir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="pendidikanAkhirAyah">Tinggi Badan</label>
                            <input type="text" id="pendidikanAkhirAyah" placeholder="Masukkan pendidikan akhir ayah" />
                        </div>
                        <div class="form-group">
                            <label for="pekerjaanAyah">Lingkar Kepala</label>
                            <input type="text" id="pekerjaanAyah" placeholder="Masukkan pekerjaan ayah" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="save-data-siswa">
            <button type="submit" class="btn">Simpan</button>
        </div>
    </section>
</div>
</template>

    
<script>
export default {
    name: "AddStudents",
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
    /* Tetap di kanan */
    margin-top: 2rem;
    /* Jarak lebih besar */
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
}
</style>
