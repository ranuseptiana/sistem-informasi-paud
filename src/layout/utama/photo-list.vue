<template>
<Navbar />
<section>
    <div class="title">
        <h3>{{ album?.nama_album }}</h3>
        <p>{{ album?.deskripsi }}</p>
    </div>
</section>
<div class="container mx-auto p-4">
    <div class="button-back">
            <a href="http://localhost:5173/album"><span class="material-symbols-outlined">
                    arrow_back
                </span> Kembali
            </a>
    </div>
    <!-- Galeri -->
    <div class="galeri">
        <div v-for="foto in fotoList" :key="foto.id" class="item-galeri" @click="showImage(foto)">
            <img :src="`http://localhost:8000/${foto.path_foto.replace(/\\/g, '/')}`" alt="Foto Album" />
        </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedImage" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">×</button>
            <img :src="selectedImage" alt="Full Image" />
        </div>
    </div>

</div>
<Footer />
</template>

<script setup>
import {
    ref,
    onMounted,
    onUnmounted
} from "vue";
import {
    useRoute
} from "vue-router";
import axios from "axios";
import Navbar from "../navbar.vue";
import Footer from "../footer.vue";

const route = useRoute();
const albumId = route.params.id;

const album = ref(null);
const fotoList = ref([]);

onMounted(async () => {
    try {
        const albumRes = await axios.get(`http://localhost:8000/api/album/${albumId}`);
        album.value = albumRes.data.data;

        const fotoRes = await axios.get(`http://localhost:8000/api/album/${albumId}/foto`);
        fotoList.value = fotoRes.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

const selectedImage = ref(null);

function showImage(foto) {
    selectedImage.value = `http://localhost:8000/${foto.path_foto.replace(/\\/g, '/')}`;
}

function closeModal() {
    selectedImage.value = null;
}

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

html {
    scroll-behavior: smooth;
}

.title h3 {
    color: #336c2a;
    font-weight: 800;
    text-align: center;
}

.title p {
    color: #555;
    text-align: center;
}

.galeri {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 45px;
    margin-top: 20px;
}

.item-galeri {
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.item-galeri img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    z-index: 1001;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: auto;
}

.modal-content {
    position: relative;
    max-width: 50vw;
    max-height: 50;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
}

.button-back {
    align-items: center;
    display: flex;
    justify-content: flex-start; 
    margin-bottom: 1rem; 
}

.button-back a {
    display: flex;
    align-items: center; 
    gap: 5px; 
    font-weight: 600;
    color: #336c2a;
    text-decoration: none;
}

.button-back .material-symbols-outlined {
    font-size: 20px; 
    color: #336c2a;
}

.button-back a:hover {
    background-color: #e0e0e0;
}
</style>
