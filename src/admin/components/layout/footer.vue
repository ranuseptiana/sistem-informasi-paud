<template>
  <MDBFooter :text="['center', 'lg-start']">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2020 Copyright:
      <a class="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
  </MDBFooter>
</template>

<script setup lang="ts">
import {
  MDBFooter
} from 'mdb-vue-ui-kit';
</script>

<style>
  /* Footer styling */
.footer {
  position: absolute; /* Tetapkan posisi absolut untuk footer */
  left: 0;
  bottom: 0; /* Letakkan footer di bawah */
  width: 100%; /* Footer akan menutupi seluruh lebar kontainer utama */
  background-color: #f8f9fa; /* Warna latar belakang */
  padding: 20px; /* Padding untuk ruang antara konten dan footer */
  text-align: center; /* Pusatkan teks di dalam footer */
}
</style>