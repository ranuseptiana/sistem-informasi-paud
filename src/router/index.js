import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../layout/splash-screen.vue";
import AboutUs from "../layout/utama/about.vue";
import Information from "../layout/utama/information.vue";
import Album from "../layout/utama/album.vue";
import Photos from "../layout/utama/photo-list.vue";
import Agenda from "../layout/utama/agenda.vue";
// bagian admin
import AdminMainSidebar from "../layout/sidebar/admin-main.vue";
import Dashboard from "../layout/sidebar/dashboard.vue";
import Student from "../layout/sidebar/student.vue";
import Parents from "../layout/sidebar/parents.vue";
import AddParents from "../layout/sidebar/add-parents.vue";
import AddStudents from "../layout/sidebar/add-students.vue";
import Teachers from "../layout/sidebar/teachers.vue";
import AddTeachers from "../layout/sidebar/add-teachers.vue";
import Classes from "../layout/sidebar/classes.vue";
import Tuition from "../layout/sidebar/tuition.vue";
import Cicilan from "../layout/sidebar/cicilan.vue";
import Gallery from "../layout/sidebar/album.vue";
import DetailGallery from "../layout/sidebar/album-detail.vue";
import Activity from "../layout/sidebar/agenda.vue";
// bagian guru
import GuruMainSidebar from "../layout/sidebar/guru-main.vue";
import GuruDashboard from "../layout/sidebar/guru-dashboard.vue";
import GuruClasses from "../layout/sidebar/guru-class.vue";
// import GuruTuition from "../layout/sidebar/guru-spp.vue";
import GuruGallery from "../layout/sidebar/guru-gallery.vue";
import GuruDetailGallery from "../layout/sidebar/guru-gallery-detail.vue";
// bagian siswa
import SiswaMainSidebar from "../layout/sidebar/siswa-main.vue";
import SiswaDashboard from "../layout/sidebar/siswa-dashboard.vue";
import SiswaKelas from "../layout/sidebar/siswa-class.vue";
import SiswaPendaftaran from "../layout/sidebar/siswa-pendaftaran.vue";
import SiswaDaftarUlang from "../layout/sidebar/siswa-daftar-ulang.vue";
import SiswaCicilan from "../layout/sidebar/siswa-cicilan.vue"
import { components } from "vuetify/dist/vuetify-labs.js";

const routes = [
    {
        path: "/",
        component: LandingPage,
    },
    {
        path: "/about",
        component: AboutUs,
    },
    {
        path: "/information",
        component: Information,
    },
    {
        path: "/album",
        component: Album,
    },
    {
        path: "/album/:id",
        name: "PhotoList",
        component: Photos, 
        props: true
    },
    {
        path: "/agenda",
        component: Agenda,
    },
    {
        path: "/adminmainsidebar",
        component: AdminMainSidebar,
        children:[
            {
                path: "dashboard",
                component: Dashboard,
            },
            {
                path: "student",
                component: Student,
            },
            {
                path: "parents",
                component: Parents,
            },
            {
                path: "teachers",
                component: Teachers,
            },
            {
                path: "classes",
                component: Classes,
            },
            {
                path: "tuition",
                component: Tuition,
            },
            {
                path: "cicilan/:id?",
                component: Cicilan,
                props: true
            },
            {
                path: "gallery",
                component: Gallery,
            },
            {
                path: "detailGallery/:id?", 
                component: DetailGallery,
                props: true, 
            },
            {
                path: "activity",
                component: Activity,
            },
            {
                path: "addParents/:id?",  
                component: AddParents,
                props: true,  
            },
            {
                path: "addStudents/:id?",
                component: AddStudents,
                props: true
            },
            {
                path: "addTeachers/:id?",
                component: AddTeachers,
                props: true
            },
        ],
    },
    {
        path: "/gurumainsidebar",
        component: GuruMainSidebar,
        children:[
            {
                path: "dashboard",
                component: GuruDashboard,
            },
            {
                path: "guru/:id?/kelas",
                component: GuruClasses,
            },
            {
                path: "gallery",
                component: GuruGallery,
            },
            {
                path: "detailGallery/:id?", 
                component: GuruDetailGallery,
                props: true, 
            },
        ],
    },
    {
        path: "/siswamainsidebar",
        component: SiswaMainSidebar,
        children:[
            {
                path: "dashboard",
                component: SiswaDashboard,
            },
            {
                path: 'siswa/:id/kelas',
                component: SiswaKelas,
                name: 'SiswaKelas',
            },
            {
                path: 'siswa/pembayaran/pendaftaran_baru',
                component: SiswaPendaftaran,
                name: 'SiswaPendaftaran'
            },
            {
                path: 'siswa/cicilan/:id',
                component: SiswaCicilan,
                name: 'DetailCicilan'
            },
            {
                path: 'siswa/daftarUlang',
                component: SiswaDaftarUlang,
                name: 'SiswaDaftarUlang'
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;