<template>
<!--Main Navigation-->
<header>
    <!-- Navbar -->
    <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light fixed-top">
        <!-- Container wrapper -->
        <div class="container-fluid">
            <!-- Brand -->
            <a class="navbar-brand" href="#">
                <img src="/src/assets/paud.png" alt="Logo" class="main-logo">
                <span class="main-brand-text">PAUD Al Ummah</span>
            </a>
            <!-- Toggle button for responsive -->
            <button class="navbar-toggler" type="button" @click="toggleSidebar" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="material-symbols-outlined">
                    menu
                </span>
            </button>
            <!-- Profile icon aligned to right -->
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-user" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->

    <!-- Sidebar -->
    <nav id="sidebarMenu" :class="{ show: sidebarOpen }" class="sidebar collapse d-lg-block">
        <div class="position-sticky mt-5" style="text-align: left;">
            <router-link to="/adminmainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
                <span class="material-symbols-outlined">dashboard</span> Dashboard
            </router-link>

            <router-link to="/adminmainsidebar/student" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'student' }" @click="setActive('student')">
                <span class="material-symbols-outlined">local_library</span> Siswa
            </router-link>

            <router-link to="/adminmainsidebar/parents" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'parents' }" @click="setActive('parents')">
                <span class="material-symbols-outlined">family_restroom</span> Orangtua
            </router-link>

            <router-link to="/adminmainsidebar/teachers" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'teacher' }" @click="setActive('teacher')">
                <span class="material-symbols-outlined">diversity_3</span> Guru
            </router-link>

            <router-link to="/adminmainsidebar/classes" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
                <span class="material-symbols-outlined">diversity_2</span> Kelas
            </router-link>

            <router-link to="/tuition" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'tuition' }" @click="setActive('tuition')">
                <span class="material-symbols-outlined">payments</span> Pembayaran SPP
            </router-link>

            <router-link to="/" class="w3-bar-item w3-button logout-button" :class="{ active: activeMenu === 'logout' }" @click="setActive('logout')" style="color: red">
                <span class="material-symbols-outlined" style="color: red">logout</span> Logout
            </router-link>
        </div>
    </nav>
    <!-- Sidebar -->
</header>

<!--Main layout-->
<main :style="{ marginLeft: sidebarOpen ? '15rem' : '0' }">
    <div class="container">
        <router-view></router-view>
    </div>
</main>
<!--Main layout-->
</template>

<script>
export default {
    data() {
        return {
            sidebarOpen: true,
            activeMenu: '',
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        closeSidebar() {
            this.sidebarOpen = false;
        },
        setActive(menu) {
            this.activeMenu = menu;
        },
        updateActiveMenu(route) {
            const currentPath = route.path;
            if (currentPath.includes('dashboard')) {
                this.activeMenu = 'dashboard';
            } else if (currentPath.includes('student')) {
                this.activeMenu = 'student';
            } else if (currentPath.includes('parents')) {
                this.activeMenu = 'parents';
            } else if (currentPath.includes('teacher')) {
                this.activeMenu = 'teacher';
            } else if (currentPath.includes('class')) {
                this.activeMenu = 'class';
            } else if (currentPath.includes('tuition')) {
                this.activeMenu = 'tuition';
            } else if (currentPath === '/') {
                this.activeMenu = 'logout';
            }
        }
    },
    mounted() {
        this.updateActiveMenu(this.$route);
    },
    watch: {
        $route(to) {
            this.updateActiveMenu(to);
        },
    }
};
</script>

<style>
main {
    transition: margin-left 0.3s ease;
}

/* Navbar styling */
.navbar {
    background-color: white;
    /* Ensure it has a background */
    z-index: 1000;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    /* Optional shadow for visibility */
}

.main-logo {
    height: 40px;
    margin-left: 2rem;
}

.main-brand-text {
    font-size: 1.2rem;
    font-weight: 700;
    color: #336C2A;
    margin-left: 1rem;
}

.nav-link {
    color: black;
}

.nav-item {
    width: 40px;
    height: 40px;
    background-color: #336C2A;
    /* Example background color */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
}

.nav-item i {
    font-size: 2rem;
    margin-top: 0.8rem;
    color: #fff;
    /* Icon color */
}

.nav-link:hover {
    color: green;
}

/* Sidebar */
.sidebar {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 15px rgba(218, 218, 218, 0.3);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 2.5rem;
    width: 250px;
    z-index: 600;
    /* transition: left 0.3s ease;
    left: -250px; */
    /* Sidebar tersembunyi */
    transform: translateX(-100%);
    /* Sembunyikan sidebar */
    transition: transform 0.3s ease;
    /* Animasi smooth */
}

.sidebar.show {
    transform: translateX(0);
    /* Tampilkan sidebar */
}

/* Sidebar styling */
.w3-sidebar {
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    border-right: 1px solid #ececec;
    z-index: 999;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    padding-top: 60px;
    box-shadow: 0 10px 15px rgba(218, 218, 218, 0.3);
}

.material-symbols-outlined {
    margin-left: 2rem;
}

/* Sidebar minimized */
.w3-sidebar.minimized {
    transform: translateX(-100%);
}

/* Styling for menu items */
.w3-bar-item {
    display: flex;
    padding: 10px;
    color: #6c757d;
    font-size: 16px;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 15px;
    transition: color 0.3s ease;
}

/* Set consistent size for icons and text */
.w3-bar-item .material-symbols-outlined,
.w3-bar-item i {
    font-size: 24px;
    /* Consistent icon size */
    color: #336C2A;
    /* Inherit color for hover and active states */
}

/* Active menu item */
.w3-bar-item.active {
    color: #336C2A;
    font-weight: 800;
}

/* Hover effect for both icon and text */
.w3-bar-item:hover {
    font-weight: 800;
    color: #336C2A;
}

.w3-button:hover {
    font-weight: 800;
    color: #336C2A !important;
}

.w3-bar-item:hover .material-symbols-outlined,
.w3-bar-item:hover i {
    color: #336C2A;
}

.navbar-toggler-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    /* Lebar total ikon */
    height: 20px;
    /* Tinggi total ikon */
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after,
.navbar-toggler-icon span {
    content: '';
    display: block;
    height: 3px;
    /* Tinggi setiap garis */
    background-color: #336C2A;
    /* Warna garis */
    border-radius: 3px;
    /* Membuat ujung garis melengkung */
    width: 100%;
}

.logout-button {
    font-weight: 800;
    margin-top: 10rem;
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
    .navbar-toggler {
        display: inline-block;
    }

    .main-profile-icon {
        display: none;
    }
}

@media (min-width: 992px) {
    .navbar-toggler {
        display: none;
    }
}
</style>
