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
                <!-- Profile icon -->
                <div class="navbar-nav ms-auto">
                    <a class="nav-link profile-link" href="#" id="profileDropdown" role="button" @click.prevent="toggleDropdown">
                        <i class="fas fa-user-circle"></i>
                    </a>
                    <!-- Popup dropdown -->
                    <div v-if="isDropdownVisible" class="profile-dropdown">
                        <ul>
                            <span class="dropdown-item-text">
                                <i class="fa-regular fa-user"></i>Guru
                            </span>
                            <li>
                                <router-link to="/" class="dropdown-item" :class="{ active: activeMenu === 'logout' }" @click="setActive('logout')" style="color: red">
                                    <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->

    <!-- Sidebar -->
    <nav id="sidebarMenu" :class="{ show: sidebarOpen }" class="sidebar collapse d-lg-block">
        <div class="position-sticky mt-5" style="text-align: left;">
            <router-link to="/gurumainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
                <span class="material-symbols-outlined">dashboard</span> Beranda
            </router-link>

            <router-link to="/gurumainsidebar/classes" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
                <span class="material-symbols-outlined">diversity_2</span> Kelas
            </router-link>

            <router-link to="/gurumainsidebar/tuition" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'payment' }" @click="setActive('payment')">
                <span class="material-symbols-outlined"> payments </span> Pembayaran SPP
            </router-link>
        </div>
    </nav>
    <!-- Sidebar -->
</header>

<!--Main layout-->
<main :style="{ marginLeft: sidebarOpen ? '17rem' : '0' }">
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
            isDropdownVisible: false,
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
            } else if (currentPath.includes('class')) {
                this.activeMenu = 'class';
            } else if (currentPath.includes('payment')) {
                this.activeMenu = 'payment';
            } else if (currentPath === '/') {
                this.activeMenu = 'logout';
            }
        },
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
        },
        closeDropdown() {
            this.isDropdownVisible = false;
        },
        logout() {
            console.log("Logout clicked");
        },
        handleOutsideClick(event) {
            const dropdown = document.getElementById("profileDropdown");
            if (!dropdown || !dropdown.contains(event.target)) {
                this.closeDropdown();
            }
        },
    },
    mounted() {
        this.updateActiveMenu(this.$route);

        document.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleOutsideClick);
    },
    watch: {
        $route(to) {
            this.updateActiveMenu(to);
        },
    }
};
</script>
    
<style scoped>
main {
    transition: margin-left 0.3s ease;
}

.navbar-brand {
    margin-left: 0.2rem;
}

.container {
    margin-top: -1.5rem;
}

/* Navbar styling */
.navbar {
    background-color: white;
    position: fixed;
    top: 0;
    z-index: 1000;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.main-logo {
    height: 50px;
    margin-left: 2rem;
}

.main-brand-text {
    font-size: 1.2rem;
    font-weight: 700;
    color: #336C2A;
    margin-left: 0.3rem;
    font-family: "Poppins", serif;
}

.nav-link {
    color: black;
}

.nav-item {
    width: 40px;
    height: 40px;
    background-color: #336C2A;
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
}

.nav-link:hover {
    color: green;
}

.sidebar {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 15px rgba(218, 218, 218, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding-top: 2.5rem;
    width: 240px;
    z-index: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

.sidebar.show {
    transform: translateX(0);
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
    color: #336C2A;
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
    height: 20px;
}

/* .navbar-toggler-icon::before,
.navbar-toggler-icon::after,
.navbar-toggler-icon span {
    content: '';
    display: block;
    height: 3px;
    background-color: #336C2A;
    border-radius: 3px;
    width: 100%;
} */

.logout-button {
    font-weight: 800;
    margin-top: 10rem;
}

.profile-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-right: 0rem;
}

.profile-link i {
    font-size: 2rem;
    color: #336C2A;
}

.profile-dropdown {
    position: absolute;
    top: 105%;
    right: 75px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    z-index: 1050;
    width: 130px;
    text-align: left;
}

.profile-dropdown ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.profile-dropdown li {
    padding: 0.5rem 1rem;
}

.profile-dropdown li:hover {
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
}

.dropdown-item-text {
    font-weight: 600;
    color: #797c7e !important;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
}

.dropdown-item-text i {
    margin-left: 2rem;
    margin-right: 0.5rem;
}

.dropdown-item {
    display: flex;
    align-items: center;
    font-weight: 800 !important;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
}

.dropdown-item i {
    margin-left: 1rem;
    margin-right: 0.5rem;
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

    /* .navbar {
        width: 500px;
    } */
}
</style>
