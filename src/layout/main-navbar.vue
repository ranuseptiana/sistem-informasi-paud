<template>
  <div>
    <nav>
      <ul>
        <li class="brand"><router-link to="#">PAUD AL-UMMAH</router-link></li>
        <div class="nav-links" :class="{ open: isOpen }">
          <li><router-link to="/about">Layanan</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li v-if="!userRole"><button @click="showModal = true">Login</button></li>
          <li v-else>{{ userRole }}</li>
        </div>
        <div class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </ul>
    </nav>
    <LoginModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import { ref } from 'vue';
import LoginModal from './login-modal.vue';

export default {
  components: {
    LoginModal
  },
  setup() {
    const showModal = ref(false);
    const isOpen = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      showModal,
      isOpen,
      toggleMenu
    };
  },
}
</script>

<style scoped>
nav {
  background-color: #ffffff; 
  position: fixed; 
  width: 100%; 
  top: 0; 
  left: 0; 
  z-index: 1000; 
  margin-top: 10px;
  font-family: "Inter", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style-type: none; 
  margin: 0 0 5px 0;
  padding: 0 20px; 
  display: flex; 
  align-items: center;
  justify-content: space-between;
}

nav ul li {
  margin: 0 15px; 
}

nav ul li a {
  text-decoration: none; 
  color: #336C2A;
  font-weight: 800; 
  padding: 5px 20px; 
}

nav ul li button {
  background-color: #336C2A;
  color: #ffffff;
  border-radius: 30px; 
  padding: 7px 30px; 
  font-weight: 800;
  border: none; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

nav ul li button:hover {
  background-color: #235517; 
}

.brand {
  flex: 1;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  margin-right: 20px; /* Add margin-right to menu-toggle */
}

.menu-toggle span {
  height: 3px;
  background: #336C2A;
  margin: 3px;
  width: 25px;
  border-radius: 1px;
  transition: 0.3s;
}

.nav-links {
  display: flex;
  align-items: center;
  flex: 1; /* Fill remaining space */
  justify-content: flex-end; /* Align content to the right */
}

.nav-links ul {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    right: 0; /* Align the menu to the right */
    background: #ffffff;
    flex-direction: column;
    align-items: flex-end;
    display: none;
    padding: 20px; /* Add padding to the nav-links */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: add a shadow for better visibility */
    width: 100%; /* Set width to 100% */
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    width: 100%;
    text-align: left;
    margin: 10px 0;
  }

  nav ul li {
    margin: 0;
  }

  .brand {
    flex: none;
  }
}
</style>
