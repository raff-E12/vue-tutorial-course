import { computed, createApp } from 'vue'
import App from './App.vue'
import { createPinia, storeToRefs } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import { router } from './routes'

const pania = createPinia();

createApp(App).use(router).use(pania).mount('#app');
