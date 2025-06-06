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
                    <a ref="profileDropdown" class="nav-link profile-link" href="#" id="profileDropdown" role="button" @click.prevent="toggleProfileDropdown">
                        <i class="fas fa-user-circle"></i>
                    </a>
                    <!-- Popup dropdown -->
                    <div v-if="isProfileDropdownVisible" ref="profileDropdown" class="profile-dropdown">
                        <ul>
                            <span class="dropdown-item-text">
                                <i class="fa-regular fa-user"></i>{{ userName || 'Siswa' }}
                            </span>
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
        <div class="sidebar-menu-container">
            <!-- Menu utama -->
            <div>
                <router-link to="/siswamainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
                    <span class="material-symbols-outlined">dashboard</span> Beranda
                </router-link>

                <router-link to="/siswamainsidebar/siswa/:id/kelas" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
                    <span class="material-symbols-outlined">diversity_2</span> Kelas
                </router-link>

                <div class="w3-bar-item w3-button dropdown-btn" @click.stop="togglePaymentDropdown" :class="{ active: activeMenu === 'payment' }">
                    <span class="material-symbols-outlined">payments</span> Pembayaran
                    <span class="material-symbols-outlined" style="float: right;">{{ isPaymentDropdownVisible ? 'expand_less' : 'expand_more' }}</span>
                </div>

                <!-- Submenu Dropdown -->
                <div v-if="isPaymentDropdownVisible" class="w3-dropdown-content">
                    <router-link to="/siswamainsidebar/siswa/pembayaran/${siswaId}/pendaftaran_baru" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'pendaftaranBaru' }" @click="setActive('pendaftaranBaru')">
                        Pendaftaran Baru
                    </router-link>

                    <router-link to="/siswamainsidebar/siswa/daftarUlang" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'daftarUlang' }" @click="setActive('daftarUlang')">
                        Daftar Ulang
                    </router-link>
                </div>
            </div>

            <!-- Menu logout dipindah ke bagian bawah container -->
            <a href="#" class="w3-bar-item-logout w3-button-logout" :class="{ active: activeMenu === 'logout' }" @click.prevent="logout" style="text-decoration: none;">
                <span class="material-symbols-outlined" style="color: red;">
                    logout
                </span>Logout
            </a>
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
import Swal from 'sweetalert2';
import axios from "axios";

export default {
    data() {
        return {
            sidebarOpen: true,
            activeMenu: '',
            isProfileDropdownVisible: false,
            isPaymentDropdownVisible: false,
            userName: "",
            username: "",
            password: "",
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("/auth/login", {
                    username: this.username,
                    password: this.password
                });

                localStorage.setItem("auth_token", response.data.token);

                this.fetchUserData();
            } catch (error) {
                console.error("Login failed:", error);
            }
        },

        async fetchUserData() {
            try {
                const token = localStorage.getItem('auth_token');

                if (!token) {
                    console.log('Token tidak ditemukan');
                    return;
                }

                const response = await axios.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                this.userName = response.data.name;
            } catch (error) {
                console.error('Error fetching user data:', error.response || error);
            }
        },
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
            } else if (currentPath === 'pendaftaranBaru') {
                this.activeMenu = 'pendafataranBaru';
            } else if (currentPath === 'daftarUlang') {
                this.activeMenu = 'daftarUlang';
            } else if (currentPath === '/') {
                this.activeMenu = 'logout';
            }
        },
        toggleProfileDropdown() {
            this.isProfileDropdownVisible = !this.isProfileDropdownVisible;
        },
        togglePaymentDropdown(event) {
            event.stopPropagation(); 
            this.isPaymentDropdownVisible = !this.isPaymentDropdownVisible;
            this.setActive('payment');
        },
        handleOutsideClick(event) {
            const dropdown = this.$el.querySelector('.w3-dropdown-content');
            const button = this.$el.querySelector('.dropdown-btn');

            if (dropdown && button && !dropdown.contains(event.target) && !button.contains(event.target)) {
                this.isProfileDropdownVisible = false;
                this.isPaymentDropdownVisible = false;
            }
        },
        closeDropdown() {
            this.isProfileDropdownVisible = false;
            this.isPaymentDropdownVisible = false;
        },
        async logout() {
            Swal.fire({
                title: 'Yakin ingin logout?',
                text: "Anda akan keluar dari sistem!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Logout',
                cancelButtonText: 'Batal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const token = localStorage.getItem('token');
                        if (token) {
                            await axios.post('/auth/logout', {}, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                        }
                        localStorage.removeItem('token');

                        this.$router.push('/');
                    } catch (error) {
                        console.error('Error during logout:', error);
                    }
                }
            });
        },
        // handleOutsideClick(event) {
        //     const dropdown = document.getElementById("profileDropdown");
        //     if (!dropdown || !dropdown.contains(event.target)) {
        //         this.closeDropdown();
        //     }
        // },
        // handleOutsideClick(event) {
        //     const dropdown = this.$refs.profileDropdown;
        //     const button = this.$refs.profileBtn;

        //     if (
        //         dropdown &&
        //         button &&
        //         !dropdown.contains(event.target) &&
        //         !button.contains(event.target)
        //     ) {
        //         this.isProfileDropdownVisible = false;
        //     }
        //     }
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
.w3-dropdown-content {
    display: block;
}

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
    padding-top: 5.5rem;
    width: 240px;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

/* Container untuk menu */
.sidebar-menu-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

/* Style dropdown yang benar */
.w3-dropdown-content {
    position: relative;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: none;
    margin-left: 2.5rem;
    border-left: 2px solid #336C2A;
    animation: fadeIn 0.2s ease-out;
}

/* Animasi dropdown */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Pastikan menu logout tetap di bawah */
.w3-bar-item-logout {
    margin-top: auto;
    /* Ini akan mendorong logout ke bawah */
    padding: 15px;
    border-top: 1px solid #eee;
}

.sidebar.show {
    transform: translateX(0);
}

.dropdown-btn {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    outline: none;
}

.dropdown-btn:hover {
    color: #f1f1f1;
}

.active {
    background-color: green;
    color: white;
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
.w3-bar-item,
.w3-bar-item-logout {
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

.w3-bar-item-logout .material-symbols-outlined,
.w3-bar-item-logout i {
    font-size: 24px;
    color: #d60e0e;
}

/* Active menu item */
.w3-bar-item.active {
    color: #336C2A;
    font-weight: 800;
}

.w3-bar-item-logout:hover {
    font-weight: 800;
    color: #d60e0e;
}

.navbar-toggler-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
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
