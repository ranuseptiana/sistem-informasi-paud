<template>
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <!-- Brand -->
            <a class="navbar-brand" href="#">
                <img src="../assets/paud.png" alt="Logo" class="main-logo">
                <span class="main-brand-text">PAUD Al Ummah</span>
            </a>
            <!-- Button Offcanvas -->
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Navbar Offcanvas -->
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <router-link to="/" class="w3-bar-item w3-button dashboard-item" :class="{ active: $route.path === '/' }">Beranda</router-link>
                        <router-link to="/about" class="w3-bar-item w3-button" :class="{ active: $route.path === '/about' }">Tentang Kami</router-link>
                        <router-link to="/album" class="w3-bar-item w3-button" :class="{ active: $route.path === '/album' }">Galeri Kegiatan</router-link>
                        <router-link to="/agenda" class="w3-bar-item w3-button" :class="{ active: $route.path === '/agenda' }">Agenda</router-link>
                        <router-link to="/information" class="w3-bar-item w3-button" :class="{ active: $route.path === '/information' }">Informasi</router-link>
                        <!-- Dropdown Kontak -->
                        <li class="nav-item dropdown">
                            <router-link to="#" class="nav-link dropdown-toggle w3-bar-item w3-button" @click.prevent.stop="toggleDropdown">
                                Kontak
                            </router-link>
                            <ul class="dropdown-menu" v-if="isDropdownOpen">
                                <li class="dropdown-item">
                                    <p>PAUD AL UMMAH</p>
                                </li>
                                <li class="dropdown-item">📍 Jl. Dieng Atas No.16, Sumberjo, Kalisongo, Kec. Dau, Kabupaten Malang, Jawa Timur 65151</li>
                                <li class="dropdown-item">📞 +62 813-3530-5234</li>
                            </ul>
                        </li>
                    </ul>
                    <!-- Login -->
                    <div class="navbar-nav ms-auto">
                        <button type="button" class="login-button" @click="openModal">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>

<div class="container">
    <!-- modal login -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h5>Login sebagai</h5>
            <p style="margin-bottom: 0.5rem; font-size: 1.12rem;">Pilih salah satu untuk melanjutkan</p>
            <div class="user-buttons">
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Admin'}" @click="selectedUser = 'Admin'">
                    Admin
                </button>
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Guru' }" @click="selectedUser = 'Guru'">
                    Guru
                </button>
                <button type="button" class="button-user" :class="{ 'active-user': selectedUser === 'Siswa' }" @click="selectedUser = 'Siswa'">
                    Orangtua
                </button>
            </div>

            <input type="text" class="input-login" placeholder="Username" v-model="username" />
            <div class="password-wrapper">
                <input :type="passwordFieldType" class="input-login" placeholder="Password" v-model="password" />
                <span class="password-toggle-icon" @click="togglePasswordVisibility">
                    <i :class="passwordFieldIcon"></i>
                </span>
            </div>

            <button type="button" class="login-button-2" @click="navigateToDashboard">Login</button>
        </div>
    </div>
</div>
</template>

    
<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import * as bootstrap from 'bootstrap';

export default {
    data() {
        return {
            name: 'Navbar',
            activeMenu: '',
            showModal: false,
            isDropdownOpen: false,
            selectedUser: 'Admin',
            username: '',
            password: '',
            passwordFieldType: 'password',
            passwordFieldIcon: 'fas fa-eye',
            isLoggingIn: false,
        };
    },
    methods: {
        async navigateToDashboard() {
            if (this.isLoggingIn) return;
            
            if (!this.username || !this.password) {
                this.showModal = false; 
                await Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Harap masukkan username dan password!',
                });
                return;
            }

            this.isLoggingIn = true;
            
            try {
                const userTypeMap = {
                    'Admin': 'admin',
                    'Guru': 'guru',
                    'Siswa': 'siswa'
                };
                const expectedUserType = userTypeMap[this.selectedUser];

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                    username: this.username,
                    password: this.password,
                    expected_user_type: expectedUserType 
                });

                if (!response.data.user_type) {
                    this.showModal = false; 
                    throw new Error('User type not found in response');
                }

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expires_at', response.data.expires_at);
                localStorage.setItem('user_id', response.data.user.id);
                localStorage.setItem('user_type', response.data.user_type);

                const routeMap = {
                    'admin': '/adminmainsidebar/dashboard',
                    'guru': '/gurumainsidebar/dashboard',
                    'siswa': '/siswamainsidebar/dashboard'
                };

                const route = routeMap[response.data.user_type.toLowerCase()] || '/';
                this.$router.push(route);

            } catch (error) {
                this.showModal = false; 
                let errorMessage = 'Terjadi kesalahan saat login!';
                
                if (error.response) {
                    errorMessage = error.response.data?.message || 
                                 error.response.data?.error ||
                                 errorMessage;
                } else {
                    errorMessage = error.message || errorMessage;
                }
                
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal!',
                    text: errorMessage,
                });
            } finally {
                this.isLoggingIn = false;
                this.showModal = false; // Close modal after login attempt
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        log(event) {},
        setActive(menu) {
            this.activeMenu = menu;
        },
        updateActiveMenu(route) {
            const currentPath = route.path;
            if (currentPath.includes('beranda')) {
                this.activeMenu = 'beranda';
            } else if (currentPath.includes('about')) {
                this.activeMenu = 'about';
            } else if (currentPath.includes('album')) {
                this.activeMenu = 'album';
            } else if (currentPath.includes('agenda')) {
                this.activeMenu = 'agenda';
            } else if (currentPath.includes('information')) {
                this.activeMenu = 'information';
            } else if (currentPath.includes('kontak')) {
                this.activeMenu = 'kontak';
            }
        },
        openModal() {
            // Cek apakah offcanvas masih terbuka
            const offcanvasEl = document.querySelector('.offcanvas.show');
            if (offcanvasEl) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (bsOffcanvas) bsOffcanvas.hide();
            }

            // Tunggu animasi offcanvas selesai baru buka modal
            setTimeout(() => {
                this.selectedUser = 'Admin';
                this.showModal = true;
                document.body.style.overflow = 'hidden';
                this.$nextTick(() => {
                    const input = document.querySelector('.input-login');
                    if (input) input.focus();
                });
            }, 100);
        },
        closeModal() {
            this.isClosing = true;
            setTimeout(() => {
                this.showModal = false;
                this.isClosing = false;
                this.resetForm(); // reset isian form
                document.body.style.overflow = ''; // balikin scroll body
            }, 300);
        },
        togglePasswordVisibility() {
            if (this.passwordFieldType === 'password') {
                this.passwordFieldType = 'text';
                this.passwordFieldIcon = 'fas fa-eye-slash';
            } else {
                this.passwordFieldType = 'password';
                this.passwordFieldIcon = 'fas fa-eye';
            }
        },
        resetForm() {
            this.username = '';
            this.password = '';
        }
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
body {
    overflow-x: hidden;
    padding-right: 0 !important;
}

.offcanvas {
    width: 280px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
}

.user-buttons {
    display: flex;
    gap: 8px;
    margin-right: auto;
    margin-bottom: 1rem;
}

.modal-content {
    background-color: white;
    padding: 60px;
    border-radius: 6px;
    width: 585px;
    height: 480px;
    position: relative;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #336C2A;
}

/* Navbar styling */
.navbar {
    background-color: white !important;
    z-index: 1000;
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    box-shadow: none;
    align-items: center;
}

.navbar-brand {
    margin-left: 3.8rem;
}

.nav-item {
    list-style: none;
}

.offcanvas.offcanvas-end {
    margin-left: 3.5rem;
}

.container-fluid {
    display: flex;
    align-items: center;
    transition: margin-left 0.3s ease-in-out;
    justify-content: space-between;
}

.navbar-nav {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-right: 3.5rem;
    gap: 15px;
}

.nav-menu {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 4rem;
    gap: 15px;
}

.main-logo {
    width: auto;
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
    color: #336C2A !important;
}

/* Styling for menu items */
.w3-bar-item {
    display: flex;
    padding: 10px;
    color: #6c757d !important;
    font-size: 18px !important;
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 15px;
    transition: color 0.3s ease;
    font-size: 24px;
    color: #336C2A;
    vertical-align: middle;
}

/* Active menu item */
.w3-bar-item.active,
.w3-bar-item:hover {
    color: #336C2A !important;
    font-weight: 800;
    background: none !important;
}

.dropdown-menu {
    right: auto;
    left: 100%;
    transform: translateX(-63%);
    /* Geser ke kiri */
    width: 30rem;
    display: block;
    position: absolute;
    background: #336C2A;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 10px;
}

.dropdown-item {
    padding: 5px 10px;
    color: white;
    font-weight: 600 !important;
    white-space: normal;
}

.dropdown-item p {
    font-size: 20px;
    font-weight: 800;
}

.dropdown-item:hover {
    background: none !important;
    background-color: transparent !important;
    color: white
}

.nav-link.dropdown-toggle::after {
    margin-top: 0.8rem;
    font-size: 20px;
    margin-left: 0px;
    vertical-align: middle;
}

.button-user {
    background-color: white;
    width: 5rem;
    height: 2rem;
    font-weight: 400;
    font-size: 0.9rem;
    border-radius: 100px;
    border: 1px solid black;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.button-user.active-user {
    background-color: #C3EAA3;
    color: #336C2A;
    transform: translateY(-3px);
    border: #C3EAA3;
}

.button-user:hover {
    background-color: #C3EAA3;
    color: #336C2A;
    transform: translateY(-3px);
    border: #C3EAA3;
}

/* login */
.input-login {
    border: 1px solid #C3EAA3;
    background-color: white;
    height: 4rem;
    width: 100%;
    color: #000000;
    padding: 0.7rem 3rem 0.7rem 2rem;
    border-radius: 10px;
    margin-top: 0.5rem;
    -webkit-user-select: text;
    user-select: text;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
}

.input-login[type="password"],
.input-login[type="text"] {
    padding-right: 40px !important;
    width: 100%;
}

.password-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
}

.password-toggle-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px; 
    cursor: pointer;
    color: #6c757d;
    background: none;
    border: none;
    padding: 0;
}

.password-toggle-icon i {
  font-size: 1.2rem; 
  margin-top: 10px;
}

.password-toggle-icon:hover {
    color: #336C2A;
}

.login-button-2 {
    color: #336C2A;
    font-weight: 600;
    background: #C3EAA3;
    border-radius: 10px;
    width: 18rem;
    border: #C3EAA3;
    height: 4rem;
    display: block;
    margin: 0 auto;
}

.login-button-2:hover {
    border: #C3EAA3;
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.login-button {
    margin-top: -0.5rem;
    padding: 10px 20px;
    width: 90px;
    height: 30px;
    font-size: 16px;
    font-weight: 800;
    font-family: "Nunito Sans", sans-serif;
    color: #336C2A;
    background-color: #C3EAA3;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    line-height: 10px;
}

/* login */

@media (min-width: 361px) and (max-width: 480px) {
    .navbar-brand {
        margin-left: 2rem;
    }
}

/* Perbaikan Offcanvas untuk Mobile */
@media (max-width: 767px) {
    .offcanvas {
        width: 75% !important;
        margin-left: 0 !important;
    }

    .offcanvas-body {
        padding: 1rem;
    }

    .w3-bar-item {
        padding: 12px 8px;
        font-size: 16px !important;
        margin-bottom: 10px;
    }

    .dropdown-menu {
        width: 100% !important;
        position: relative !important;
        transform: none !important;
        left: 0 !important;
        margin-top: 10px;
        box-shadow: none;
    }

    .navbar-brand {
        margin-left: 1rem !important;
    }

    .navbar-nav {
        margin-right: 0 !important;
        gap: 8px !important;
    }

    .login-button {
        width: 80px;
        height: 32px;
        font-size: 14px;
        line-height: 12px;
    }

    .modal-content {
        width: 95%;
        height: auto;
        padding: 1.5rem;
        transform: none !important;
    }

    .password-toggle-icon {
        right: 15px;
        width: 25px;
    }
    
    .input-login {
        padding: 0.7rem 2.5rem 0.7rem 1.5rem;
        height: 3.5rem;
    }

    /* Login button */
    .login-button-2 {
        width: 100%;
        height: 50px;
        margin-top: 15px;
    }

    /* Pastikan tidak ada yang menutupi */
    body.modal-open {
        position: fixed;
        width: 100%;
    }

    .password-wrapper {
        position: relative;
        width: 100%;
    }

    /* Pastikan input bisa diklik */
    input[type="text"],
    input[type="password"] {
        -webkit-user-select: auto !important;
        user-select: auto !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        touch-action: manipulation;
    }

    /* Perbaikan z-index untuk memastikan input di atas elemen lain */
    .modal-overlay {
        z-index: 99999 !important;
    }

    .modal-content {
        z-index: 1050 !important;
    }

    /* Perbaikan untuk keyboard mobile */
    @media (max-height: 600px) {
        .modal-content {
            max-height: 80vh;
            overflow-y: auto;
        }
    }
}
</style>
