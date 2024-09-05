<template>
    <div>
        <header>
        <nav class="navbar">
            <div class="nav-brand">
                <img src="/src/assets/paud.png" alt="Logo" class="logo">
                <span class="brand-text">PAUD Al Ummah</span>
            </div>
            <div class="profile-icon">
                    <i class="fas fa-user" aria-hidden="true"></i>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <div class="container pt-4">
            <router-view></router-view>
        </div>
    </main>
    </div>
</template>

<style scoped>
/* Navbar styling */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  padding: 10px 100px; 
  display: flex;
  align-items: center;
  background-color: white; /* Ensure it has a background */
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow for visibility */
}

/* Push main content down to avoid overlap with fixed navbar */
.main-content {
  margin-top: 80px; /* Adjust this value based on the navbar height */
}

/* Branding in the navbar */
.nav-brand {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 40px;
  height: 40px;
  background-color: #336C2A; /* Example background color */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-icon i {
    margin-top: 10px;
  font-size: 33px;
  color: #ffff; /* Icon color */
}
.logo {
  margin-right: 20px;
  width: auto;
  height: auto;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  color: #336C2A;
}
</style>
