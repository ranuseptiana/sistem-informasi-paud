<template>
<Navbar />
<section>
    <div class="title">
        <h3>
            AGENDA KEGIATAN PAUD AL-UMMAH
        </h3>
        <p>Tahun Ajaran 2024/2025</p>
    </div>
</section>
<div class="container mx-auto p-4">
    <!-- Table Section -->
    <table class="w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-green-100 text-green-800">
            <tr>
                <th class="border border-gray-300 px-4 py-2">No</th>
                <th class="border border-gray-300 px-4 py-2">Nama Kegiatan</th>
        <th class="border border-gray-300 px-4 py-2">Kategori</th>
        <th class="border border-gray-300 px-4 py-2">Perkiraan Waktu</th>
        <th class="border border-gray-300 px-4 py-2">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agenda, index) in agendaList" :key="agenda.id">
                <td class="border border-gray-300 px-4 py-2 text-center">{{ index + 1 }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ agenda.nama_kegiatan }}</td>
                <td class="border border-gray-300 px-4 py-2">{{ agenda.kategori_kegiatan }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ agenda.perkiraan_waktu }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ agenda.keterangan }}</td>
            </tr>
        </tbody>
    </table>
</div>
<Footer />
</template>

<script>
import Navbar from "../navbar.vue";
import Footer from "../footer.vue";
import {
    ref,
    onMounted
} from 'vue';
import axios from 'axios';

export default {
    components: {
        Navbar,
        Footer,
    },
    setup() {
        const agendaList = ref([]);
        const baseUrl = import.meta.env.VITE_API_URL;

        const fetchAgendaList = () => {
            axios.get(`${baseUrl}/api/agenda`)
                .then((res) => {
                    ("Response API: ", res.data);
                    if (res.data && Array.isArray(res.data.data)) {
                        agendaList.value = res.data.data;
                    } else {
                        console.error("Format data tidak sesuai:", res.data);
                        agendaList.value = [];
                    }
                })
                .catch((error) => {
                    console.error("Terjadi error saat fetching data:", error);
                    agendaList.value = [];
                });
        };

        onMounted(() => {
            fetchAgendaList();
        });

        return {
            agendaList,
            fetchAgendaList,
            baseUrl
        };
    }
};
</script>

<style scoped>
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

.text-center {
    text-align: left !important;
}

@media (min-width: 361px) and (max-width: 480px) {}
</style>
