<template>
  <div>
    <!-- Navbar -->
    <nav class="nav-bar">
      <div class="nav-brand">
        <img src="../assets/paud.png" alt="Logo" class="logo">
        <span class="brand-text">PAUD Al Ummah</span>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container">
      <div class="content">
        <h2>Provide the best Foundation for the future of Your child</h2>
        <p>Unlock your child's potential with our nurturing environment, fostering creativity, critical thinking, and a lifelong love of learning.</p>
        <div class="button-group">
          <button type="button" class="login-button" @click="showModal = true">Login</button>
          <p class="contact-us">Hubungi kami</p>
        </div>
      </div>
      <img src="../assets/images/temp.png" alt="Education Image">
      </div>
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h5>Login sebagai</h5>
          <p style="margin-bottom: 0.5rem; font-size: 1.12rem;">Pilih salah satu untuk melanjutkan</p>
          <div class="user-buttons">
            <button 
              type="button" 
              class="button-user"
              :class="{ 'active-user': selectedUser === 'Admin'}"
              @click="selectedUser = 'Admin'">
              Admin
            </button>
            <button 
              type="button" 
              class="button-user"
              :class="{ 'active-user': selectedUser === 'Guru' }" 
              @click="selectedUser = 'Guru'">
              Guru
            </button>
            <button 
              type="button" 
              class="button-user"
              :class="{ 'active-user': selectedUser === 'Orangtua' }" 
              @click="selectedUser = 'Orangtua'">Orangtua</button>
          </div>
          <input 
            type="text" 
            class="input-login"
            placeholder="Email" />
          <input 
            type="passwordFieldType" 
            style="margin-bottom: 2.5rem;"
            class="input-login"
            placeholder="Password" />
          <i 
            class="passwordFieldIcon" 
            @click="togglePasswordVisibility">
          </i>
          <router-link to="/adminmainsidebar/dashboard"><button type="button" class="login-button-2">Login</button></router-link>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      isClosing: false,
      selectedUser: 'Admin',
      passwordFieldType: 'password',
      passwordFieldIcon: 'fas fa-eye',
    };
  },
  methods: {
    openModal() {
      this.selectedUser = 'Admin';
      this.showModal = true;
    },
    closeModal() {
      this.isClosing = true;
      setTimeout(() => {
        this.showModal = false;
        this.isClosing = false;
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
  },
};
</script>

<style scoped>
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
  z-index: 1000;
  backdrop-filter: blur(2px); /* Blur effect */
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

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  margin-top: 10px;
  padding: 0px 100px; 
  display: flex;
  align-items: left;
  box-shadow: none; 
  z-index: 1000; 
}

.nav-brand {
  display: flex;
  align-items: center;
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

.container { 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px;
  text-align: left;
}

h2 {
  color: black;
  font-size: 64px; 
  font-weight: 600;
}

p {
  margin-right: 100px;
}

img {
  width: auto; 
  height: auto;
  max-width: 100%;
  margin-left: 0;
}

h5 {
  font-weight: 700;
  font-size: 1.8rem;
}

h5, p {
  text-align: left;
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
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  text-align: center; /* Ensure text is centered in case it's wrapped */
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

.input-login {
  border: 1px solid #C3EAA3;
  background-color: white;
  height: 4rem;
  width: 29rem;
  color: #000000;
  padding: 0.7rem;
  border-radius: 10px;
  margin-top: 0.5rem;
  padding-left: 2rem; /* Add more left padding to move text right */
}

.login-button-2 {
  color: #336C2A;
  font-weight: 600;
  background: #C3EAA3;
  border-radius: 10px;
  width: 18rem;
  border: #C3EAA3;
  height: 4rem;
  display: block; /* Ensure it's treated as a block element */
  margin: 0 auto; /* Center the button horizontally */
}

.login-button-2:hover{
  border: #C3EAA3;
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    align-items: flex-start;
    text-align: left;
    max-width: 50%;
  }

  img {
    max-width: 50%;
    margin-left: auto;
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: 48px;
  }

  img {
    width: 600px;
  }
}

.login-button {
  padding: 10px 20px;
  width: 120px;
  height: 40px;
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

.button-group {
  display: flex;
  align-items: center;
}

.contact-us {
  margin-left: 25px;
  font-size: 16px;
  font-weight: 800;
  color: #000000;
  cursor: pointer;
  font-family: "Nunito Sans", sans-serif;
  padding-top: 20px;
}
</style>
