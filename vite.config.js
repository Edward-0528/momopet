import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Moves Vite's injected <link rel="stylesheet"> before <script> in the built HTML
// so the browser can discover and fetch CSS without chaining through JS.
function cssBeforeScripts() {
  return {
    name: 'css-before-scripts',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const cssRe = /\s*<link rel="stylesheet" crossorigin href="\/assets\/[^"]+\.css">/g;
        const cssLinks = html.match(cssRe) || [];
        if (!cssLinks.length) return html;
        let out = html;
        cssLinks.forEach((l) => { out = out.replace(l, ''); });
        out = out.replace(/(<script\b)/, `${cssLinks.join('')}\n    $1`);
        return out;
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssBeforeScripts(),
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
