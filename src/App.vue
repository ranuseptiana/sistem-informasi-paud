<template>
    <router-view></router-view>
</template>
  
<script>
  export default {
    name: 'App',
  };
</script>

<style>
/* Untuk browser berbasis WebKit (Chrome, Safari, Edge) */
input[type="password"]::-webkit-credentials-auto-fill-button,
input[type="password"]::-webkit-caps-lock-indicator,
input[type="password"]::-webkit-reveal-password {
    display: none !important;
    visibility: hidden;
    pointer-events: none;
}

/* Untuk Firefox */
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
    display: none;
}
</style>