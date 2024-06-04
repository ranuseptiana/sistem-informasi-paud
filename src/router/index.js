import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../layout/splash-screen.vue";
import Login from "../layout/login.vue";
import AdminDashboard from '../admin/components/admin-dashboard.vue'; 
import Siswa from '../admin/pages/siswa.vue';
import Orangtua from '../admin/pages/orangtua.vue';
import Guru from '../admin/pages/guru.vue';
import Kelas from '../admin/pages/kelas.vue';
import Berita from '../admin/pages/berita.vue';
import Agenda from '../admin/pages/agenda.vue';
import Galeri from '../admin/pages/galeri.vue';
import Pengumuman from '../admin/pages/pengumuman.vue';

import GuruDashboard from '../guru/components/dashboard-guru.vue'; 

import OrtuDashboard from '../ortu/components/dashboard-ortu.vue';

const routes = [
    {
        path: "/",
        component: LandingPage,
    },
    {
        path: "/login/:role",
        component: Login,
    },
    {
        path: '/admin-dashboard',
        component: AdminDashboard,
    },
    {
        path: '/guru-dashboard',
        component: GuruDashboard,
    },
    {
        path: '/ortu-dashboard',
        component: OrtuDashboard,
    },
    {
        path: '/siswa',
        component: Siswa,
    },
    {
        path: '/orangtua',
        component: Orangtua,
    },
    {
        path: '/guru',
        component: Guru,
    },
    {
        path: '/kelas',
        component: Kelas,
    },
    {
        path: '/berita',
        component: Berita,
    },
    {
        path: '/agenda',
        component: Agenda,
    },
    {
        path: '/galeri',
        component: Galeri,
    },
    {
        path: '/pengumuman',
        component: Pengumuman,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;