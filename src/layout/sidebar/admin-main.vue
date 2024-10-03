<template>
  <header>
    <nav class="main-navbar">
      <div class="main-nav-brand">
        <img src="/src/assets/paud.png" alt="Logo" class="main-logo">
        <span class="main-brand-text">PAUD Al Ummah</span>
      </div>
      <div class="main-profile-icon">
        <i class="fas fa-user" aria-hidden="true"></i>
      </div>
    </nav>
  </header>

  <div class="layout">
    <!-- Sidebar -->
    <div :class="['w3-sidebar', { minimized: !sidebarOpen }]" id="mySidebar">
      <button v-if="sidebarOpen" class="w3-bar-item w3-button w3-hide-large" @click="toggleSidebar">Close &times;</button>
      
      <router-link to="/adminmainsidebar/dashboard" class="w3-bar-item w3-button dashboard-item" :class="{ active: activeMenu === 'dashboard' }" @click="setActive('dashboard')">
        <span class="material-symbols-outlined">dashboard</span> Dashboard
      </router-link>
      
      <router-link to="/adminmainsidebar/student" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'student' }" @click="setActive('student')">
        <span class="material-symbols-outlined">local_library</span> Student
      </router-link>
      
      <router-link to="/teacher" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'teacher' }" @click="setActive('teacher')">
        <span class="material-symbols-outlined">diversity_3</span> Teacher
      </router-link>
      
      <router-link to="/class" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'class' }" @click="setActive('class')">
        <span class="material-symbols-outlined">diversity_2</span> Class
      </router-link>
      
      <router-link to="/tuition" class="w3-bar-item w3-button" :class="{ active: activeMenu === 'tuition' }" @click="setActive('tuition')">
        <span class="material-symbols-outlined">payments</span> Tuition Fee
      </router-link>

      <router-link to="/" class="w3-bar-item w3-button logout-button" :class="{ active: activeMenu === 'logout' }" @click="setActive('logout')">
        <span class="material-symbols-outlined">logout</span> Logout
      </router-link>
    </div>
    <button v-if="!sidebarOpen" class="w3-button w3-teal w3-xlarge open-btn" @click="toggleSidebar">&#9776;</button>
  </div>

  <main>
    <div class="container pt-4">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true, // Sidebar is open initially
      activeMenu: 'dashboard', // Default active menu
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    setActive(menu) {
      this.activeMenu = menu; // Set the active menu item
    },
  },
};
</script>

<style lang="scss" scoped>
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
  margin-left: 2rem;
  justify-content: flex-start; /* Aligns items to the left */
  gap: 10px; /* Adds space between icon and text */
  margin-bottom: 15px; /* Gap between each menu */
  transition: color 0.3s ease; /* Smooth color transition */
}

.dashboard-item {
  margin-top: 1rem;
}

/* Set consistent size for icons and text */
.w3-bar-item .material-symbols-outlined,
.w3-bar-item i {
  font-size: 24px; /* Consistent icon size */
  color: inherit; /* Inherit color for hover and active states */
}

/* Active menu item */
.w3-bar-item.active {
  color: #336C2A;
  font-weight: 800;
}

/* Hover effect for both icon and text */
.w3-bar-item:hover {
  color: #336C2A; /* Change text color on hover */
  font-weight: 800; /* Make text bold */
}

.w3-bar-item:hover .material-symbols-outlined,
.w3-bar-item:hover i {
  color: #336C2A; /* Change icon color on hover */
}

/* Navbar styling */
.main-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white; /* Ensure it has a background */
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow for visibility */
}

.logout-button {
  color: red;
  margin-top: 14rem;
}

/* Branding in the navbar */
.main-nav-brand {
  display: flex;
  align-items: center;
  color: #336C2A;
  font-weight: 800;
}

.main-profile-icon {
  width: 40px;
  height: 40px;
  background-color: #336C2A; /* Example background color */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-profile-icon i {
  font-size: 2rem;
  margin-top: 0.8rem;
  color: #fff; /* Icon color */
}

.main-logo {
  margin-right: 20px;
  width: auto;
  height: auto;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  color: #336C2A;
}

/* Three-line button styling when sidebar is minimized */
.open-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
}
</style>
