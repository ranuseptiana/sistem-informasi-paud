import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../layout/splash-screen.vue";
import AdminMainSidebar from "../layout/sidebar/admin-main.vue";
import Dashboard from "../layout/sidebar/dashboard.vue";
import Student from "../layout/sidebar/student.vue";
import Parents from "../layout/sidebar/parents.vue";
import AddParents from "../layout/sidebar/add-parents.vue";
import AddStudents from "../layout/sidebar/add-students.vue";
import Teachers from "../layout/sidebar/teachers.vue";
import Classes from "../layout/sidebar/classes.vue";
import { components } from "vuetify/dist/vuetify-labs.js";

const routes = [
    {
        path: "/",
        component: LandingPage,
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
                path: "addParents",
                component: AddParents,
            },
            {
                path: "addStudents",
                component: AddStudents,
            },
            {
                path: "teachers",
                component: Teachers,
            },
            {
                path: "classes",
                component: Classes,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;