import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion'))                              return 'motion';
          if (id.includes('react-hook-form') || id.includes('zod'))     return 'forms';
          if (id.includes('date-fns') || id.includes('lucide-react') || id.includes('zustand')) return 'utils';
          if (id.includes('react-dom') || id.includes('react-router') || id.includes('react/')) return 'react-vendor';
        },
      },
    },
  },
})
