import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { paths } from './src/config'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    port: 3000,
    proxy:{
      '/api':{
        target: "https://shrimppond.runasp.net",
        changeOrigin:true,
        rewrite:(paths) => paths.replace(/^\/api/,''),
      }
    }
  },
  plugins: [react()],
})
