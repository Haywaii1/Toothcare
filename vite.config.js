import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
            port: 5173,
        },
        cors: {
            origin: 'http://127.0.0.1:8000', // Match Laravel’s artisan serve
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
    }
});
