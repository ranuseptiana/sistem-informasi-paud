<template>
<Navbar />

<section v-if="album">
    <div class="title">
        <h3>{{ album.nama_album }}</h3>
        <p>{{ album.deskripsi }}</p>
    </div>
</section>

<div class="container mx-auto p-4">
    <div class="button-back">
        <router-link to="/album">
            <span class="material-symbols-outlined">arrow_back</span> Kembali
        </router-link>
    </div>

    <div class="galeri">
        <div v-for="foto in fotoList" :key="foto.id" class="item-galeri" @click="showImage(foto)">
            <img :src="getFotoUrl(foto.path_foto)" alt="Foto Album" />
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

  
<script>
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

export default {
    components: {
        Navbar,
        Footer
    },
    setup() {
        const route = useRoute();
        const albumId = route.params.id;

        const album = ref(null);
        const fotoList = ref([]);
        const selectedImage = ref(null);

        const getFotoUrl = (path) => {
            if (!path) return new URL("@/assets/images/placeholder.png",
                import.meta.url).href;
            const cleanPath = path.replace(/\\/g, "/");
            return `${import.meta.env.VITE_API_URL}/storage/${cleanPath}`;
        };

        const showImage = (foto) => {
            selectedImage.value = getFotoUrl(foto.path_foto);
        };

        const closeModal = () => {
            selectedImage.value = null;
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        onMounted(async () => {
            window.addEventListener("keydown", handleKeyDown);
            try {
                const albumRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/album/${albumId}`);
                album.value = albumRes.data.data;

                const fotoRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/album/${albumId}/foto`);
                fotoList.value = fotoRes.data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });

        onUnmounted(() => {
            window.removeEventListener("keydown", handleKeyDown);
        });

        return {
            album,
            fotoList,
            selectedImage,
            getFotoUrl,
            showImage,
            closeModal,
        };
    },
};
</script>  

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
    width: 100%;
}

.item-galeri {
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.item-galeri:hover {
    transform: translateY(-5px);
}

.item-galeri img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 2.5rem;
    color: white;
    cursor: pointer;
    z-index: 1001;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: auto;
    padding: 20px;
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
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
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.2s ease;
}

.button-back .material-symbols-outlined {
    font-size: 20px;
    color: #336c2a;
}

.button-back a:hover {
    background-color: #e0e0e0;
}

@media (max-width: 768px) {
    .galeri {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
    }

    .item-galeri img {
        height: 150px;
    }

    .modal-content {
        max-width: 95vw;
        max-height: 95vh;
    }

    .close-button {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .title h3 {
        font-size: 1.5rem;
    }

    .title p {
        font-size: 0.9rem;
    }

    .galeri {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
    }

    .item-galeri img {
        height: 120px;
    }

    .button-back a {
        font-size: 0.9rem;
    }

    .button-back .material-symbols-outlined {
        font-size: 18px;
    }
}
</style>
