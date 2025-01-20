import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api/';

createApp(App).use(router).mount('#app');