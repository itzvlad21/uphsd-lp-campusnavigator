import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        about: resolve(__dirname, 'about.html'),
        help: resolve(__dirname, 'help.html'),
        guest: resolve(__dirname, 'guest.html'),
        student: resolve(__dirname, 'student.html')
      }
    }
  },
  server: {
    port: process.env.PORT || 3000,
    host: true,
    strictPort: true
  },
  preview: {
    port: process.env.PORT || 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      'uphsd-lp-campusnavigator.onrender.com',
      '.onrender.com',  // This will allow all subdomains on render.com
      'localhost'
    ]
  }
});
