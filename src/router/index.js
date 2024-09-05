import { createWebHistory, createRouter } from "vue-router";
import LandingPage from "../layout/splash-screen.vue";
import AdminMainSidebar from "../layout/sidebar/admin-main.vue";
import Dashboard from "../layout/sidebar/dashboard.vue";
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
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;