<template>
<!--Main Navigation-->
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <!-- Brand -->
            <a class="navbar-brand" href="#">
                <img src="/src/assets/paud.png" alt="Logo" class="main-logo">
                <span class="main-brand-text">PAUD Al Ummah</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- navbar content -->
            <div class="collapse navbar-collapse" id="navbarContent">
                <!-- navbar links -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-menu">
                    <router-link to="/adminmainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
                        Dashboard
                    </router-link>
                    <router-link to="/adminmainsidebar/student" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'student' }" @click="setActive('student')">
                        Siswa
                    </router-link>
                    <router-link to="/adminmainsidebar/parents" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'parents' }" @click="setActive('parents')">
                        Orangtua
                    </router-link>
                    <router-link to="/adminmainsidebar/teachers" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'teacher' }" @click="setActive('teacher')">
                        Guru
                    </router-link>
                    <router-link to="/adminmainsidebar/classes" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
                        Kelas
                    </router-link>
                    <router-link to="/tuition" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'tuition' }" @click="setActive('tuition')">
                        Pembayaran SPP
                    </router-link>
                </ul>
                <!-- Profile icon -->
                <div class="navbar-nav ms-auto">
                    <a class="nav-link profile-link" href="#" id="profileDropdown" role="button" @click.prevent="toggleDropdown">
                        <i class="fas fa-user-circle"></i>
                    </a>
                    <!-- Popup dropdown -->
                    <div v-if="isDropdownVisible" class="profile-dropdown">
                        <ul>
                            <span class="dropdown-item-text">
                                <i class="fa-regular fa-user"></i>Admin
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
    </nav>
</header>
<main>
    <div class="container">
        <router-view></router-view>
    </div>
</main>
</template>

<script>
export default {
    data() {
        return {
            activeMenu: '',
            isDropdownVisible: false, // Kontrol visibilitas dropdown
        };
    },
    methods: {
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

<style>
/* Navbar styling */
.navbar {
    background-color: white;
    z-index: 1000;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.navbar-brand {
    margin-left: 3rem;
}

.container-fluid {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-nav {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-right: 2rem;
    gap: 15px;
}

.nav-menu {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 8rem;
    gap: 15px;
}

.main-logo {
    height: 40px;
}

.main-brand-text {
    font-size: 1.2rem;
    font-weight: 700;
    color: #336C2A;
}

.nav-link {
    color: black;
}

.nav-link:hover {
    color: green;
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
    font-size: 24px;
    color: #336C2A;
}

/* Active menu item */
.w3-bar-item.active,
.w3-bar-item:hover {
    color: #336C2A;
    font-weight: 800;
    background: none !important;
}

.profile-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-right: 2rem;
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
}
</style>
