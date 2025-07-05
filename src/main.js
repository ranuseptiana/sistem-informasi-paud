import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/styles/global-vars.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGears, faLightbulb, faChildReaching } from '@fortawesome/free-solid-svg-icons';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL + 'api/';

// Tambahkan ikon ke pustaka
library.add(faGears, faChildReaching, faLightbulb);

// Buat instance aplikasi
const app = createApp(App);

// Daftarkan komponen ikon Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon);

// Gunakan router dan mount aplikasi
app.use(router).mount('#app');

app.config.globalProperties.$swal = Swal;
