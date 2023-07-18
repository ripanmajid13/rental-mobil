import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/main.jsx'],
            refresh: ['resources/js/**'],
        }),
        react(),
        svgr(),
    ],
    resolve: {
        alias: {
            '@src': '/resources/js',
            '@assets': '/resources/js/assets',
            '@components': '/resources/js/components',
            '@configs': '/resources/js/configs',
            '@helpers': '/resources/js/helpers',
            '@hooks': '/resources/js/hooks',
            '@layouts': '/resources/js/layouts',
            '@modules': '/resources/js/modules',
            '@routes': '/resources/js/routes',
            '@services': '/resources/js/services',
            '@store': '/resources/js/store',
            '@views': '/resources/js/views',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
    },
});
