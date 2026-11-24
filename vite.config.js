import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' -> the built site works from any folder or sub-path on any server
export default defineConfig({ plugins: [react()], base: './' });
