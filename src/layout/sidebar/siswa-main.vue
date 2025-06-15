<template>
    <header>
      <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="/src/assets/paud.png" alt="Logo" class="main-logo">
            <span class="main-brand-text">PAUD Al Ummah</span>
          </a>
          <button class="navbar-toggler" type="button" @click="toggleSidebar" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="material-symbols-outlined">
              menu
            </span>
          </button>
          <div class="collapse navbar-collapse">
            <div class="navbar-nav ms-auto">
              <a ref="profileDropdownBtn" class="nav-link profile-link" href="#" id="profileDropdown" role="button" @click.prevent="toggleProfileDropdown">
                <i class="fas fa-user-circle"></i>
              </a>
              <div v-if="isProfileDropdownVisible" ref="profileDropdownContent" class="profile-dropdown">
                <ul>
                  <span class="dropdown-item-text">
                    <i class="fa-regular fa-user"></i>{{ userName || 'Siswa' }}
                  </span>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </nav>
      <nav id="sidebarMenu" :class="{ show: sidebarOpen }" class="sidebar collapse d-lg-block">
        <div class="sidebar-menu-container">
          <div>
            <router-link to="/siswamainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
              <span class="material-symbols-outlined">dashboard</span> Beranda
            </router-link>
  
            <router-link :to="kelasLink" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
              <span class="material-symbols-outlined">diversity_2</span> Kelas
            </router-link>
  
            <div class="w3-bar-item w3-button dropdown-btn" @click.stop="togglePaymentDropdown" :class="{ active: activeMenu === 'payment' || activeMenu === 'pendaftaranBaru' || activeMenu === 'daftarUlang'}" ref="paymentDropdownBtn">
              <span class="material-symbols-outlined">payments</span> Pembayaran
              <span class="material-symbols-outlined" style="float: right;">{{ isPaymentDropdownVisible ? 'expand_less' : 'expand_more' }}</span>
            </div>
  
            <div v-if="isPaymentDropdownVisible" class="w3-dropdown-content" ref="paymentDropdownContent">
              <router-link to="/siswamainsidebar/siswa/pembayaran/pendaftaran_baru" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'pendaftaranBaru' }" @click="setActive('pendaftaranBaru')">
                Pendaftaran Baru
              </router-link>
  
              <router-link to="/siswamainsidebar/siswa/daftarUlang" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'daftarUlang' }" @click="setActive('daftarUlang')">
                Daftar Ulang
              </router-link>
            </div>
          </div>
  
          <a href="#" class="w3-bar-item-logout w3-button-logout" :class="{ active: activeMenu === 'logout' }" @click.prevent="logout" style="text-decoration: none;">
            <span class="material-symbols-outlined" style="color: red;">
              logout
            </span>Logout
          </a>
        </div>
      </nav>
      </header>
  
    <main :style="{ marginLeft: sidebarOpen ? '17rem' : '0' }">
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
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
        siswaId: null, // Tambahkan properti ini untuk menyimpan siswa_id
      };
    },
    computed: {
      kelasLink() {
        // Pastikan siswaId sudah terisi sebelum membuat link
        return this.siswaId ? `/siswamainsidebar/siswa/${this.siswaId}/kelas` : '#';
      }
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
  
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          this.fetchUserData();
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
  
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token');
  
          if (!token) {
            return;
          }
  
          const response = await axios.get('/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          this.userName = response.data.name;
          // Ambil siswa_id dari response dan simpan
          this.siswaId = response.data.data.siswa_id; 
  
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
        if (currentPath.includes('/siswamainsidebar/siswa/pembayaran/pendaftaran_baru')) {
          this.activeMenu = 'pendaftaranBaru';
          this.isPaymentDropdownVisible = true;
        } else if (currentPath.includes('/siswamainsidebar/siswa/daftarUlang')) {
          this.activeMenu = 'daftarUlang';
          this.isPaymentDropdownVisible = true;
        } else if (currentPath.includes('dashboard')) {
          this.activeMenu = 'dashboard';
          this.isPaymentDropdownVisible = false;
        } else if (currentPath.includes('kelas')) {
          this.activeMenu = 'class';
          this.isPaymentDropdownVisible = false;
        } else if (currentPath === '/') {
          this.activeMenu = 'logout';
        } else {
          this.activeMenu = '';
          this.isPaymentDropdownVisible = false;
        } 
      },
      toggleProfileDropdown() {
        this.isProfileDropdownVisible = !this.isProfileDropdownVisible;
        this.isPaymentDropdownVisible = false;
      },
      togglePaymentDropdown() {
        this.isPaymentDropdownVisible = !this.isPaymentDropdownVisible;
        this.isProfileDropdownVisible = false;
        if (this.isPaymentDropdownVisible) {
          this.setActive('payment');
        } else {
          if (!this.$route.path.includes('/siswamainsidebar/siswa/pembayaran/pendaftaran_baru') &&
              !this.$route.path.includes('/siswamainsidebar/siswa/daftarUlang')) {
            this.activeMenu = '';
          }
        }
      },
      handleOutsideClick(event) {
        // Logika untuk menutup dropdown profil
        // Gunakan ref untuk tombol dan konten dropdown profil
        if (this.$refs.profileDropdownBtn && this.$refs.profileDropdownContent &&
            !this.$refs.profileDropdownBtn.contains(event.target) &&
            !this.$refs.profileDropdownContent.contains(event.target)) {
          this.isProfileDropdownVisible = false;
        }
  
        // Logika untuk menutup dropdown pembayaran
        // Gunakan ref untuk tombol dan konten dropdown pembayaran
        const paymentDropdownBtn = this.$refs.paymentDropdownBtn;
        const paymentDropdownContent = this.$refs.paymentDropdownContent;
  
        if (paymentDropdownBtn && paymentDropdownContent &&
            !paymentDropdownBtn.contains(event.target) &&
            !paymentDropdownContent.contains(event.target)) {
  
          // Hanya tutup jika tidak ada submenu pembayaran yang aktif
          if (!this.$route.path.includes('/siswamainsidebar/siswa/pembayaran/pendaftaran_baru') &&
              !this.$route.path.includes('/siswamainsidebar/siswa/daftarUlang')) {
            this.isPaymentDropdownVisible = false;
          }
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
              localStorage.removeItem('user_id'); // Pastikan user_id juga dihapus
              localStorage.removeItem('userData'); // Hapus juga userData dari localStorage
  
              this.$router.push('/');
            } catch (error) {
              console.error('Error during logout:', error);
              // Tambahkan SweetAlert untuk error logout jika perlu
              Swal.fire({
                icon: 'error',
                title: 'Logout Gagal',
                text: 'Terjadi kesalahan saat mencoba logout. Silakan coba lagi.'
              });
            }
          }
        });
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
    display: block;
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
  
  .dropdown-btn.active {
    background-color: green;
    /* Atau warna lain yang Anda gunakan untuk active state */
    color: white;
  }
  
  .w3-dropdown-content .w3-bar-item.active {
    font-weight: bold;
    /* Contoh: membuat font lebih tebal */
    color: #336C2A;
    /* Contoh: warna teks yang berbeda */
    background-color: #e0ffe0;
    /* Contoh: latar belakang berbeda */
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
    right: 70px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    z-index: 1050;
    width: auto;
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
    margin-right: 1.5rem;
  }
  
  .dropdown-item-text i {
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