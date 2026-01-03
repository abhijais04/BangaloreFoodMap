
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'BangaloreFoodMap' with your actual repository name
  base: '/BangaloreFoodMap/',
  build: {
    outDir: 'dist',
  },
});
