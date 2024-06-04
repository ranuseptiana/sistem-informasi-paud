import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';
import 'mdb-vue-ui-kit/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

createApp(App).use(router).mount('#app');