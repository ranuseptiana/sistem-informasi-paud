import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../layout/splash-screen.vue";
import AboutUs from "../layout/utama/about.vue";
import Information from "../layout/utama/information.vue";
import Gallery from "../layout/utama/gallery.vue";
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
// bagian guru
import GuruMainSidebar from "../layout/sidebar/guru-main.vue";
import GuruDashboard from "../layout/sidebar/guru-dashboard.vue";
import GuruClasses from "../layout/sidebar/guru-class.vue";
import GuruTuition from "../layout/sidebar/guru-spp.vue";

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
        path: "/gallery",
        component: Gallery,
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
                path: "addParents/:id?",  // :id adalah parameter opsional
                component: AddParents,
                props: true,  // Kirim parameter id ke komponen sebagai prop
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
                path: "classes",
                component: GuruClasses,
            },
            {
                path: "tuition",
                component: GuruTuition,
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;