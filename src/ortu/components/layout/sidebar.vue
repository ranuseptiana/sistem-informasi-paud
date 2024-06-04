<template>
  <!--Main Navigation-->
  <header>
    <!-- Navbar -->
    <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand" href="#">
          <img src="../../assets/paud.png" alt="PAUD Al Ummah Logo">
          <div class="name_brand">PAUD Al Ummah</div>
        </a>
        <!-- Toggle button -->
        <button @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->

   <!-- Sidebar -->
   <nav
      id="sidebarMenu"
      :class="{ show: sidebarOpen }"
      class="collapse d-lg-block sidebar collapse bg-white"
    >
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4" style="text-align: left;">
          <router-link
            to="/admin-dashboard"
            class="list-group-item list-group-item-action py-1 ripple"
            :class="{ '': $route.path === '/admin-dashboard' }"
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span style="color: #336C2A;">Dashboard</span>
          </router-link>
          
          <router-link
            to="/siswa"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-chart-line fa-fw me-3"></i><span style="color: #336C2A;">Siswa</span>
          </router-link>

          <router-link
            to="/orangtua"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-chart-bar fa-fw me-3"></i><span style="color: #336C2A;">Orangtua</span>
          </router-link>

          <router-link
            to="/guru"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-chalkboard-teacher fa-fw me-3"></i><span style="color: #336C2A;">Guru</span>
          </router-link>

          <router-link
            to="/kelas"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-school fa-fw me-3"></i><span style="color: #336C2A;">Kelas</span>
          </router-link>

          <router-link
            to="/berita"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-newspaper fa-fw me-3"></i><span style="color: #336C2A;">Berita</span>
          </router-link>

          <router-link
            to="/pengumuman"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-bullhorn fa-fw me-3"></i><span style="color: #336C2A;">Pengumuman</span>
          </router-link>

          <router-link
            to="/agenda"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-calendar-alt fa-fw me-3"></i><span style="color: #336C2A;">Agenda</span>
          </router-link>

          <router-link
            to="/galeri"
            class="list-group-item list-group-item-action ripple mb-8"
            aria-current="true"
          >
            <i class="fas fa-images fa-fw me-3"></i><span style="color: #336C2A;">Galeri</span>
          </router-link>

          <router-link
            to="/"
            class="list-group-item list-group-item-action ripple"
            aria-current="true"
          >
            <i class="fas fa-sign-out fa-fw me-3"></i><span style="color: #336C2A;">Logout</span>
          </router-link>
        </div>
      </div>
      
    </nav>
    <!-- Sidebar -->
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main :style="{ marginTop: sidebarOpen ? '58px' : '0' }">
    <div class="container pt-4">
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
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>

<!-- style -->
<style>
.name_brand {
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #336C2A;
  padding-left: 5px;
}

body {
  background-color: #fbfbfb;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 70px 0 0; /* Increased top padding */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 220px;
  z-index: 600;
  transition: left 0.3s ease; /* Animasi saat toggler diklik */
  left: -300px; /* Sidebar secara default tersembunyi */
  overflow-y: auto;
}

.sidebar.show {
  left: 0; /* Tampilkan sidebar saat kelas 'show' ditambahkan */
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}

.list-group-item {
  margin-bottom: 20px; /* Ubah nilai margin-bottom sesuai preferensi Anda */
}

.list-group-item-action i {
  color: #336C2A; 
}

.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;/* Scrollable contents if viewport is shorter than content. */
}

.list-group-item {
  margin-bottom: 20px; /* Ubah nilai margin-bottom sesuai preferensi Anda */
}

.navbar {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  height: 70px;
}

.logout-section {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.logout {
  display: block;
  padding: 10px 0;
  text-decoration: none;
}

@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 0; /* Mengatur lebar scrollbar menjadi 0 */
  height: 0; /* Mengatur tinggi scrollbar menjadi 0 */
}
</style>