<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Pilih Login Sebagai</h2>
        <button @click="loginAs('admin')">Admin</button>
        <button @click="loginAs('guru')">Guru</button>
        <button @click="loginAs('ortu')">Orangtua</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['show'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
      loginAs(role) {
        this.$router.push(`/login/${role}`); //melakukan navigasi ke halaman login sesuai role
        this.closeModal();
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content button {
    background-color: #336C2A;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 20px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
  }
  
  .modal-content button:hover {
    background-color: #235517;
  }
  
  .modal-content {
    background: white;
    padding-top: 50px;
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 30px;
    border-radius: 30px;
    text-align: center;
    position: relative;
    width: 30%;
    font-family: "Inter", sans-serif;
  }
  
  .modal-content h2 {
    margin-bottom: 20px;
    color: black;
    font-family: "Inter", sans-serif;
    font-weight: 800;
    font-size: 20px;
  }

  /* Media Queries for Responsiveness */
@media (min-width: 600px) {
  .login-page {
    max-width: 600px;
  }
}

@media (min-width: 800px) {
  .login-page {
    max-width: 800px;
  }
}
  </style>
  