import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    // Uso della proxy per l'impedimento del blocco del CORS con lo stesso dominio
    // Quindi gira la chiamata corrispondente al '/api' dalla rotta corrente
    proxy: {  
       '/tasks': {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
       }
    }
  }
})
