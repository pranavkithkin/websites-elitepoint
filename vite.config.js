import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Rolldown/Vite 8 requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap-vendor';
          if (id.includes('node_modules/lucide-react')) return 'lucide-vendor';
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) return 'react-vendor';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
