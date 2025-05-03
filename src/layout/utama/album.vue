<template>
<Navbar />
<section>
    <div class="title">
        <h3>GALERI KEGIATAN PAUD AL UMMAH</h3>
        <p>Dokumentasi kegiatan PAUD Al Ummah</p>
    </div>
</section>

<div class="container">
    <section class="galeri-koleksi">
      <div v-for="album in albumList" :key="album.id" class="galeri-container">
        <router-link :to="`/album/${album.id}`" class="no-underline text-[#336C2A] hover:text-[#336C2A]">
        <div class="item-galeri">
          <img
            :src="`http://localhost:8000/${album.photo_cover}`"
            alt="Cover Album"
            class="album-cover"
          />
            <p class="nama-kegiatan" style="text-decoration: none !important;">{{ album.nama_album }}</p>
        </div>
        </router-link>
      </div>
    </section>
  </div>
<Footer />
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Navbar from "../navbar.vue";
import Footer from "../footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const albumList = ref([]);

    const fetchAlbumList = () => {
      axios
        .get("/album")
        .then((res) => {
          if (res.data && Array.isArray(res.data.data)) {
            albumList.value = res.data.data;
          } else {
            console.error("Data format salah:", res.data);
          }
        })
        .catch((err) => {
          console.error("Gagal mengambil data:", err);
        });
    };

    onMounted(() => {
      fetchAlbumList();
    });

    return {
      albumList,
    };
  },
};
</script>

<style scoped>
.title h3 {
    color: #336c2a;
    font-weight: 800;
    text-align: center;
}

.title p {
    color: #555;
    text-align: center;
}

.item-galeri {
    text-align: center;
}

.gambar {
    width: 100%;
    max-width: 300px;
    margin-left: 0rem;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.galeri-koleksi {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1000px; /* batas lebar */
  margin: 0 auto;    
  margin-top: 24px;
}

a {
  text-decoration: none;
  color: #336c2a;
  font-weight: 600;
}

a:hover {
  color: #336c2a;
  font-weight: 800;
}

.album-cover {
  width: 100%;
  height: 10rem;
  object-fit: cover;
  border-radius: 10px;
}

/* galeri */

@media (min-width: 361px) and (max-width: 480px) {
    .title h3 {
        font-size: 16px;
    }

    .galeri-koleksi {
        margin-left: 0rem;
    }
}
</style>
