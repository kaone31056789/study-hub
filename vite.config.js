import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' -> the built site works from any folder or sub-path on any server
// dev only: /api goes to the live server so Ask AI / sync work on localhost (set VITE_DEV_API to point elsewhere)
const API = process.env.VITE_DEV_API || 'https://study.kaone.in';
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { proxy: { '/api': { target: API, changeOrigin: true, headers: { origin: API } } } },
});
