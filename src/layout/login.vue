<template>
  <div class="login-page">
    <h2>Login {{ role }}</h2>
    <h4>Login to continue to your dashboard</h4>
    <form @submit.prevent="handleLogin">
      <div>
        <input type="email" v-model="email" id="email" placeholder="Email" required />
      </div>
      <div>
        <input type="password" v-model="password" id="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    role() {
      return this.$route.params.role;
    }
  },
  methods: {
    handleLogin() {
      const users = {
        admin: { email: 'admin@email.com', password: 'admin123' },
        guru: { email: 'guru@email.com', password: 'guru123' },
        ortu: { email: 'ortu@email.com', password: 'ortu123' },
      };

      const user = users[this.role];

      if (user && this.email === user.email && this.password === user.password) {
        this.$router.push(`/${this.role}-dashboard`);
      } else {
        alert('Invalid credentials');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 800px; 
  width: 100%;
  margin: 100px auto;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 10px; 
  background: #292929;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
  font-family: "Inter", sans-serif;
}
.login-page h2 {
  text-align: center;
  color: rgb(255, 255, 255); 
  font-weight: 800;
}
.login-page h4 {
  text-align: center;
  color: #eeeded;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 16px;
}
.login-page form div {
  margin-bottom: 15px; 
}
.login-page input {
  width: 100% !important;
  padding: 15px 10px 15px 20px;
  box-sizing: border-box;
  background: white;
  color: rgb(68, 68, 68);
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px; 
}
.login-page input::placeholder {
  color:#adadad;
  font-size: 13px; 
  margin-left: 5px;
}
.login-page button {
  width: 50%; 
  padding: 7px; 
  background-color: #3d8a31;
  box-shadow: 0px 4px 10px rgba(36, 36, 36, 0.5); 
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 20px; 
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 20px;
}
.login-page button:hover {
  background-color: #e6e6e6;
}
</style>
