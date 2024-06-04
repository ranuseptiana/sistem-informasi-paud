<template>
  <div class="container">
    <Navbar />
    <router-view />
    <div class="content">
      <h2>Menyediakan Fondasi Terbaik untuk Masa Depan Anak Anda</h2>
      <img src="../assets/images/edu.png" alt="Education Image" style="margin-left: auto;">
    </div>
  </div>
</template>

<script>
import Navbar from '../layout/main-navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
  font-family: "Inter", sans-serif;
  text-align: center; /* Center align for small screens */
}

h2 {
  flex: 1;
  color: black;
  font-size: 35px; /* Default font size for smaller screens */
  text-align: center;
  font-weight: 800;
  margin-bottom: 20px;
}

img {
  width: 110%; /* Default width for smaller screens */
  height: auto;
  max-width: 600px; /* Ensure it doesn't exceed original size */
  margin-left: 0; /* Reset margin for responsiveness */
}

/* Media Queries for larger screens */
@media (min-width: 768px) {
  .content {
    flex-direction: row;
    text-align: left; /* Align text left for larger screens */
  }

  h2 {
    font-size: 48px; /* Larger font size for medium screens */
    text-align: left;
  }

  img {
    width: 50%; /* Adjust image width for medium screens */
    margin-left: auto;
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: 60px; /* Larger font size for large screens */
  }

  img {
    width: 600px; /* Fixed size for large screens */
  }
}
</style>
